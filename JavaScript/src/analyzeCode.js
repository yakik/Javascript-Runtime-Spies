var escope = require('escope');
var esprima = require('esprima');


//var currentScope = scopeManager.acquire(ast);   // global scope

module.exports.getAnalyzedFunctions = function (code) {

    var ast = esprima.parse(code);
   

    var scopeManager = escope.analyze(ast);
    var functions = getAnalysisObject(scopeManager)
    var analysisText = 'Analysis of the code:\n'
    functions.forEach(functionAnalysis => {
        analysisText +='Function name:\n '
        analysisText += getFunctionParametersText(functionAnalysis);
        analysisText += getFunctionExternalVariablesText(functionAnalysis);
    })
    return analysisText
}

var getParams = function (scope) {
    var params = []
    scope.block.params.forEach(param => {
        params.push(param.name)
    })
    return params
}

var getNonFunctionScopeVariables = function (scope) {
    var nonFunctionScopeVariables = []
    scope.through.forEach(variable => {
        nonFunctionScopeVariables.push(variable.identifier.name)
    })
    return nonFunctionScopeVariables
}

function getFunctionExternalVariablesText(functionAnalysis) {
    var analysisText = '\tExternal Variables:\n';
    functionAnalysis.nonFunctionScopeVariables.forEach(function (variable) {
        analysisText += '\tVariable: ' + variable + '\n';
        
    });
    analysisText += '\n';
    return analysisText;
}

function getFunctionParametersText(functionAnalysis) {
    var analysisText = '\tParameters:(';
    functionAnalysis.params.forEach(function (param, paramIndex) {
        if (paramIndex > 0)
            analysisText += ', ';
        analysisText += param;
    });
    analysisText += ')\n';
    return analysisText;
}

module.exports.getFunctionParametersText =getFunctionParametersText

function getAnalysisObject(scopeManager) {
    var functions = []
    scopeManager.scopes.forEach(scope => {
        if (scope.type == 'function') {
            functions.push({
                params: getParams(scope),
                nonFunctionScopeVariables: getNonFunctionScopeVariables(scope)
            })
        }
    })
    return functions
}
/****************************************************************
 * 
 * ********escope*******
[ 'scopes',
  'globalScope',
  '__nodeToScope',
  '__currentScope',
  '__options',
  '__declaredVariables' ]
********each scope*******
[ 'type',
  'set',
  'taints',
  'dynamic',
  'block',
  'through',
  'variables',
  'references',
  'variableScope',
  'functionExpressionScope',
  'directCallToEvalScope',
  'thisFound',
  '__left',
  'upper',
  'isStrict',
  'childScopes',
  '__declaredVariables',
  'implicit' ]
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 **************************************************************************************************/