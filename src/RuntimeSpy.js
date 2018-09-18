var CodeDefinition = require('./Variable')

var getDefinitionAndCallingStringSpy = 
function (callingFunctionArguments, functionName, paramString) {
	var theString = '/****** Prep/Call Function ' + functionName +' ********/\n'
	Array.from(callingFunctionArguments).forEach((argument,index) => {
		theString += 'var ' + getParamName(functionName, paramString, index) +
			' = ' + CodeDefinition.getVariable(argument).getLiteral() + '\n'
	})
	theString += '\n'
	theString += functionName + '('
	Array.from(callingFunctionArguments).forEach((argument, index) => {
		if (index>0) theString+=', '
		theString+=getParamName(functionName,paramString,index)
	})
	theString += ')\n\n'

	return theString;

	}

var getParamName = function (functionName, paramString, paramIndex) {
	
	if (paramString === undefined)
		return functionName + '_param' + paramIndex
	else {
		var paramArray = paramString.split(',')
		return paramArray[paramIndex].trim()
	}
		
}

class RuntimeSpy {
	constructor() {
		this.trafficData = {}
	}

	getTrafficData() {
		return this.trafficData
	}

	getSpyFunction(originalContext, functionName, originalFunction) {
		var runtimeSpyThis = this
		return function () {
			runtimeSpyThis.SpyDataSetup(functionName, runtimeSpyThis.trafficData)
			runtimeSpyThis.captureFunctionInput(functionName, arguments,runtimeSpyThis.trafficData)
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
	captureFunctionOutput (functionName, output) {
		this.trafficData[functionName].output.push(output)
	}
}

module.exports.RuntimeSpy = RuntimeSpy
module.exports.getDefinitionAndCallingStringSpy = getDefinitionAndCallingStringSpy
