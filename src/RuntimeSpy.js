var Variable = require('./Variable')
var FunctionSpy = require('./FunctionSpy')
class RuntimeSpy {
	constructor(runtimeSpyName) {
		this.trafficData = {}
		this.runtimeSpyName = runtimeSpyName
		this.functionSpies = []
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
			this.functionSpies.push(functionToSpyOn)
		})
		return this
}

	getCodeToEvalToSpyOnFunctions() {
		//parameters are string names of functions
		var returnString = ''
		this.functionSpies.forEach(functionToSpyOn=>{
			returnString += functionToSpyOn + '=' + this.runtimeSpyName + '.getSpyFunction(this,' +
			'\''+functionToSpyOn+'\','+functionToSpyOn+')\n'
		})
		return returnString
	
}

	getSpyFunction(originalContext, functionName, originalFunction) {
		var runtimeSpyThis = this
		return function () {
			runtimeSpyThis.SpyDataSetup(functionName, runtimeSpyThis.trafficData)
			runtimeSpyThis.captureFunctionInput(functionName, arguments, runtimeSpyThis.trafficData)
			var returnValue = originalFunction.apply(originalContext, arguments)
			runtimeSpyThis.captureFunctionOutput(functionName, returnValue, runtimeSpyThis.trafficData)
			return returnValue
		}
	}

	SpyDataSetup(functionName) {
		if (this.trafficData[functionName] == undefined)
			this.trafficData[functionName] = { input: [], output: [] }
	}

	captureFunctionInput(functionName, callArguments) {
		this.trafficData[functionName].input.push(Array.from(callArguments))
	}
	captureFunctionOutput(functionName, output) {
		this.trafficData[functionName].output.push(output)
	}
}

module.exports = RuntimeSpy
