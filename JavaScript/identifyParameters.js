module.exports.identifyParameters = function (parametersString, arguments) {
	parametersArray = parametersString.split(',')
	var returnString = ''
	for (var argumentNumber = 0; argumentNumber < arguments.length; argumentNumber++) {
		returnString += 'var ' + parametersArray[argumentNumber] +
			' = ' + getArgumentLiteral(arguments[argumentNumber]) + ';\n'
	}
	return returnString
}
	
var getArgumentLiteral = function(theArgument){
	switch (typeof theArgument) {
		case 'number':
			return theArgument
		case 'string':
			return '\'' + theArgument + '\''
		case 'undefined':
			return 'undefined'
		case 'object':
			return '[' + theArgument + ']'
		case 'boolean':
			return theArgument ? 'true' : 'false'
	
		default:
			return 'ERROR!!'
	}
}

