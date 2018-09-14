

var toCodeDefinition = function (theVariable, objectsAnalyzed) {

	if (objectsAnalyzed === undefined)
		objectsAnalyzed = []

	var variableDefinition = { literal: '', circularReferences:[], functionSpies:[] }

	switch (typeof theVariable) {
		case 'number':
			variableDefinition.literal = theVariable.toString()
			break
		case 'string':
			variableDefinition.literal = '\'' + theVariable + '\''
			break
		case 'undefined':

			variableDefinition.literal = 'undefined'
			break

		case 'object':
			if (!isCircularReference(theVariable, objectsAnalyzed)) {
				objectsAnalyzed.push(theVariable)
				return getObjectLiteral(theVariable, objectsAnalyzed)
			}
			else
				variableDefinition.literal = 'CIRCULAR'
			break
		case 'function':
			variableDefinition.literal = 'function(){}'
			break
		case 'boolean':
			variableDefinition.literal = theVariable ? 'true' : 'false'
			break
		default:
			variableDefinition.literal = 'ERROR!!'
	}
	return variableDefinition
}


var getObjectLiteral = function (theVariable, objectsAnalyzed) {

	if (Array.isArray(theVariable))
		return getArrayLiteral(theVariable, objectsAnalyzed)
	else
		return getNonArrayObjectLiteral(theVariable, objectsAnalyzed)
}


var isCircularReference = function (theVariable, objectsAnalyzed) {

	for (var objectsAnalyzedIndex = 0; objectsAnalyzedIndex < objectsAnalyzed.length; objectsAnalyzedIndex++) {

		if (objectsAnalyzed[objectsAnalyzedIndex] === theVariable)
			return true
	}
	return false
}


var getNonArrayObjectLiteral = function (theVariable, objectsAnalyzed) {
	var variableDefinition = { literal: '', circularReferences:[], functionSpies:[] }

	

	variableDefinition.literal = '{'
	var objectProperties = Object.getOwnPropertyNames(theVariable)
	var objectValues = Object.values(theVariable)
	for (var objectPropertyIndex = 0; objectPropertyIndex < objectProperties.length; objectPropertyIndex++) {
		if (objectPropertyIndex > 0) variableDefinition.literal += ','
		variableDefinition.literal += objectProperties[objectPropertyIndex] + ':' +
			toCodeDefinition(objectValues[objectPropertyIndex], objectsAnalyzed).literal
	}
	variableDefinition.literal += '}'
	return variableDefinition
}

var getArrayLiteral = function (theVariable, objectsAnalyzed) {
	var variableDefinition = { literal: '', circularReferences:[], functionSpies:[] }

	variableDefinition.literal = '['
	for (var arrayIndex = 0; arrayIndex < theVariable.length; arrayIndex++) {
		if (arrayIndex > 0) variableDefinition.literal += ','
		variableDefinition.literal += toCodeDefinition(theVariable[arrayIndex], objectsAnalyzed).literal
	}

	variableDefinition.literal += ']'
	return variableDefinition
}

