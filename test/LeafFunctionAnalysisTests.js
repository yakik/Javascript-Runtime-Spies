var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect
var leafFunctionsAnalysis = require('../src/LeafFunctionsAnalysis')

mocha.describe('Variable Analysis Tests', function () {

   
    mocha.it('detect function object', function () {
        var testedVariable = { a: function () { return 3 },b:{c:5,d:function(){return 5}} }
        var analysis = ['.a', '.b.d']
        expect(leafFunctionsAnalysis(testedVariable)).deep.equals(analysis)
    })

    mocha.it('detect function array', function () {
        var testedVariable = { a: function () { return 3 },b:[1,function(){return 5}] }
        var analysis = ['.a', '.b[1]']
        expect(leafFunctionsAnalysis(testedVariable)).deep.equals(analysis)
    })
})

