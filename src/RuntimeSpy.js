var Variable = require('./Variable')
var FunctionSpy = require('./FunctionSpy')
class RuntimeSpy {
	constructor(runtimeSpyName) {
		this.trafficData = {}
		this.runtimeSpyName = runtimeSpyName
		this.functionSpies = new Map()
	}

	getTrafficData() {
		return this.trafficData
	}
	captureFunctionCall(callingFunctionArguments, functionName, paramString) {
		var theString = '/****** Prep/Call Function ' + functionName + ' ********/\n'
		var runtimeSpyThis = this
		Array.from(callingFunctionArguments).forEach((argument, index) => {
			theString += 'var ' + runtimeSpyThis.getParamName(functionName, paramString, index) +
				' = ' + Variable.getVariable(argument).getLiteral() + '\n'
		})
		theString += '\n'
		theString += functionName + '('
		Array.from(callingFunctionArguments).forEach((argument, index) => {
			if (index > 0) theString += ', '
			theString += runtimeSpyThis.getParamName(functionName, paramString, index)
		})
		theString += ')\n\n'

		this.functionCallString = theString;
	}

	getFunctionCallString() {
		return this.functionCallString
	}

	getParamName(functionName, paramString, paramIndex) {

		if (paramString === undefined)
			return functionName + '_param' + paramIndex
		else {
			var paramArray = paramString.split(',')
			return paramArray[paramIndex].trim()
		}

	}

	addFunctionSpies() {
		Array.from(arguments).forEach(functionToSpyOn => {
			this.functionSpies.set(functionToSpyOn, new FunctionSpy(functionToSpyOn))
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
		return harnessText
	}

	getDataRepositoryText() {
		var repositoryText = 'var mockRepositoryData = {}\n'
		this.functionSpies.forEach((functionSpy,functionSpyName) => {
			repositoryText += 'mockRepositoryData[\'' + functionSpyName + '\']' +
				' = ' + functionSpy.getDataRepositoryText() + '\n'
		})
		return repositoryText
	}

	getFunctionMocksText() {
		var mocksText = ''
		this.functionSpies.forEach((functionSpy,functionSpyName) => {
			mocksText += functionSpy.getMockText() + '\n'
		})
		return mocksText
		
	}


}

module.exports = RuntimeSpy
