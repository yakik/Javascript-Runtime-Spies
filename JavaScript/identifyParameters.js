module.exports.identifyParameters = function(parametersString,arguments){
	parametersArray = parametersString.split(',')
	var returnString = ''
		for (var argumentNumber = 0; argumentNumber<arguments.length;argumentNumber++){
			returnString +=  'var ' + parametersArray[argumentNumber] +
				' = ' + arguments[argumentNumber] + ';\n';
		}
	return returnString
	}