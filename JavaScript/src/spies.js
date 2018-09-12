var ToLiteral = require('./toLiteral')

var getDefinitionAndCallingStringSpy = 
function (callingFunctionArguments, functionName, paramString) {
	var theString = '/****** Prep/Call Function ' + functionName +' ********/\n'
	Array.from(callingFunctionArguments).forEach((argument,index) => {
		theString+='var '+getParamName(functionName,paramString,index)+' = '+ToLiteral.toLiteral(argument)+'\n'
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

var argumentsToString = function (theArguments) {
	var argumentsArrayString = []
	for (var index = 0; index < Array.from(theArguments).length; index++) {
		argumentsArrayString.push('arguments['+index+']')
	}
	return argumentsArrayString.join(',')
}

var getSpyTextForFunction = function (functionName, newNameOfOriginalFunction, trafficCaptureVariable) {
	var theString = 'var ' + functionName + ' = function(){\n' +
		'checkSpyCameraReadiness(\'' + functionName + '\','+trafficCaptureVariable+')\n' +
		'trafficCapture=captureInput(\'' + functionName + '\',arguments,'+trafficCaptureVariable+')\n' +
		'var paramsString = argumentsToString(arguments)\n' +
		'var returnValue = eval(\''+newNameOfOriginalFunction+'(\'+paramsString+\')\')\n' +
		'trafficCapture=captureOutput(\'' + functionName + '\',returnValue,'+trafficCaptureVariable+')\n' +
		'return returnValue\n' +
		'}'
	return theString
}

var checkSpyCameraReadiness = function (functionName,trafficCapture) {
	if (trafficCapture[functionName]==undefined) 
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

module.exports.checkSpyCameraReadiness = checkSpyCameraReadiness
module.exports.captureInput = captureInput
module.exports.captureOutput = captureOutput
module.exports.getSpyTextForFunction = getSpyTextForFunction
module.exports.argumentsToString = argumentsToString
module.exports.getDefinitionAndCallingStringSpy = getDefinitionAndCallingStringSpy