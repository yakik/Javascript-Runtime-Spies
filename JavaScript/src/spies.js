var ToLiteral = require('./toLiteral')

module.exports.getCallParamsDeclarationStringSpy =
	function (callingFunctionArguments, varPrefix) {
		var declarations = ''
		Array.from(callingFunctionArguments).forEach((argument,index) => {
			declarations+='var '+varPrefix+'_param'+index+' = '+ToLiteral.toLiteral(argument)+'\n'
		})
		return declarations;
	
}