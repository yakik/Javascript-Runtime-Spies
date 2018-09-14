var ToLiteral = require('./toCodeDefinition')

var getDefinitionAndCallingStringSpy = 
function (callingFunctionArguments, functionName, paramString) {
	var theString = '/****** Prep/Call Function ' + functionName +' ********/\n'
	Array.from(callingFunctionArguments).forEach((argument,index) => {
		theString+='var '+getParamName(functionName,paramString,index)+' = '+ToLiteral.toCodeDefinition(argument).literal+'\n'
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

/*var argumentsToString = function (theArguments) {
	var argumentsArrayString = []
	for (var index = 0; index < Array.from(theArguments).length; index++) {
		argumentsArrayString.push('arguments['+index+']')
	}
	return argumentsArrayString.join(',')
}*/

var getSpyFunction = function (originalContext,functionName, originalFunction, trafficCaptureVariable) {
	return function () {
		checkSpyDataReadiness(functionName,trafficCaptureVariable)
		trafficCapture=captureInput(functionName,arguments,trafficCaptureVariable)
		var returnValue = originalFunction.apply(originalContext,arguments)
		trafficCapture=captureOutput(functionName,returnValue,trafficCaptureVariable)
		return returnValue
		}
}

var checkSpyDataReadiness = function (functionName,trafficCapture) {
	if (trafficCapture[functionName] == undefined) 
		trafficCapture[functionName]={input:[],output:[]}
	return trafficCapture
}

var captureInput = function (functionName, callArguments,trafficCapture) {
	trafficCapture[functionName].input.push(Array.from(callArguments))
	return trafficCapture
 }
var captureOutput = function (functionName, output,trafficCapture) {
	trafficCapture[functionName].output.push(output)
	return trafficCapture
 }

module.exports.checkSpyDataReadiness = checkSpyDataReadiness
module.exports.captureInput = captureInput
module.exports.captureOutput = captureOutput
module.exports.getSpyFunction = getSpyFunction
module.exports.getDefinitionAndCallingStringSpy = getDefinitionAndCallingStringSpy