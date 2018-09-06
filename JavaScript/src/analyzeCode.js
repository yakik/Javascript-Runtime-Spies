var escope = require('escope');
var esprima = require('esprima');


//var currentScope = scopeManager.acquire(ast);   // global scope

module.exports.getAnalyzedFunctions = function (code) {

    var ast = esprima.parse(code);
   

    var scopeManager = escope.analyze(ast);
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