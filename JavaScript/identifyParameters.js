module.exports.identifyParameters = function(parametersString,arguments){
	parametersArray = parametersString.split(',')
	var returnString =  'var ' + parametersArray[0] +' = ' + arguments[0] + ';\n';
	if (parametersArray.length == 2)
		returnString += 'var ' + parametersArray[1] +' = ' + arguments[1] + ';\n';
	return returnString
}



