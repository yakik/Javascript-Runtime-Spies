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
			return getObjectLiteral(theArgument)
		case 'boolean':
			return theArgument ? 'true' : 'false'
	
		default:
			return 'ERROR!!'
	}
}

var getObjectLiteral = function (theArgument) {

	if (Array.isArray(theArgument))
		return getArrayLiteral(theArgument)
	else
		return getNonArrayObjectLiteral(theArgument) 
}

var getNonArrayObjectLiteral = function(object){

	return null;
}

var getArrayLiteral = function (array) {
	var literal = '['
	for (var arrayIndex = 0; arrayIndex < array.length; arrayIndex++){
		if (arrayIndex>0) literal += ','
		literal += getArgumentLiteral(array[arrayIndex])
	}
		
	literal += ']'
	return literal
}