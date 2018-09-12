

var toLiteral = function (theVariable, objectsAnalyzed) {
	
	if (objectsAnalyzed === undefined) 
		objectsAnalyzed = []

	switch (typeof theVariable) {
		case 'number':
			return theVariable.toString()
		case 'string':
			return '\'' + theVariable + '\''
		case 'undefined':
			return 'undefined'
		case 'object':
			if (!isCircularReference(theVariable, objectsAnalyzed)) {
				objectsAnalyzed.push(theVariable)
				return getObjectLiteral(theVariable, objectsAnalyzed)
			}
			else
				return 'CIRCULAR'
		case 'function':
			return 'function(){}'
		case 'boolean':
			return theVariable ? 'true' : 'false'
		default:
			return 'ERROR!!'
	}
}


var getObjectLiteral = function (theVariable, objectsAnalyzed) {

	if (Array.isArray(theVariable))
		return getArrayLiteral(theVariable, objectsAnalyzed)
	else
		return getNonArrayObjectLiteral(theVariable, objectsAnalyzed)
}


var isCircularReference = function(theVariable,objectsAnalyzed){

	for (var objectsAnalyzedIndex = 0; objectsAnalyzedIndex < objectsAnalyzed.length; objectsAnalyzedIndex++) {
		
		if (objectsAnalyzed[objectsAnalyzedIndex] === theVariable)
			return true
	}
	return false
}


var getNonArrayObjectLiteral = function (theVariable, objectsAnalyzed) {

	if (theVariable == null) return 'null'
	if (theVariable == undefined) return 'undefined'
	
	var literal = '{'
	var objectProperties = Object.getOwnPropertyNames(theVariable)
	var objectValues = Object.values(theVariable)
	for (var objectPropertyIndex = 0; objectPropertyIndex < objectProperties.length; objectPropertyIndex++) {
		if (objectPropertyIndex > 0) literal += ','
		literal += objectProperties[objectPropertyIndex] + ':' +
			toLiteral(objectValues[objectPropertyIndex], objectsAnalyzed)
	}
	literal += '}'
	return literal
}

var getArrayLiteral = function (array, objectsAnalyzed) {

	var literal = '['
	for (var arrayIndex = 0; arrayIndex < array.length; arrayIndex++) {
		if (arrayIndex > 0) literal += ','
		literal += toLiteral(array[arrayIndex], objectsAnalyzed)
	}

	literal += ']'
	return literal
}

module.exports.toLiteral = toLiteral