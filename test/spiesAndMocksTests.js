var RuntimeSpy = require('../src/RuntimeSpy')
var SmartMock = require('../src/SmartMock')
var VariableLiteral = require('../src/VariableLiteral')
var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect




mocha.describe('Spies and Mocks', function () {

    mocha.it('should return definitions/calling statements (no param names)', function () {
        var a = [1, 2, 3]
        var b = { q: 1, w: a }
        var harness = ''
        var testFunction = function () {
            var mySpy = new RuntimeSpy('mySpy')
            mySpy.setStartFunctionCall(arguments, 'testFunction')
            eval(mySpy.getCodeToEvalToSpyOnVariables())
            harness = mySpy.getHarness()
            return a[0] + b.q
        }
        testFunction(a, b, 2)
        expect(eval(harness)).equals(2)
    })

  

  

    mocha.it('should return definitions/calling statements (with param names)', function () {
        var a = [1, 2, 3]
        var b = { q: 1, w: a }
        var harness = ''
        var testFunction = function (A, B, C) {
            var mySpy = new RuntimeSpy('mySpy')
            mySpy.setStartFunctionCall(arguments, 'testFunction', 'A,B,C')
            eval(mySpy.getCodeToEvalToSpyOnVariables())
            harness = mySpy.getHarness()
            return a[0] + b.q
        }
        testFunction(a, b, 2)
        expect(eval(harness)).equals(2)
    })

   

    mocha.it('Mocks', function () {
        
        var helper1 = function (x) {
            
            globalVar = 2 * x
            return 2 * x
        }
        var helper2 = function (x) { return 3 * x }
        var globalVar = 5
        var globalVar2 = { 1: 6, 2: 2 }
        var b = { 1: 1, 2: globalVar2 }
        globalVar2['3']=b

var harness = ''        

        var testFunction = function (A) {
            
            var mySpy = new RuntimeSpy('mySpy')
            mySpy.setStartFunctionCall(arguments, 'testFunction')
            eval(mySpy.addVariableSpies('globalVar', 'globalVar2').getCodeToEvalToSpyOnVariables())
            var functiontext = mySpy.addFunctionSpies('helper1', 'helper2').getCodeToEvalToSpyOnFunctions()
            eval(functiontext)

            helper1(21)
            var result = helper1(A) + helper2(A) + globalVar + globalVar2['3']['2']['1']
            harness = mySpy.getHarness()
            return result
        }

       

        expect(testFunction(5)).equals(41)

        helper1 = function (x) { return 2 }
        helper2 = function (x) { return 2 }
        globalVar = 8
      //  console.log(harness)
        
        expect(eval(harness)).equals(39)
    })
})



