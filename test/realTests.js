var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect
var Harness = require('../src/Harness')
var myFunction0 = require('./myFunction0')

mocha.describe('Real Tests', function () {

    mocha.it('function 0', function () {
        var myHarness = new Harness('myHarness')
        var mockRepositoryData = {}
        mockRepositoryData['__webpack_require__'] = {input:[[1],[2],[3],[4],[5],[6],[7],[8],[88]],output:[{},{},{},{},function(){},{},function(){},{__esModule:true,version:'3.6.0',Reference:function(){},Variable:function(){},Scope:function(){},ScopeManager:function(){},analyze:function(){}},{version:'2.7.2',tokenize:function(){},parse:function(){},Syntax:{AssignmentExpression:'AssignmentExpression',AssignmentPattern:'AssignmentPattern',ArrayExpression:'ArrayExpression',ArrayPattern:'ArrayPattern',ArrowFunctionExpression:'ArrowFunctionExpression',BlockStatement:'BlockStatement',BinaryExpression:'BinaryExpression',BreakStatement:'BreakStatement',CallExpression:'CallExpression',CatchClause:'CatchClause',ClassBody:'ClassBody',ClassDeclaration:'ClassDeclaration',ClassExpression:'ClassExpression',ConditionalExpression:'ConditionalExpression',ContinueStatement:'ContinueStatement',DoWhileStatement:'DoWhileStatement',DebuggerStatement:'DebuggerStatement',EmptyStatement:'EmptyStatement',ExportAllDeclaration:'ExportAllDeclaration',ExportDefaultDeclaration:'ExportDefaultDeclaration',ExportNamedDeclaration:'ExportNamedDeclaration',ExportSpecifier:'ExportSpecifier',ExpressionStatement:'ExpressionStatement',ForStatement:'ForStatement',ForOfStatement:'ForOfStatement',ForInStatement:'ForInStatement',FunctionDeclaration:'FunctionDeclaration',FunctionExpression:'FunctionExpression',Identifier:'Identifier',IfStatement:'IfStatement',ImportDeclaration:'ImportDeclaration',ImportDefaultSpecifier:'ImportDefaultSpecifier',ImportNamespaceSpecifier:'ImportNamespaceSpecifier',ImportSpecifier:'ImportSpecifier',Literal:'Literal',LabeledStatement:'LabeledStatement',LogicalExpression:'LogicalExpression',MemberExpression:'MemberExpression',MetaProperty:'MetaProperty',MethodDefinition:'MethodDefinition',NewExpression:'NewExpression',ObjectExpression:'ObjectExpression',ObjectPattern:'ObjectPattern',Program:'Program',Property:'Property',RestElement:'RestElement',ReturnStatement:'ReturnStatement',SequenceExpression:'SequenceExpression',SpreadElement:'SpreadElement',Super:'Super',SwitchCase:'SwitchCase',SwitchStatement:'SwitchStatement',TaggedTemplateExpression:'TaggedTemplateExpression',TemplateElement:'TemplateElement',TemplateLiteral:'TemplateLiteral',ThisExpression:'ThisExpression',ThrowStatement:'ThrowStatement',TryStatement:'TryStatement',UnaryExpression:'UnaryExpression',UpdateExpression:'UpdateExpression',VariableDeclaration:'VariableDeclaration',VariableDeclarator:'VariableDeclarator',WhileStatement:'WhileStatement',WithStatement:'WithStatement',YieldExpression:'YieldExpression'}}]}
        mockRepositoryData['document[\'location\'][\'replace\']'] = {input:[],output:[]}
        mockRepositoryData['document[\'location\'][\'assign\']'] = {input:[],output:[]}
        mockRepositoryData['document[\'location\'][\'reload\']'] = {input:[],output:[]}
        mockRepositoryData['document[\'location\'][\'toString\']'] = {input:[],output:[]}
        mockRepositoryData['document[\'location\'][\'valueOf\']'] = {input:[],output:[]}
        myHarness.setMockRepositoryData(mockRepositoryData)
        module_DB = new Map([['Initial','module = {exports:{},id:0,loaded:false}']])
        var module
        
        myHarness.addGlobalVariableMock('module',module_DB)
        exports_DB = new Map([['Initial','exports = {}']])
        var exports
        
        myHarness.addGlobalVariableMock('exports',exports_DB)
        document_DB = new Map([['Initial','document = {location:{replace:function(){},assign:function(){},href:\'http://localhost:3000/\',ancestorOrigins:{},origin:\'http://localhost:3000\',protocol:\'http:\',host:\'localhost:3000\',hostname:\'localhost\',port:\'3000\',pathname:\'/\',search:\'\',hash:\'\',reload:function(){},toString:function(){},valueOf:function(){}}}']])
        var document
        
        myHarness.addGlobalVariableMock('document',document_DB)
        Infinity_DB = new Map([['Initial','Infinity = Infinity']])
        var Infinity
        
        myHarness.addGlobalVariableMock('Infinity',Infinity_DB)
        myHarness.updateVariablesByTag('Initial',function(codeToEval){eval(codeToEval)})
        myHarness.addFunctionMock('__webpack_require__')
        __webpack_require__= function(){
        return myHarness.callFunctionSpy('__webpack_require__',arguments,function(codeToEval){eval(codeToEval)})
        }
        myHarness.addFunctionMock('document[\'location\'][\'replace\']')
        document['location']['replace']= function(){
        return myHarness.callFunctionSpy('document[\'location\'][\'replace\']',arguments,function(codeToEval){eval(codeToEval)})
        }
        myHarness.addFunctionMock('document[\'location\'][\'assign\']')
        document['location']['assign']= function(){
        return myHarness.callFunctionSpy('document[\'location\'][\'assign\']',arguments,function(codeToEval){eval(codeToEval)})
        }
        myHarness.addFunctionMock('document[\'location\'][\'reload\']')
        document['location']['reload']= function(){
        return myHarness.callFunctionSpy('document[\'location\'][\'reload\']',arguments,function(codeToEval){eval(codeToEval)})
        }
        myHarness.addFunctionMock('document[\'location\'][\'toString\']')
        document['location']['toString']= function(){
        return myHarness.callFunctionSpy('document[\'location\'][\'toString\']',arguments,function(codeToEval){eval(codeToEval)})
        }
        myHarness.addFunctionMock('document[\'location\'][\'valueOf\']')
        document['location']['valueOf']= function(){
        return myHarness.callFunctionSpy('document[\'location\'][\'valueOf\']',arguments,function(codeToEval){eval(codeToEval)})
        }
        myFunction0(module, exports, __webpack_require__)
    })
})

