module.exports.identifyParameters = function (parametersString, arguments) {
	parametersArray = parametersString.split(',')
	var returnString = ''
	for (var argumentNumber = 0; argumentNumber < arguments.length; argumentNumber++) {
		returnString += 'var ' + parametersArray[argumentNumber] +
			' = ' + getArgumentInCorrectFormat(arguments[argumentNumber]) + ';\n'
	}
	return returnString
}
	
var getArgumentInCorrectFormat = function(theArgument){
	switch (typeof theArgument) {
		case 'number':
			return theArgument
		case 'string':
			return '\'' + theArgument + '\''
		default:
			return 'ERROR!!'
	}
}