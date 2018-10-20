/*var RuntimeSpy = require('../src/RuntimeSpy')
var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect

mocha.describe('Spies and Mocks', function () {

    mocha.it('long Function name', function () {
        var expectedJSON = {
            testedFunctionCall: 'testFunction()',
            resultLiteral: 'NOTSET',
            variables: [],
            functions:[{ name: 'b.w.b', values: '{input:[[]],output:[3]}' }]
        }
        var b = { q: 1, w: { a: 1, b: function () { return 3 } } }
        var testFunction = function () {
            var mySpy = new RuntimeSpy('mySpy')
            mySpy.setTestFunctionCall("testFunction()")
            eval(mySpy.addVariablesSpies({ 'b.w.b': b.w.b }).getCodeToEvalToSpyOnVariables())
            var a = b.w.b()

            expect(expectedJSON).to.deep.equal(mySpy.getHarnessNew())
        }
        testFunction()
    })

    mocha.it('should return definitions/calling statements (with param names)', function () {
        var expectedJSON = {
            testedFunctionCall: 'testFunction(a,b,2)',
            resultLiteral: 'NOTSET',
            variables:
                [{
                    name: 'a',
                    values: 'new Map([[\'Initial\',\'a = [1,2,3]\']])'
                },
                {
                    name: 'b',
                    values: 'new Map([[\'Initial\',\'b = {q:1,w:[1,2,3]}\']])'
                    }],
            functions:[]
        }
        var a = [1, 2, 3]
        var b = { q: 1, w: a }
        var testFunction = function (A, B, C) {
            var mySpy = new RuntimeSpy('mySpy')
            mySpy.setTestFunctionCall("testFunction(a,b,2)")
            eval(mySpy.addVariablesSpies({ a: a, b: b }).getCodeToEvalToSpyOnVariables())


            expect(expectedJSON).to.deep.equal(mySpy.getHarnessNew())
            return a[0] + b.q
        }
        testFunction(a, b, 2)
    })

    mocha.it('Mocks', function () {

        var expectedJSON = {
            testedFunctionCall: 'testFunction(A)',
            resultLiteral: 'result = 76',
            variables:
                [{ name: 'A', values: 'new Map([[\'Initial\',\'A = 5\']])' },
                {
                    name: 'globalVar',
                    values: 'new Map([[\'Initial\',\'globalVar = 5\'],[\'helper1_0\',\'globalVar = 42\'],[\'helper1_1\',\'globalVar = 10\']])'
                },
                {
                    name: 'globalVar2',
                    values: 'new Map([[\'Initial\',\'globalVar2 = {1:6,2:2,3:{1:1},4:{1:4,12:function(){}}};globalVar2[\\\'3\\\'][\\\'2\\\']=globalVar2\']])'
                }],
            functions:
                [
                    {
                        name: 'globalVar2[\'4\'][\'12\']',
                        values: '{input:[[3],[4]],output:[15,20]}'
                    }, { name: 'helper1', values: '{input:[[21],[5]],output:[42,10]}' },
                    { name: 'helper2', values: '{input:[[5]],output:[15]}' }]
        }
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

        var testFunction = function (A) {

            var mySpy = new RuntimeSpy('mySpy')
            mySpy.setTestFunctionCall("testFunction(A)")
            eval(mySpy.addVariablesSpies({ A: A, globalVar: globalVar, globalVar2: globalVar2, helper1: helper1, helper2: helper2 })
                .getCodeToEvalToSpyOnVariables())
            helper1(21)
            var a = globalVar2['4']['12'](3)
            var result = a + helper1(A) + helper2(A) + globalVar + globalVar2['3']['2']['1'] + globalVar2['4']['12'](4)
            mySpy.addFinalResult(result)

            expect(expectedJSON).to.deep.equal(mySpy.getHarnessNew())
        }

        testFunction(5)
    })

})

*/