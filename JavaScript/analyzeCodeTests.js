var mocha = require('mocha')
var chai = require('chai')
//chai.use(require('chai-as-promised'))
var expect = chai.expect
const assertArrays = require('chai-arrays');
chai.use(assertArrays);

var IdentifyParameters = require('./identifyParameters.js')
var analyzeCode = require('./analyzeCode.js')

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
console.log(IdentifyParameters.getObjectLiteral(functions))


    /*  console.log(Object.getOwnPropertyNames(fileElements))
    // console.log(fileElements.__declaredVariables)
    fileElements.scopes[0].implicit.set.forEach(function(value, key) {
     console.log(key + ' = ' + value);
     });
     console.log(fileElements.scopes.length) */
   // console.log(IdentifyParameters.identifyParameters('a', [suspiciousVariables]))
   /* console.log('********escope*******')
   console.log(Object.getOwnPropertyNames(suspiciousVariables))
    console.log('********each scope*******')
    console.log(Object.getOwnPropertyNames(suspiciousVariables.scopes[0])) */
   /* expect(suspiciousVariables).
      to.be.equalTo(['console', 'd']);*/
  })


})