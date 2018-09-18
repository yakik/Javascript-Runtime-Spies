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
        var mySpy = new RuntimeSpy()
        var testFunction = function () {
            mySpy.getDefinitionAndCallingStringSpy(arguments, 'testFunction')
            return a[0] + b.q
        }
        testFunction(a, b, 2)

        expect(eval(mySpy.getFunctionCallString())).equals(2)
    })

    mocha.it('should return definitions/calling statements (with param names)', function () {

        var a = [1, 2, 3]
        var b = { q: 1, w: a }
        var mySpy = new RuntimeSpy()
        var testFunction = function (A, B, C) {
            mySpy.getDefinitionAndCallingStringSpy(arguments, 'testFunction', 'A,B ,C')
            return a[0] + b.q
        }
        testFunction(a, b, 2)

        expect(eval(mySpy.getFunctionCallString())).equals(2)
    })

    mocha.it('should return spy method', function () {


        var mySpy = new RuntimeSpy()

        var a = [1, 2, 3]
        var b = { q: 1, w: [1, 2, 3] }

        var testFunction = function (A, B) {
            return A[0] + B.q
        }

        testFunction = mySpy.getSpyFunction(this, 'testFunction', testFunction)
        expect(testFunction(a, b)).equals(2)
        expect(testFunction([6, 2, 3], { q: 5, w: a })).equals(11)
        expect(Variable.getVariable(mySpy.getTrafficData().testFunction.input[0]).getLiteral()).
            equals(Variable.getVariable([[1, 2, 3], { q: 1, w: [1, 2, 3] }]).getLiteral())
        expect(Variable.getVariable(mySpy.getTrafficData().testFunction.input[1]).getLiteral()).
            equals(Variable.getVariable([[6, 2, 3], { q: 5, w: [1, 2, 3] }]).getLiteral())
        expect(mySpy.getTrafficData().testFunction.output[0]).equals(2)
        expect(mySpy.getTrafficData().testFunction.output[1]).equals(11)
    })


    mocha.it('Mocks', function () {

        var helper1 = function (x) { return 2 * x }
        var helper2 = function (x) { return 3 * x }
        
        var mySpy = new RuntimeSpy()
        var testFunction = function (A) {
            mySpy.getDefinitionAndCallingStringSpy(arguments, 'testFunction')
            return helper1(A) + helper2(A)
        }
        expect(testFunction(5)).equals(25)
        /* Spy */
        

        helper1 = mySpy.getSpyFunction(this, 'helper1', helper1)
        helper2 = mySpy.getSpyFunction(this, 'helper2', helper2)

        expect(testFunction(5)).equals(25)

        /*change original functions, we don't need them anymore for our test*/
        helper1 = function (x) { return 2 }
        helper2 = function (x) { return 2 }

        /*mock*/
        helper1 = getMockFunction('helper1', mySpy.getTrafficData())
        helper2 = getMockFunction('helper2', mySpy.getTrafficData())
        expect(eval(mySpy.getFunctionCallString())).equals(25)
    })
})