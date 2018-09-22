var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode()) {
	var RuntimeSpy = require('./RunTimeSpy')
}
const mockRepositoryDataName = 'mockRepositoryData'
class HarnessFactory {
	constructor(harnessName, globalVariablesSpies, functionSpies, initialFunctionName, startFunctionArguments,startFunctionCallParamNames,startFunction) {
		this.harnessName = harnessName
		this.globalVariablesSpies = globalVariablesSpies
		this.functionSpies = functionSpies
		this.initialFunctionName = initialFunctionName
		this.startFunctionArguments = startFunctionArguments
		this.startFunctionCallParamNames = startFunctionCallParamNames
		this.startFunction = startFunction
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

	getHarnessCode() {
		var harnessText = ''
		harnessText += this.getDataRepositoryText()
		harnessText += this.getFunctionMocksText()
		harnessText += this.getVariableMocksText()
		harnessText += this.getStartFunctionArgumentsText()
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

	getStartFunctionArgumentsText() {
		var mocksText = ''
		this.startFunctionArguments.forEach((variableSpy) => {
			mocksText += variableSpy.getMockText() + '\n'
		})
		return mocksText
	}

	getVariableMocksText() {
		var mocksText = ''
		this.globalVariablesSpies.forEach((variableSpy) => {
			mocksText += variableSpy.getMockText() + '\n'
		})
		return mocksText

	}
}

if (isNode())
	module.exports = HarnessFactory