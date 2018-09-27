var Harness = require('../src/Harness')
var RuntimeSpy = require('../src/RuntimeSpy')
var SmartMock = require('../src/FunctionMock')
var VariableLiteral = require('../src/VariableLiteral')
var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect




mocha.describe('Spies and Mocks', function () {

    mocha.it('long Function name', function () {
        var b = { q: 1, w: {a:1,b:function(){return 3}} }
        var harness = ''
        var testFunction = function () {
            var mySpy = new RuntimeSpy('mySpy')
            mySpy.setStartFunctionCall(arguments, 'testFunction')
            var text = mySpy.addGlobalVariablesSpies({ 'b.w.b': b.w.b }).getCodeToEvalToSpyOnVariables()
            
            eval(text)
            var a = b.w.b()
            harness = mySpy.getHarness()
            return a
        }
        testFunction()
        expect(eval(harness)).equals(3)
    })

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
        testFunction()
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
        globalVar2['3'] = b
        globalVar2['4'] = { 1: 4, 12: function (x) { return 5 * x } }

        var harness = ''

        var testFunction = function (A) {

            var mySpy = new RuntimeSpy('mySpy')
            mySpy.setStartFunctionCall(arguments, 'testFunction','A')
            var myText = mySpy.addGlobalVariablesSpies({ globalVar: globalVar, globalVar2: globalVar2, helper1: helper1, helper2: helper2 }).getCodeToEvalToSpyOnVariables()
            eval(myText)
            helper1(21)
            var a = globalVar2['4']['12'](3)
            var result = a+helper1(A) + helper2(A) + globalVar + globalVar2['3']['2']['1'] + globalVar2['4']['12'](4)
            mySpy.addFinalResult(result)
            harness = mySpy.getHarness()

            return result
        }



        expect(testFunction(5)).equals(76)

        helper1 = function (x) { return 2 }
        helper2 = function (x) { return 2 }
        globalVar = 8
       console.log(harness)
        eval(harness)
    })

    mocha.it('Mocks2', function () {
//empty, for temporary tests
       
    })

})

