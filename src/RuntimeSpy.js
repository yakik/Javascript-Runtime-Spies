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


var getSpyFunction = function (originalContext,functionName, originalFunction, trafficCaptureVariable) {
	return function () {
		SpyDataSetup(functionName,trafficCaptureVariable)
		captureFunctionInput(functionName,arguments,trafficCaptureVariable)
		var returnValue = originalFunction.apply(originalContext,arguments)
		captureFunctionOutput(functionName,returnValue,trafficCaptureVariable)
		return returnValue
		}
}

var SpyDataSetup = function (functionName,trafficCapture) {
	if (trafficCapture[functionName] == undefined) 
		trafficCapture[functionName]={input:[],output:[]}
}

var captureFunctionInput = function (functionName, callArguments,trafficCapture) {
	trafficCapture[functionName].input.push(Array.from(callArguments))
 }
var captureFunctionOutput = function (functionName, output,trafficCapture) {
	trafficCapture[functionName].output.push(output)
 }

module.exports.getSpyFunction = getSpyFunction
module.exports.getDefinitionAndCallingStringSpy = getDefinitionAndCallingStringSpy
