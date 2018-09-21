var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode()) {
	var FunctionSpy = require('./FunctionSpy')
	var VariableSpy = require('./VariableSpy')
	var VariableLiteral = require('../src/VariableLiteral')
}
const mockRepositoryDataName = 'mockRepositoryData'
class RuntimeSpy {
	constructor(runtimeSpyName) {
		this.trafficData = {}
		this.runtimeSpyName = runtimeSpyName
		this.functionSpies = new Map()
		this.variableSpies = new Map()
		this.startFunctionCallParamNames = []
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

			upperThis.startFunctionCallParamNames.push(thisParamName)
			upperThis.variableSpies.set(thisParamName, new VariableSpy(thisParamName, '', this.runtimeSpyName))
			upperThis.variableSpies.get(thisParamName).setNewVariableLiteral('Initial',
			VariableLiteral.getVariableLiteral(paramValues[index]).getLiteralAndCyclicDefinition(thisParamName))
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
			this.variableSpies.set(variableToSpyOn, new VariableSpy(variableToSpyOn,variableToSpyOn,this.runtimeSpyName))
		})
		return this
	}

	getFunctionSpy(functionName) {
		return this.functionSpies.get(functionName)
	}

	getVariableSpy(variableName) {
		return this.variableSpies.get(variableName)
	}

	getCodeToEvalToSpyOnFunctions() {
		var returnString = ''
		this.functionSpies.forEach(functionToSpyOn => {
			returnString += functionToSpyOn.getCodeForSpy() + '\n'
		})
		return returnString
	}

	trackSpiedVariableChanges(callTag,spyFunctionContextGetLiteral) {
		this.variableSpies.forEach(variableSpy => {
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
		this.variableSpies.forEach(variableSpy => {
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

	getVariableMocksText() {
		var mocksText = ''
		this.variableSpies.forEach((variableSpy) => {
			mocksText += variableSpy.getMockText() + '\n'
		})
		return mocksText

	}


}
if (isNode())
	module.exports = RuntimeSpy
