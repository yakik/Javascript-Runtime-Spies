
var getParamString = function (params) {
    var paramsText = '(';
    params.forEach(function (param, paramIndex) {
        if (paramIndex > 0)
        paramsText += ', ';
        paramsText += param.name;
    });
    paramsText += ')';
    return paramsText;
}


var escope = require('escope');
var esprima = require('esprima');
var ToLiteral = require('./src/toLiteral')
var AnalyzeCode = require('./src/analyzeCode')
var fs = require("fs")
var text = fs.readFileSync(process.argv[2]).toString('utf-8')
var ast = esprima.parse(text)
var scopeManager = escope.analyze(ast);
ast.body.forEach(statement => {
    if ((statement.type == 'VariableDeclaration') &&
        (statement.declarations[0].init.type == 'FunctionExpression')) {
        console.log('Function: ' + statement.declarations[0].id.name + getParamString(statement.declarations[0].init.params))
        
            
        }
    
})











