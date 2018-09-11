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
})