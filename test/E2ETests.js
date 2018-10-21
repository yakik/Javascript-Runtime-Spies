var RuntimeSpy = require('../src/RuntimeSpy')
var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect
var JSONToJavascript = require('../src/JSONToJavascript')
var SpyJSONToHarnessJSON = require('../src/SpyJSONToHarnessJSON')

mocha.describe('E2E Tests', function () {

   
    mocha.it('one function', function () {
        var spyJSON = {}
        var testFunction = function (a) {
            var mySpy = new RuntimeSpy('mySpy')
            mySpy.setTestFunctionCall('testFunction(a)')
            eval(mySpy.addSpies({ functions: [ {name: 'a'} ] }).getCodeToEvalToSpyOnVariables())
            var b = a(1, 5) + a(5, -3)
            mySpy.addFinalResult(b)
            spyJSON = mySpy.getReadableHarness()
            return b
        }
        var a = function(x,y){return x+y}
        testFunction(a)
        {
        eval(JSONToJavascript(SpyJSONToHarnessJSON(spyJSON)))
        }
    })
})

