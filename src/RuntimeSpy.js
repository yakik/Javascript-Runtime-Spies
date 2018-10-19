var GlobalVariableSpy = require('./GlobalVariableSpy')
var VariableLiteral = require('./VariableLiteral')
var HarnessFactory = require('./HarnessFactory')

const globalReturnedPrefix = '__globalFunctionReturnVariable'
class RuntimeSpy {
	constructor(runtimeSpyName) {
		this.trafficData = {}
		this.runtimeSpyName = runtimeSpyName
		this.variableSpies = []
		this.testedFunctionCall = 'EMPTY'
		this.globalFunctionReturnedIndex = 0

	}

	getNextGlobalFunctionReturnName() {
		return globalReturnedPrefix + this.globalFunctionReturnedIndex++
	}

	addFinalResult(result) {
		this.resultLiteral = VariableLiteral.getVariableLiteral(result).getLiteralAndCyclicDefinition('result')
	}

	setTestFunctionCall(testFunctionCall) {
		this.testedFunctionCall = testFunctionCall
	}

	getHarness() {

		var harnessFactory = new HarnessFactory('myHarness', this.getAllNonFunctionSpies(), this.getAllFunctionSpies(),this.resultLiteral, this.testedFunctionCall)
		return harnessFactory.getHarnessCode()
	}

	getHarnessNew() {
		var harnessJSON = {}
		harnessJSON.testedFuctionCall = this.testedFunctionCall
		harnessJSON.resultLiteral = this.resultLiteral
		harnessJSON.variables = [];
		this.getAllNonFunctionSpies().forEach(nonFunctionSpy => {
			harnessJSON.variables.push({
				name: nonFunctionSpy.getName(),
				values: VariableLiteral.getVariableLiteral(nonFunctionSpy.variableValueLiterals).getLiteral()
			})
		})
		this.getAllFunctionSpies().forEach(functionSpy => {
			harnessJSON.variables.push({
				name: functionSpy.getName(),
				values: functionSpy.getDataRepositoryText()
			})
		})

		return harnessJSON
	}

	getTrafficData() {
		return this.trafficData
	}


	addVariablesSpies(variablesTospy) {
		var variableValues = Object.values(variablesTospy)
		Object.getOwnPropertyNames(variablesTospy).forEach((variableNameToSpyOn, index) => {
			this.addGlobalVariableSpy(variableNameToSpyOn, variableValues[index])
		})
		return this
	}

	addGlobalVariableSpy(variableName, theVariable) {
		this.variableSpies.push(GlobalVariableSpy.getNewSpy(variableName, this.runtimeSpyName, this, theVariable))

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
