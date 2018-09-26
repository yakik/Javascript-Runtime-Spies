var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode()) {
	var GlobalVariableSpy = require('./GlobalVariableSpy')
	var VariableLiteral = require('../src/VariableLiteral')
	var HarnessFactory = require('../src/HarnessFactory')
}

class RuntimeSpy {
	constructor(runtimeSpyName) {
		this.trafficData = {}
		this.runtimeSpyName = runtimeSpyName
		this.globalVariableSpies = []
		this.startFunctionCallParamNames = []
		this.startFunction = ''

	}

	addFinalResult(result) {
		this.resultLiteral = VariableLiteral.getVariableLiteral(result).getLiteralAndCyclicDefinition('result')
	}


	getHarness() {
		var harnessFactory = new HarnessFactory('myHarness',this.getAllNonFunctionSpies(),this.getAllFunctionSpies(),this.initialFunctionName,this.startFunctionCallParamNames,this.startFunction,this.resultLiteral)
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

			upperThis.addGlobalVariableSpy(thisParamName,paramValues[index])
			upperThis.startFunctionCallParamNames.push(thisParamName)
		})
	}

	addGlobalVariablesSpies(variablesTospy) {
		var variableValues = Object.values(variablesTospy)
		Object.getOwnPropertyNames(variablesTospy).forEach((variableNameToSpyOn, index) => {
			this.addGlobalVariableSpy(variableNameToSpyOn,variableValues[index])
				})
		return this
	}

	addGlobalVariableSpy(variableName, theVariable) {
		this.globalVariableSpies.push(GlobalVariableSpy.getNewSpy(variableName,this.runtimeSpyName,this,theVariable))
	
	}

	getVariableSpy(variableName) {
		return this.globalVariableSpies.filter(spy=>spy.getName()==variableName)[0]
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
	
        return this.getCodeToEvalToSpyOnFunctions()

	}

	trackSpiedVariableChanges(callTag,spyFunctionContextGetLiteral) {
		this.getAllNonFunctionSpies().forEach(variableSpy => {
			variableSpy.trackValueChanges(callTag,spyFunctionContextGetLiteral)
		})
	}


	reportSpiedFunctionCallAndGetResult(spiedFunctionName, callArguments, spyFunctionContextGetLiteral, originalSpiedFunction) {
		var answer = this.getVariableSpy(spiedFunctionName).reportSpiedFunctionCallAndGetResult(callArguments, spyFunctionContextGetLiteral, originalSpiedFunction)
		this.trackSpiedVariableChanges(answer.callTag, spyFunctionContextGetLiteral)
		return answer.returnValue
	}

	getSpiedFunctionCallIndex(spiedFunctionName) {
		return this.getVariableSpy(spiedFunctionName).getCallIndex()
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
