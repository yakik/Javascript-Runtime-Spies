var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect

var Spies = require('../src/spies')
var Mocks = require('../src/mocks')

var toLiteral = require('../src/toLiteral').toLiteral
        captureInput = Spies.captureInput
        captureOutput = Spies.captureOutput
        argumentsToString = Spies.argumentsToString
checkSpyCameraReadiness = Spies.checkSpyCameraReadiness
        
getMockTextForFunction = Mocks.getMockTextForFunction
checkMockDataReadiness = Mocks.checkMockDataReadiness
assertInput = Mocks.assertInput
getOutput = Mocks.getOutput


mocha.describe('Spies and Mocks', function () {

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


    mocha.it('Mocks', function () {

        var helper1 = function (x) { return 2 * x }
        var helper2 = function (x) { return 3 * x }
        helper1(4)
        var testFunction = function (A) {
            return helper1(A)+helper2(A)
        }
        expect(testFunction(5)).equals(25)
/* Spy */
        var trafficCapture = {}

        spyFunctionDefinition = Spies.
            getSpyTextForFunction('helper1', 'originalhelper1', 'trafficCapture')
        eval(spyFunctionDefinition)
        spyFunctionDefinition = Spies.
            getSpyTextForFunction('helper2', 'originalhelper2', 'trafficCapture')
        eval(spyFunctionDefinition)

        expect(testFunction(5)).equals(25)
/*delete original functions, we don't need them anymore*/
      //  helper1 = null
      //  helper2 = null

        /*mock*/
        eval ('var mockDataSource = '+toLiteral(trafficCapture))
        //console.log( toLiteral(trafficCapture))
        //console.log(mockDataSource.helper1)
        //console.log(toLiteral(mockDataSource))
        mockFunctionDefinition = getMockTextForFunction('helper1', 'mockDataSource')
     // console.log(mockFunctionDefinition)
        eval(mockFunctionDefinition)
        mockFunctionDefinition = Mocks.
        getMockTextForFunction('helper2', 'mockDataSource')
        eval(mockFunctionDefinition)
        expect(testFunction(5)).equals(25)
        
        
    })
})