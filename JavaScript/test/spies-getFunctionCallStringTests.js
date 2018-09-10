var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect

var Spies = require('../src/spies')


mocha.describe('get call string', function () {

    mocha.it('basic test', function () {

        var a = [1, 2, 3]
        var b = { q: 1, w: a }
        var callString = ''    
        var testFunction = function () {
            callString = Spies.getCallParamsDeclarationStringSpy(arguments,'testFunction')
        }
        testFunction(a, b, 2)
        

        expect(callString)
            .equals('var testFunction_param0 = [1,2,3]\nvar testFunction_param1 = {q:1,w:[1,2,3]}\nvar testFunction_param2 = 2\n')
    })
})