var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode()) {
	var FunctionSpy = require('./FunctionSpy')
	var FunctionArgumentSpy = require('./FunctionArgumentSpy')
	var GlobalVariableSpy = require('./GlobalVariableSpy')
	var VariableLiteral = require('../src/VariableLiteral')
}
const mockRepositoryDataName = 'mockRepositoryData'
class RuntimeSpy {
	constructor(runtimeSpyName) {
		this.trafficData = {}
		this.runtimeSpyName = runtimeSpyName
		this.functionSpies = new Map()
		this.globalVariableSpies = new Map()
		this.startFunctionCallParamNames = []
		this.startFunctionArguments = []
		this.startFunction = ''

	}

	getTrafficData() {
		return this.trafficData
	}
	setStartFunctionCall(callingFunctionArguments, functionName, paramString) {
		this.startFunction = functionName
		var upperThis = this
		var paramValues = Array.from(callingFunctionArguments)
		var paramNames = []
		if (paramString != undefined)
			paramNames = paramString.split(',')
		paramValues.forEach((value, index) => {
			var thisParamName = ''
			if (paramNames[index] == undefined)
				thisParamName = functionName + 'Param' + index
			else
				thisParamName = paramNames[index]

			upperThis.startFunctionArguments.push(new FunctionArgumentSpy(thisParamName,
				VariableLiteral.getVariableLiteral(paramValues[index]).getLiteralAndCyclicDefinition(thisParamName),
				this.runtimeSpyName))
			upperThis.startFunctionCallParamNames.push(thisParamName)
		})
	}

	getStartFunctionCallString() {
		var theString = this.startFunction + '('
		this.startFunctionCallParamNames.forEach((param, index) => {
			if (index > 0) theString += ', '
			theString += param
		})
		theString += ')\n'
		return theString
	}

	addFunctionSpies() {
		var upperThis = this
		Array.from(arguments).forEach(functionToSpyOn => {
			this.functionSpies.set(functionToSpyOn, new FunctionSpy(functionToSpyOn, upperThis.runtimeSpyName))
		})
		return this
	}

	addVariableSpies() {
		Array.from(arguments).forEach(variableToSpyOn => {
			this.globalVariableSpies.set(variableToSpyOn, new GlobalVariableSpy(variableToSpyOn,this.runtimeSpyName))
		})
		return this
	}

	getFunctionSpy(functionName) {
		return this.functionSpies.get(functionName)
	}

	getVariableSpy(variableName) {
		return this.globalVariableSpies.get(variableName)
	}

	getCodeToEvalToSpyOnFunctions() {
		var returnString = ''
		this.functionSpies.forEach(functionToSpyOn => {
			returnString += functionToSpyOn.getCodeForSpy() + '\n'
		})
		return returnString
	}

	trackSpiedVariableChanges(callTag,spyFunctionContextGetLiteral) {
		this.globalVariableSpies.forEach(variableSpy => {
			variableSpy.trackValueChanges(callTag,spyFunctionContextGetLiteral)
		})
	}


	reportSpiedFunctionCallAndGetResult(spiedFunctionName, callArguments, spyFunctionContextGetLiteral, originalSpiedFunction) {
		var answer = this.getFunctionSpy(spiedFunctionName).reportSpiedFunctionCallAndGetResult(callArguments, spyFunctionContextGetLiteral, originalSpiedFunction)
		this.trackSpiedVariableChanges(answer.callTag, spyFunctionContextGetLiteral)
		return answer.returnValue
	}

	getSpiedFunctionCallIndex(spiedFunctionName) {
		return this.functionSpies.get(spiedFunctionName).getCallIndex()
	}

	trackSpiedVariablesValues(tag,spyFunctionContextGetLiteral) {
		var myTag = ''
		if (tag != 'Initial')
			//tag == function name
			myTag = tag + '@' + this.getSpiedFunctionCallIndex(tag)
		else
			myTag = tag
		this.globalVariableSpies.forEach(variableSpy => {
			variableSpy.trackValueChanges(myTag,spyFunctionContextGetLiteral)
		})
			
	}



	getCodeToEvalToSpyOnVariables() {
		var returnString = ''
            returnString += this.runtimeSpyName + '.trackSpiedVariablesValues(' +
            '\'Initial\',function (variableNameForValue,variableName) {' +
            ' return VariableLiteral.getVariableLiteral(eval(variableNameForValue)).getLiteralAndCyclicDefinition(variableName)}' +
       ' )\n'
        return returnString

	}

	getHarness() {
		var harnessText = ''
		harnessText += this.getDataRepositoryText()
		harnessText += this.getFunctionMocksText()
		harnessText += this.getVariableMocksText()
		harnessText += this.getStartFunctionArgumentsText()
		harnessText += this.getStartFunctionCallString()
		return harnessText
	}

	getDataRepositoryText() {
		var repositoryText = 'var ' + mockRepositoryDataName + ' = {}\n'
		this.functionSpies.forEach((functionSpy, functionSpyName) => {
			repositoryText += mockRepositoryDataName + '[\'' + functionSpyName + '\']' +
				' = ' + functionSpy.getDataRepositoryText() + '\n'
		})
	
		return repositoryText
	}

	getFunctionMocksText() {
		var mocksText = ''
		this.functionSpies.forEach((functionSpy) => {
			mocksText += functionSpy.getMockText() + '\n'
		})
	
		return mocksText
	}

	getStartFunctionArgumentsText() {
		var mocksText = ''
		this.startFunctionArguments.forEach((variableSpy) => {
			mocksText += variableSpy.getMockText() + '\n'
		})
		return mocksText
	}

	getVariableMocksText() {
		var mocksText = ''
		this.globalVariableSpies.forEach((variableSpy) => {
			mocksText += variableSpy.getMockText() + '\n'
		})
		return mocksText

	}


}
if (isNode())
	module.exports = RuntimeSpy
