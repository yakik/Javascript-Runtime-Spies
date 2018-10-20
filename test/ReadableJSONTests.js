var RuntimeSpy = require('../src/RuntimeSpy')
var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect

mocha.describe('Readable JSON', function () {

    mocha.it('one variable, one value', function () {
        var expectedJSON = {
            testedFunctionCall: 'testFunction(a)',
            resultLiteral: 'NOTSET',
            variables:
                [{
                    name: 'a',
                    values: [{
                        timing: 'Initial',
                        value: 2
                    }]
                }
                ],
            functions: []
        }

        var testFunction = function (a) {
            var mySpy = new RuntimeSpy('mySpy')
            mySpy.setTestFunctionCall("testFunction(a)")
            eval(mySpy.addSpies({ variables: [{ name: "a", value : a }] }).getCodeToEvalToSpyOnVariables())

            expect(mySpy.getReadableHarness()).to.deep.equal(expectedJSON)
        }
        testFunction(2)
    })

    mocha.it('two variables, one value', function () {
        var expectedJSON = {
            testedFunctionCall: 'testFunction(a,b,c,d,e)',
            resultLiteral: 'NOTSET',
            variables:
                [{
                    name: 'a',
                    values: [{
                        timing: 'Initial',
                        value: 2
                    }]
                },
                {
                    name: 'b',
                    values: [{
                        timing: 'Initial',
                        value: true
                    }]
                }, {
                    name: 'c',
                    values: [{
                        timing: 'Initial',
                        value: undefined
                    }]
                }, {
                    name: 'd',
                    values: [{
                        timing: 'Initial',
                        value: "string"
                    }]
                }, {
                    name: 'e',
                    values: [{
                        timing: 'Initial',
                        value: "string\nstring"
                    }]
                }
                ],
            functions: []
        }

        var testFunction = function (a,b,c,d,e) {
            var mySpy = new RuntimeSpy('mySpy')
            mySpy.setTestFunctionCall("testFunction(a,b,c,d,e)")
            eval(mySpy.addSpies({ variables: [{ name:'a',value: a }, {name: 'b', value:b }, { name:'c', value:c }, { name:'d', value:d }, { name:'e',value: e }] }).getCodeToEvalToSpyOnVariables())

            expect(mySpy.getReadableHarness()).to.deep.equal(expectedJSON)
        }
        testFunction(2,true,undefined,"string","string\nstring")
    })

    mocha.it('one function', function () {
        var expectedJSON = {
            testedFunctionCall: 'testFunction(a)',
            resultLiteral: 'NOTSET',
            variables:[],
            functions: [{
                name: 'a',
                traffic: [{
                    callNumber: 0,
                    arguments: [1,5],
                    returnValue: 6
                },{
                    callNumber: 1,
                    arguments: [5,-3],
                    returnValue: 2
                }]
            }]
        }

        var testFunction = function (a) {
            var mySpy = new RuntimeSpy('mySpy')
            mySpy.setTestFunctionCall('testFunction(a)')
            eval(mySpy.addSpies({ functions: [ {name: 'a'} ] }).getCodeToEvalToSpyOnVariables())
            a(1, 5)
            a(5,-3)
            expect(mySpy.getReadableHarness()).to.deep.equal(expectedJSON)
        }
        var a = function(x,y){return x+y}
        testFunction(a)
    })
})

