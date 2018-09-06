var mocha = require('mocha')
var chai = require('chai')
//chai.use(require('chai-as-promised'))
var expect = chai.expect
const assertArrays = require('chai-arrays');
chai.use(assertArrays);

var ToLiteral = require('../src/toLiteral')
var analyzeCode = require('../src/analyzeCode')

mocha.describe('get all functions', function () {
  mocha.it('should return all undeclared variables', function () {
    var functions = analyzeCode.getAnalyzedFunctions(String.raw`
    var chai = require('chai')
    var getArgumentLiteral = function (theArgument,a) {
     console.log('hi')
      }
      var b = function (a,b,c) {
     var e =5
        chai.dd(a,b,c)
        f+=e
        chai.dd(1,2,3)
      }
    
`)
    
   expect(ToLiteral.toLiteral(functions)).
   equals('[{params:[\'theArgument\',\'a\'],nonFunctionScopeVariables:[\'console\']},{params:[\'a\',\'b\',\'c\'],nonFunctionScopeVariables:[\'chai\',\'f\',\'chai\']}]');
  })


})