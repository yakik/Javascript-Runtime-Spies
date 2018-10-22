var RuntimeSpy = require('../src/RuntimeSpy')
var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect

mocha.describe('Create Spy JSON Tests', function () {

    mocha.it('one variable, one value', function () {
        var expectedJSON = {
            testedFunctionCall: 'testFunction(a)',
            result: 'NOTSET',
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
            eval(RuntimeSpy.getSpiesCode({ variables: [{ name: "a", value : a }] }))

            expect(mySpy.getReadableHarness(spiesDB)).to.deep.equal(expectedJSON)
        }
        testFunction(2)
    })

    mocha.it('two variables, one value', function () {
        var expectedJSON = {
            testedFunctionCall: 'testFunction(a,b,c,d,e)',
            result: 'NOTSET',
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
                        timing: 'Initial'
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
            eval(RuntimeSpy.getSpiesCode({ variables: [{ name:'a',value: a }, {name: 'b', value:b }, { name:'c', value:c }, { name:'d', value:d }, { name:'e',value: e }] }))

            expect(mySpy.getReadableHarness(spiesDB)).to.deep.equal(expectedJSON)
        }
        testFunction(2,true,undefined,"string","string\nstring")
    })

    mocha.it('one function', function () {
        var expectedJSON = {
            testedFunctionCall: 'testFunction(a)',
            result: 8,
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
            eval(RuntimeSpy.getSpiesCode({ functions: [ {name: 'a'} ] }))
            b = a(1, 5) + a(5, -3)
            mySpy.addFinalResult(b)
            spyJSON = mySpy.getReadableHarness(spiesDB)
            
            expect(mySpy.getReadableHarness(spiesDB)).to.deep.equal(expectedJSON)
            return b
        }
        var a = function(x,y){return x+y}
        testFunction(a)
    })
})

