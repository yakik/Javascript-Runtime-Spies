var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect

var Spies = require('../src/spies')


mocha.describe('get call string', function () {

    mocha.it('should return definitions/calling statements (no param names)', function () {

        var a = [1, 2, 3]
        var b = { q: 1, w: a }
        var callString = ''    
        var testFunction = function () {
            callString = Spies.getDefinitionAndCallingStringSpy(arguments, 'testFunction')
            return a[0]+b.q
        }
        testFunction(a, b, 2)
        

        expect(callString)
            .equals('/****** Prep/Call Function testFunction ********/\n'+
                    'var testFunction_param0 = [1,2,3]\n' +
                    'var testFunction_param1 = {q:1,w:[1,2,3]}\n' +
                    'var testFunction_param2 = 2\n' +
                    '\n' +
                    'testFunction(testFunction_param0, testFunction_param1, testFunction_param2)\n' +
            '\n')
        expect (eval(callString)).equals(2)
    })

    mocha.it('should return definitions/calling statements (with param names)', function () {

        var a = [1, 2, 3]
        var b = { q: 1, w: a }
        var callString = ''    
        var testFunction = function (A,B,C) {
            callString = Spies.getDefinitionAndCallingStringSpy(arguments, 'testFunction','A,B ,C')
            return a[0]+b.q
        }
        testFunction(a, b, 2)
        

        expect(callString)
            .equals('/****** Prep/Call Function testFunction ********/\n'+
                    'var A = [1,2,3]\n' +
                    'var B = {q:1,w:[1,2,3]}\n' +
                    'var C = 2\n' +
                    '\n' +
                    'testFunction(A, B, C)\n' +
            '\n')
        expect (eval(callString)).equals(2)
    })

    mocha.it('should return spy method', function () {

        var toLiteral = require('../src/toLiteral').toLiteral
        captureInput = Spies.captureInput
        captureOutput = Spies.captureOutput
        argumentsToString = Spies.argumentsToString
        checkSpyCameraReadiness = Spies.checkSpyCameraReadiness
        var trafficCapture = {}
        
        var a = [1, 2, 3]
        var b = { q: 1, w: [1,2,3] }

        var testFunction = function (A, B) {
            return A[0]+B.q
        }

        spyFunctionDefinition = Spies.
            getSpyTextForFunction('testFunction', 'originaltestFunction', 'trafficCapture')
        eval(spyFunctionDefinition)
        expect(testFunction(a, b)).equals(2)
        expect(testFunction([6, 2, 3], { q: 5, w: a })).equals(11)
        expect(toLiteral(trafficCapture.testFunction.input[0])).
            equals(toLiteral([[1, 2, 3], { q: 1, w: [1, 2, 3] }]))
        expect(toLiteral(trafficCapture.testFunction.input[1])).
            equals(toLiteral([[6, 2, 3], { q: 5, w: [1, 2, 3] }]))
        expect(trafficCapture.testFunction.output[0]).equals(2)
        expect(trafficCapture.testFunction.output[1]).equals(11)
    })
})