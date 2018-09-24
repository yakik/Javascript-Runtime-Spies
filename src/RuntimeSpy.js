var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode()) {
	var FunctionSpy = require('./FunctionSpy')
	var FunctionArgumentSpy = require('./FunctionArgumentSpy')
	var GlobalVariableSpy = require('./GlobalVariableSpy')
	var VariableLiteral = require('../src/VariableLiteral')
	var HarnessFactory = require('../src/HarnessFactory')
}

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

	addFinalResult(result) {
		this.resultLiteral = VariableLiteral.getVariableLiteral(result).getLiteralAndCyclicDefinition('result')
	}


	getHarness() {
		var harnessFactory = new HarnessFactory('myHarness',this.globalVariableSpies,this.functionSpies,this.initialFunctionName,this.startFunctionArguments,this.startFunction,this.resultLiteral)
		return harnessFactory.getHarnessCode()
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

	addFunctionSpies() {
		var upperThis = this
		Array.from(arguments).forEach(functionToSpyOn => {
			this.addFunctionSpy(functionToSpyOn)
		})
		return this
	}

	addFunctionSpy(functionSpy) {
			this.functionSpies.set(functionSpy, new FunctionSpy(functionSpy, this.runtimeSpyName))
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

	

}
if (isNode())
	module.exports = RuntimeSpy
