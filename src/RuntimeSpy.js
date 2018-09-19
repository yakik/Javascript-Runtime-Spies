var Variable = require('./Variable')
var FunctionSpy = require('./FunctionSpy')
var VariableSpy = require('./VariableSpy')
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
			upperThis.variableSpies.set(thisParamName, new VariableSpy(thisParamName, value))
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
		Array.from(arguments).forEach(functionToSpyOn => {
			this.functionSpies.set(functionToSpyOn, new FunctionSpy(functionToSpyOn))
		})
		return this
	}

	addVariableSpies() {
		Array.from(arguments).forEach(variableToSpyOn => {
			this.variableSpies.set(variableToSpyOn, new VariableSpy(variableToSpyOn))
		})
		return this
	}

	getFunctionSpy(functionName) {
		return this.functionSpies.get(functionName)
	}

	getCodeToEvalToSpyOnFunctions() {
		//parameters are string names of functions
		var returnString = ''
		this.functionSpies.forEach(functionToSpyOn => {
			returnString += functionToSpyOn.getFunctionName() + '=' + this.runtimeSpyName + '.getFunctionSpy(\'' +
				functionToSpyOn.getFunctionName() + '\').getSpyFunction(this, ' +
				functionToSpyOn.getFunctionName() + ')\n'
		})
		return returnString
	}

	getHarness() {
		var harnessText = ''
		harnessText += this.getDataRepositoryText()
		harnessText += this.getFunctionMocksText()
		harnessText += this.getVariableMocksText()
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

module.exports = RuntimeSpy
