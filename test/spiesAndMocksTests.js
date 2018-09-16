var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect

var Spies = require('../src/RuntimeSpies')
var Mocks = require('../src/SmartMocks')

var CodeDefinition = require('../src/CodeDefinition')
captureInput = Spies.captureInput
captureOutput = Spies.captureOutput
argumentsToString = Spies.argumentsToString
checkSpyDataReadiness = Spies.checkSpyDataReadiness
getSpyFunction = Spies.getSpyFunction
getDefinitionAndCallingStringSpy = Spies.getDefinitionAndCallingStringSpy


getMockFunction = Mocks.getMockFunction
checkMockDataReadiness = Mocks.checkMockDataReadiness
assertInput = Mocks.assertInput
getOutput = Mocks.getOutput


mocha.describe('Spies and Mocks', function () {

    mocha.it('should return definitions/calling statements (no param names)', function () {

        var a = [1, 2, 3]
        var b = { q: 1, w: a }
        var callString = ''
        var testFunction = function () {
            callString = getDefinitionAndCallingStringSpy(arguments, 'testFunction')
            return a[0] + b.q
        }
        testFunction(a, b, 2)

        expect(eval(callString)).equals(2)
    })

    mocha.it('should return definitions/calling statements (with param names)', function () {

        var a = [1, 2, 3]
        var b = { q: 1, w: a }
        var callString = ''
        var testFunction = function (A, B, C) {
            callString = getDefinitionAndCallingStringSpy(arguments, 'testFunction', 'A,B ,C')
            return a[0] + b.q
        }
        testFunction(a, b, 2)

        expect(eval(callString)).equals(2)
    })

    mocha.it('should return spy method', function () {


        var trafficCapture = {}

        var a = [1, 2, 3]
        var b = { q: 1, w: [1, 2, 3] }

        var testFunction = function (A, B) {
            return A[0] + B.q
        }

        testFunction = getSpyFunction(this, 'testFunction', testFunction, trafficCapture)
        expect(testFunction(a, b)).equals(2)
        expect(testFunction([6, 2, 3], { q: 5, w: a })).equals(11)
        expect(CodeDefinition.getCodeDefinition(trafficCapture.testFunction.input[0]).getLiteral()).
            equals(CodeDefinition.getCodeDefinition([[1, 2, 3], { q: 1, w: [1, 2, 3] }]).getLiteral())
        expect(CodeDefinition.getCodeDefinition(trafficCapture.testFunction.input[1]).getLiteral()).
            equals(CodeDefinition.getCodeDefinition([[6, 2, 3], { q: 5, w: [1, 2, 3] }]).getLiteral())
        expect(trafficCapture.testFunction.output[0]).equals(2)
        expect(trafficCapture.testFunction.output[1]).equals(11)
    })


    mocha.it('Mocks', function () {

        var helper1 = function (x) { return 2 * x }
        var helper2 = function (x) { return 3 * x }
        
        var callString = ''

        var testFunction = function (A) {
            callString = getDefinitionAndCallingStringSpy(arguments, 'testFunction')
            return helper1(A) + helper2(A)
        }
        expect(testFunction(5)).equals(25)
        /* Spy */
        var trafficCapture = {}

        helper1 = getSpyFunction(this, 'helper1', helper1, trafficCapture)
        helper2 = getSpyFunction(this, 'helper2', helper2, trafficCapture)

        expect(testFunction(5)).equals(25)

        /*change original functions, we don't need them anymore for our test*/
        helper1 = function (x) { return 2 }
        helper2 = function (x) { return 2 }

        /*mock*/
        eval('var mockDataSource = ' + CodeDefinition.getCodeDefinition(trafficCapture).getLiteral())
        helper1 = getMockFunction('helper1', mockDataSource)
        helper2 = getMockFunction('helper2', mockDataSource)
        expect(eval(callString)).equals(25)
    })
})