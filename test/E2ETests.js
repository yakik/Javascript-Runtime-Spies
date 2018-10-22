var RuntimeSpy = require('../src/RuntimeSpy')
var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect
var JSONToJavascript = require('../src/JSONToJavascript')
var SpyJSONToHarnessJSON = require('../src/SpyJSONToHarnessJSON')

mocha.describe('E2E Tests', function () {

   
    mocha.it('one function', function () {
        var spyJSON = {}
        var firstRun = true
        var testFunction = function (a1, d1,e1) {
            if (firstRun) {
                var mySpy = new RuntimeSpy('mySpy')
                mySpy.setTestFunctionCall('testFunction(a1,d1,e1)')
                eval(RuntimeSpy.getSpiesCode({ variables: [{ name: 'd1' }, {name:'e1'}], functions: [{ name: 'a1' }] }))
            }
            var b1 = a1(1, 5) + a1(5, -3) + d1 + e1[4].f// +myMap1.get('eas') 
            if (firstRun) {
                mySpy.addFinalResult(17)
                spyJSON = mySpy.getReadableHarness(spiesDB)
            }
            return b1
        }
        var a = function (x, y) { return x + y }
        var e = [1, 2, 3, 4, { a: 2, f: 4, g: 7 }]
        var myMap = new Map();
       /* myMap.set(3, 5)
        myMap.set('eas',56)*/
        testFunction(a, 5,e,myMap)
    firstRun = false
        {
        eval(JSONToJavascript(SpyJSONToHarnessJSON(spyJSON)))
        }
    })

    mocha.it('one function leaf', function () {
        var spyJSON = {}
        var firstRun = true
        var testFunction = function (a1, d1,e1) {
            if (firstRun) {
                var mySpy = new RuntimeSpy('mySpy')
                mySpy.setTestFunctionCall('testFunction(a1,d1,e1)')
                eval(RuntimeSpy.getSpiesCode({ variables: [{ name: 'd1' }, {name:'e1'}], functions: [{ name: 'a1' }] }))
            }
            var b1 = a1(1, 5) + a1(5, -3) + d1 + e1[4].f// +myMap1.get('eas') 
            if (firstRun) {
                mySpy.addFinalResult(17)
                spyJSON = mySpy.getReadableHarness(spiesDB)
            }
            return b1
        }
        var a = function (x, y) { return x + y }
        var e = [1, 2, 3, 4, { a: 2, f: 4, g: 7 }]
       /* myMap.set(3, 5)
        myMap.set('eas',56)*/
        testFunction(a, 5,e)
    firstRun = false
        {
        eval(JSONToJavascript(SpyJSONToHarnessJSON(spyJSON)))
        }
    })
})

