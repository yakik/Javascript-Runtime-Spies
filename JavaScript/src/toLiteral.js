
var allObjects = []

module.exports.parametersToLiteral = function (parametersString, arguments) {
	allObjects = []
	parametersArray = parametersString.split(',')
	var returnString = ''
	for (var argumentNumber = 0; argumentNumber < arguments.length; argumentNumber++) {
		returnString += 'var ' + parametersArray[argumentNumber] +
			' = ' + toLiteral(arguments[argumentNumber]) + ';\n'
	}
	return returnString
}

var toLiteral = function (theArgument) {
	switch (typeof theArgument) {
		case 'number':
			return theArgument
		case 'string':
			return '\'' + theArgument + '\''
		case 'undefined':
			return 'undefined'
		case 'object':
			return getObjectLiteral(theArgument)
		case 'function':
			return 'function(){}'
		case 'boolean':
			return theArgument ? 'true' : 'false'

		default:
			return 'ERROR!!'
	}
}
module.exports.toLiteral = function (theArgument) {
	allObjects = []
	return toLiteral(theArgument)
}

var getObjectLiteral = function (theArgument) {

	if (Array.isArray(theArgument))
		return getArrayLiteral(theArgument)
	else
		return getNonArrayObjectLiteral(theArgument)
}


var isCircularReference = function(object){
	for (var objectIndex = 0; objectIndex < allObjects.length; objectIndex++)
		if (allObjects[objectIndex] === object)
			return true
	return false
}


var getNonArrayObjectLiteral = function (object) {

	if (object == null) return 'null'
	if (object == undefined) return 'undefined'
	if (!isCircularReference(object)) {
		allObjects.push(object)
		var literal = '{'
		var objectProperties = Object.getOwnPropertyNames(object)
		var objectValues = Object.values(object)
		for (var objectPropertyIndex = 0; objectPropertyIndex < objectProperties.length; objectPropertyIndex++) {
			if (objectPropertyIndex > 0) literal += ','
			literal += objectProperties[objectPropertyIndex] + ':' +
				toLiteral(objectValues[objectPropertyIndex])
		}

		literal += '}'
		return literal
	}
	else
	{
		return 'CIRCULAR'
		}
}

var getArrayLiteral = function (array) {
	var literal = '['
	for (var arrayIndex = 0; arrayIndex < array.length; arrayIndex++) {
		if (arrayIndex > 0) literal += ','
		literal += toLiteral(array[arrayIndex])
	}

	literal += ']'
	return literal
}