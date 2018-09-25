var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode()) {
	var RuntimeSpy = require('./RunTimeSpy')
}
const mockRepositoryDataName = 'mockRepositoryData'
class HarnessFactory {
	constructor(harnessName, globalVariablesSpies, functionSpies, initialFunctionName, startFunctionArguments,startFunction,resultLiteral) {
		this.harnessName = harnessName
		this.globalVariablesSpies = globalVariablesSpies
		this.functionSpies = functionSpies
		this.initialFunctionName = initialFunctionName
		this.startFunctionArguments = startFunctionArguments
		this.startFunction = startFunction
		this.resultLiteral = resultLiteral
	}

	getStartFunctionCallString() {
		var theString = this.startFunction + '('
		this.startFunctionArguments.forEach((param, index) => {
			if (index > 0) theString += ', '
			theString += param.getVariableName()
		})
		theString += ')\n'
		return theString
	}

	getHarnessCode() {
		var harnessText = 'var myHarness = new Harness(\''+this.harnessName+'\')\n'
		harnessText += this.getDataRepositoryText()
		harnessText += 'myHarness.setMockRepositoryData('+mockRepositoryDataName+')\n'
		harnessText += this.getFunctionMocksText()
		harnessText += this.getVariableMocksText()
		harnessText += this.getStartFunctionArgumentsText()
		if (this.resultLiteral == undefined)
			harnessText += this.getStartFunctionCallString()
		else {
			harnessText += 'expect(VariableLiteral.getVariableLiteral('+this.getStartFunctionCallString()+').getLiteralAndCyclicDefinition(\'result\')' +
				').equals(\'' + this.resultLiteral.replace(/\'/g, '\\\'').replace(/\n/g,'\\n')  + '\')\n'
		}
		return harnessText
	}

	getDataRepositoryText() {
		var repositoryText = 'var ' + mockRepositoryDataName + ' = {}\n'
		this.functionSpies.forEach(functionSpy => {
			repositoryText += mockRepositoryDataName + '[\'' + functionSpy.getName() + '\']' +
				' = ' + functionSpy.getDataRepositoryText() + '\n'
		})

		return repositoryText
	}

	getFunctionMocksText() {
		var mocksText = ''
		this.functionSpies.forEach((functionSpy) => {
			mocksText += this.harnessName + '.addFunctionMock(\'' + functionSpy.getName() + '\')\n'
			mocksText += functionSpy.getName() + '= function(){\n' +
				'return ' + this.harnessName + '.callFunctionSpy(\'' + functionSpy.getName() + '\',' +
				'arguments,'+
				'function(codeToEval){eval(codeToEval)})\n' +
				'}\n'
		})

		return mocksText
	}

	getStartFunctionArgumentsText() {
		var mocksText = ''
		this.startFunctionArguments.forEach((variableSpy) => {
			mocksText += variableSpy.getMockText(this.harnessName) + '\n'
		})
		return mocksText
	}

	getVariableMocksText() {
		var mocksText = ''
		this.globalVariablesSpies.forEach((variableSpy) => {
			mocksText += variableSpy.getMockText() + '\n'
			mocksText += this.harnessName + '.addGlobalVariableMock(' +
				'\''+variableSpy.getName() + '\',' +
				variableSpy.getName() + '_DB)\n'

		})
		mocksText += this.harnessName + '.updateVariablesByTag(\'Initial\',' +
		'function(codeToEval){eval(codeToEval)})\n'
		return mocksText
	}

	
}

if (isNode())
	module.exports = HarnessFactory