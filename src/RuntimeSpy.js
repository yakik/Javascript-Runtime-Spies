var GlobalVariableSpy = require('./GlobalVariableSpy')
var spyToSpyJSON = require('./SpyToSpyJSON')

const globalReturnedPrefix = '__globalFunctionReturnVariable'
class RuntimeSpy {
	constructor(runtimeSpyName) {
		this.runtimeSpyName = runtimeSpyName
		this.variableSpies = []
		this.testedFunctionCall = 'EMPTY'
		this.globalFunctionReturnedIndex = 0
		this.result = 'NOTSET'

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
			variableSpies: this.getAllNonFunctionSpies(),
			functionSpies: this.getAllFunctionSpies()
		})
	}

	

	addSpies(variablesTospy) {
		if (variablesTospy.variables != undefined) {
			variablesTospy.variables.forEach((variable) => {
				this.addGlobalVariableSpy(variable)
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
		this.variableSpies.push(GlobalVariableSpy.getNewFunctionSpy(functionSpy.name,
			this.runtimeSpyName, this))
	}

	addGlobalVariableSpy(variable) {
		this.variableSpies.push(GlobalVariableSpy.getNewSpy(variable.name, this.runtimeSpyName, this, variable.value))

	}

	getVariableSpy(variableName) {
		return this.variableSpies.filter(spy => spy.getName() == variableName)[0]
	}

	getAllFunctionSpies() {
		return this.variableSpies.filter(spy => spy.getSpyType() == 'function')
	}

	getAllNonFunctionSpies() {
		return this.variableSpies.filter(spy => spy.getSpyType() == 'nonFunction')
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

	trackSpiedVariableChanges(callTag, spyFunctionContextGetLiteral) {
		this.getAllNonFunctionSpies().filter(variableSpy =>
			variableSpy.getName().indexOf(globalReturnedPrefix) == -1).forEach(variableSpy => {
				variableSpy.trackValueChanges(callTag, spyFunctionContextGetLiteral)
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

	trackSpiedVariablesValues(tag, spyFunctionContextGetLiteral) {
		var myTag = ''
		if (tag != 'Initial')
			//tag == function name
			myTag = tag + '@' + this.getSpiedFunctionCallIndex(tag)
		else
			myTag = tag
		this.getAllNonFunctionSpies().forEach(variableSpy => {
			variableSpy.trackValueChanges(myTag, spyFunctionContextGetLiteral)
		})

	}

}
module.exports = RuntimeSpy
