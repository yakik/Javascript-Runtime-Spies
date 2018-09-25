var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode()) {
	var GlobalVariableSpy = require('./GlobalVariableSpy')
	var FunctionArgumentSpy = require('./FunctionArgumentSpy')
	var VariableLiteral = require('../src/VariableLiteral')
	var HarnessFactory = require('../src/HarnessFactory')
}

class RuntimeSpy {
	constructor(runtimeSpyName) {
		this.trafficData = {}
		this.runtimeSpyName = runtimeSpyName
		this.globalVariableSpies = []
		this.startFunctionCallParamNames = []
		this.startFunctionArguments = []
		this.startFunction = ''

	}

	addFinalResult(result) {
		this.resultLiteral = VariableLiteral.getVariableLiteral(result).getLiteralAndCyclicDefinition('result')
	}


	getHarness() {
		var harnessFactory = new HarnessFactory('myHarness',this.getAllNonFunctionSpies(),this.getAllFunctionSpies(),this.initialFunctionName,this.startFunctionArguments,this.startFunction,this.resultLiteral)
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

	/*addFunctionSpies() {
		var upperThis = this
		Array.from(arguments).forEach(functionToSpyOn => {
			this.addFunctionSpy(functionToSpyOn)
		})
		return this
	}*/

	addFunctionSpy(functionSpy) {
			this.globalVariableSpies.push(GlobalVariableSpy.getSpy(functionSpy, this.runtimeSpyName,this,'function'))
		return this
	}



	addGlobalVariablesSpies(variablesTospy) {
		var variableValues = Object.values(variablesTospy)
		Object.getOwnPropertyNames(variablesTospy).forEach((variableToSpyOn, index) => {
			let variableType = ''
			if (typeof variableValues[index] == "function")
				variableType = "function"
			else
				variableType = "nonFunction"
			
			this.globalVariableSpies.push(GlobalVariableSpy.getSpy(variableToSpyOn,this.runtimeSpyName,this,variableType))
		})
		return this
	}

	getFunctionSpy(functionName) {
		return this.globalVariableSpies.filter(spy=>spy.getName()==functionName)[0]
	}

	getVariableSpy(variableName) {
		return this.globalVariableSpies.filter(spy=>spy.getName()==functionName)[0]
	}

	getAllFunctionSpies() {
		return this.globalVariableSpies.filter(spy=> spy.getSpyType() == 'function')
	}

	getAllNonFunctionSpies() {
		return this.globalVariableSpies.filter(spy=> spy.getSpyType() == 'nonFunction')
	}

	getCodeToEvalToSpyOnFunctions() {
		var returnString = ''
		this.getAllFunctionSpies().forEach(functionToSpyOn => {
			returnString += functionToSpyOn.getCodeForSpy() + '\n'
		})
		return returnString
	}

	getCodeToEvalToSpyOnVariables() {
		var returnString = ''
            returnString += this.runtimeSpyName + '.trackSpiedVariablesValues(' +
            '\'Initial\',function (variableNameForValue,variableName) {' +
            ' return VariableLiteral.getVariableLiteral(eval(variableNameForValue)).getLiteralAndCyclicDefinition(variableName)}' +
       ' )\n'
        return returnString + this.getCodeToEvalToSpyOnFunctions()

	}

	trackSpiedVariableChanges(callTag,spyFunctionContextGetLiteral) {
		this.getAllNonFunctionSpies().forEach(variableSpy => {
			variableSpy.trackValueChanges(callTag,spyFunctionContextGetLiteral)
		})
	}


	reportSpiedFunctionCallAndGetResult(spiedFunctionName, callArguments, spyFunctionContextGetLiteral, originalSpiedFunction) {
		var answer = this.getFunctionSpy(spiedFunctionName).reportSpiedFunctionCallAndGetResult(callArguments, spyFunctionContextGetLiteral, originalSpiedFunction)
		this.trackSpiedVariableChanges(answer.callTag, spyFunctionContextGetLiteral)
		return answer.returnValue
	}

	getSpiedFunctionCallIndex(spiedFunctionName) {
		return this.getFunctionSpy(spiedFunctionName).getCallIndex()
	}

	trackSpiedVariablesValues(tag,spyFunctionContextGetLiteral) {
		var myTag = ''
		if (tag != 'Initial')
			//tag == function name
			myTag = tag + '@' + this.getSpiedFunctionCallIndex(tag)
		else
			myTag = tag
		this.getAllNonFunctionSpies().forEach(variableSpy => {
			variableSpy.trackValueChanges(myTag,spyFunctionContextGetLiteral)
		})
			
	}

}
if (isNode())
	module.exports = RuntimeSpy
