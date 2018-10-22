var GlobalVariableSpy = require('./GlobalVariableSpy')
var spyToSpyJSON = require('./SpyToSpyJSON')

const globalReturnedPrefix = '__globalFunctionReturnVariable'
class RuntimeSpy {
	constructor(runtimeSpyName) {
		this.runtimeSpyName = runtimeSpyName
		this.variableSpies = []
		this.functionSpies = []
		this.testedFunctionCall = 'EMPTY'
		this.result = 'NOTSET'

	}

	static getSpiesDBAfterVariableUpdate(name, tag, value, spiesDB) {
		returnedDB = JSON.parse(JSON.stringify(spiesDB))
		if (returnedDB.variables.filter(variableDB => variableDB.name == name).length() == 0)
			returnedDB.variables.push({
				name: name, values: [{
					timing: tag,
					value: value
				}]
			})
		else
			returnedDB.variables.filter(variableDB => variableDB.name == name)[0].values.push({
				timing: tag,
				value: value
			})
		return returnedDB
	}

	static getSpiesDBAfterThisSpiedFunctionCall(functionName, callArguments, returnValue, spyDB) {
		returnedDB = JSON.parse(JSON.stringify(spyDB))
		if (returnedDB.functions.filter(functionDB => functionDB.name == functionName).length() == 0)
			returnedDB.functions.push({
				name: functionName, traffic: [{
					callNumber: 0,
					arguments: Array.from(callArguments),
					returnValue: returnValue
				}]
			})
		else
			returnedDB.functions.filter(functionDB => functionDB.name == functionName)[0].traffic.push({
				callNumber: returnedDB.functions.filter(functionDB => functionDB.name == functionName)[0].traffic.length(),
				arguments: Array.from(callArguments),
				returnValue: returnValue
			})
		return returnedDB
	}

	addFinalResult(result) {
		this.result = result
	}

	setTestFunctionCall(testFunctionCall) {
		this.testedFunctionCall = testFunctionCall
	}

	getReadableHarness() {
		return spyToSpyJSON({
			testedFunctionCall: this.testedFunctionCall,
			result: this.result,
			variableSpies: this.variableSpies,
			functionSpies: this.functionSpies
		})
	}

	addSpies(variablesTospy) {
		if (variablesTospy.variables != undefined) {
			variablesTospy.variables.forEach((variable) => {
				this.addVariableSpy(variable)
			})
		}
		if (variablesTospy.functions != undefined) {
			variablesTospy.functions.forEach(functionSpy => {
				this.addFunctionSpy(functionSpy)
			})
		}
		return this
	}

	addFunctionSpy(functionSpy) {
		this.functionSpies.push(GlobalVariableSpy.getNewFunctionSpy(functionSpy.name,
			this.runtimeSpyName, this))
	}

	addVariableSpy(variable) {
		this.variableSpies.push(GlobalVariableSpy.getNewSpy(variable.name, this.runtimeSpyName, this, variable.value))

	}

	getVariableSpy(variableName) {
		return this.variableSpies.filter(spy => spy.getName() == variableName)[0]
	}

	getFunctionSpy(variableName) {
		return this.functionSpies.filter(spy => spy.getName() == variableName)[0]
	}

	getCodeToEvalToSpyOnFunctions() {
		var returnString = ''
		this.functionSpies.forEach(functionToSpyOn => {
			returnString += functionToSpyOn.getCodeForSpy() + '\n'
		})
		return returnString
	}

	getCodeToEvalToSpyOnVariables() {

		return this.getCodeToEvalToSpyOnFunctions()

	}

	trackSpiedVariableChanges(callTag, spyFunctionContextGetLiteral) {
		this.variableSpies.filter(variableSpy =>
			variableSpy.getName().indexOf(globalReturnedPrefix) == -1).forEach(variableSpy => {
				variableSpy.trackValueChanges(callTag, spyFunctionContextGetLiteral)
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

	trackSpiedVariablesValues(tag, spyFunctionContextGetLiteral) {
		var myTag = ''
		if (tag != 'Initial')
			//tag == function name
			myTag = tag + '@' + this.getSpiedFunctionCallIndex(tag)
		else
			myTag = tag
		this.getVariableSpies().forEach(variableSpy => {
			variableSpy.trackValueChanges(myTag, spyFunctionContextGetLiteral)
		})

	}

}
module.exports = RuntimeSpy
