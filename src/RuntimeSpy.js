var getSpiesJSON = require('./GetSpiesJSON')
var JSONToJavascript = require('./JSONToJavascript')

const globalReturnedPrefix = '__globalFunctionReturnVariable'
class RuntimeSpy {
	constructor(runtimeSpyName) {
		this.runtimeSpyName = runtimeSpyName
		this.testedFunctionCall = 'EMPTY'
		this.result = 'NOTSET'

	}

	static getSpiesCode(spiesJSON) {
		return JSONToJavascript(getSpiesJSON(spiesJSON))
	}
	static getSpiesDBAfterVariableUpdate(name, tag, value, spiesDB) {
		var returnedDB = JSON.parse(JSON.stringify(spiesDB))
		if (returnedDB.variables.filter(variableDB => variableDB.name == name).length == 0)
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
		var returnedDB = JSON.parse(JSON.stringify(spyDB))
		if (returnedDB.functions.filter(functionDB => functionDB.name == functionName).length == 0)
			returnedDB.functions.push({
				name: functionName, traffic: [{
					callNumber: 0,
					arguments: Array.from(callArguments),
					returnValue: returnValue
				}]
			})
		else
			returnedDB.functions.filter(functionDB => functionDB.name == functionName)[0].traffic.push({
				callNumber: returnedDB.functions.filter(functionDB => functionDB.name == functionName)[0].traffic.length,
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

	getReadableHarness(spiesDB) {
		return {
			testedFunctionCall: this.testedFunctionCall,
			result: this.result,
			variables: spiesDB.variables,
			functions: spiesDB.functions
		}
	}



	reportSpiedFunctionCallAndGetResult(spiedFunctionName, callArguments, spyFunctionContextGetLiteral, originalSpiedFunction) {
		var answer = this.getFunctionSpy(spiedFunctionName).reportSpiedFunctionCallAndGetResult(callArguments, spyFunctionContextGetLiteral, originalSpiedFunction)
		this.trackSpiedVariableChanges(answer.callTag, spyFunctionContextGetLiteral)
		return answer.returnValue
	}


}
module.exports = RuntimeSpy
