var GlobalVariableSpy = require('./GlobalVariableSpy')

const globalReturnedPrefix = '__globalFunctionReturnVariable'
class RuntimeSpy {
	constructor(runtimeSpyName) {
		this.trafficData = {}
		this.runtimeSpyName = runtimeSpyName
		this.variableSpies = []
		this.testedFunctionCall = 'EMPTY'
		this.globalFunctionReturnedIndex = 0
		this.resultLiteral = 'NOTSET'

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

	getLiteral(variable) {
		return VariableLiteral.getVariableLiteral(variable).getLiteral()
	}
	getReadableHarness() {
		var harnessJSON = {}
		harnessJSON.testedFunctionCall = this.testedFunctionCall
		harnessJSON.resultLiteral = this.resultLiteral
		harnessJSON.variables = this.getReadableHarnessVariables(this.getAllNonFunctionSpies())
		harnessJSON.functions = this.getReadableHarnessFunctions(this.getAllFunctionSpies())

		return harnessJSON
	}

	getReadableHarnessFunctions(functions) {
		var returnedArray = []
		functions.forEach(functionSpied=> {
			let functionJSON = { name: functionSpied.getName(), traffic: [] }
			let trafficData = functionSpied.getTrafficData()
			trafficData.input.forEach((input, index) => {
				functionJSON.traffic.push({callNumber:index ,arguments:input.slice(), returnValue:trafficData.output[index]})
			})
			returnedArray.push(functionJSON)
		})
		return returnedArray;
	}

	getReadableHarnessVariables(variables) {
		var returnedArray = []
		variables.forEach(variable => {
			let variableJSON = { name: variable.getName(), values: [] }
			variable.variableValueLiterals.forEach((value, key) => {
				variableJSON.values.push({ timing: key, value: value })
			})
			returnedArray.push(variableJSON)
		})
		return returnedArray;
	}

	getHarnessNew() {
		var harnessJSON = {}
		harnessJSON.testedFunctionCall = this.testedFunctionCall
		harnessJSON.resultLiteral = this.resultLiteral
		harnessJSON.variables = [];
		this.getAllNonFunctionSpies().forEach(nonFunctionSpy => {
			harnessJSON.variables.push({
				name: nonFunctionSpy.getName(),
				values: VariableLiteral.getVariableLiteral(nonFunctionSpy.variableValueLiterals).getLiteral()
			})
		})
		harnessJSON.functions = [];
		this.getAllFunctionSpies().forEach(functionSpy => {
			harnessJSON.functions.push({
				name: functionSpy.getName(),
				values: functionSpy.getDataRepositoryText()
			})
		})

		return harnessJSON
	}

	getTrafficData() {
		return this.trafficData
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
