var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect
var variableAnalysis = require('../src/LeafFunctionsAnalysis')

mocha.describe('Variable Analysis Tests', function () {

   
    mocha.it('detect function', function () {
        var testedVariable = { a: function () { return 3 },b:{c:5,d:function(){return 5}} }
        var analysis = ['.a', '.b.d']
        expect(variableAnalysis(testedVariable)).deep.equals(analysis)
    })
})

