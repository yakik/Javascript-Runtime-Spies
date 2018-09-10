
var allObjects = []
module.exports.parametersToLiteral = parametersToLiteral
module.exports.toLiteral = function (theArgument) {
	allObjects = []
	return toLiteral(theArgument)
}

var parametersToLiteral = function (parametersString, arguments) {
	allObjects = []
	parametersArray = parametersString.split(',')
	var returnString = ''
	for (var argumentNumber = 0; argumentNumber < arguments.length; argumentNumber++) {
		returnString += 'var ' + parametersArray[argumentNumber] +
			' = ' + toLiteral(arguments[argumentNumber]) + ';\n'
	}
	return returnString
}