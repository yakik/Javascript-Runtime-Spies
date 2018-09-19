var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect

var RuntimeSpy = require('../src/RuntimeSpy')
var SmartMock = require('../src/SmartMock')
var Variable = require('../src/Variable')
getMockFunction = SmartMock.getMockFunction


mocha.describe('Spies and Mocks', function () {

    mocha.it('should return definitions/calling statements (no param names)', function () {

        var a = [1, 2, 3]
        var b = { q: 1, w: a }
        var mySpy = new RuntimeSpy('mySpy')
        var testFunction = function () {
            mySpy.captureFunctionCall(arguments, 'testFunction')
            return a[0] + b.q
        }
        testFunction(a, b, 2)

        expect(eval(mySpy.getFunctionCallString())).equals(2)
    })

    mocha.it('should return definitions/calling statements (with param names)', function () {

        var a = [1, 2, 3]
        var b = { q: 1, w: a }
        var mySpy = new RuntimeSpy('mySpy')
        var testFunction = function (A, B, C) {
            mySpy.captureFunctionCall(arguments, 'testFunction', 'A,B ,C')
            return a[0] + b.q
        }
        testFunction(a, b, 2)

        expect(eval(mySpy.getFunctionCallString())).equals(2)
    })



    mocha.it('Mocks', function () {

        var helper1 = function (x) { return 2 * x }
        var helper2 = function (x) { return 3 * x }

        var mySpy = new RuntimeSpy('mySpy')

        var testFunction = function (A) {
            mySpy.captureFunctionCall(arguments, 'testFunction')
            var result = helper1(A) + helper2(A)
            return result
        }

        eval(mySpy.addFunctionSpies('helper1', 'helper2').getCodeToEvalToSpyOnFunctions())

        expect(testFunction(5)).equals(25)

        /*change original functions, we don't need them anymore for our test*/
        helper1 = function (x) { return 2 }
        helper2 = function (x) { return 2 }

        eval(mySpy.getHarness())

        expect(eval(mySpy.getFunctionCallString())).equals(25)
    })
})