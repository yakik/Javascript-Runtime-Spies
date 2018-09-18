var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect

var RuntimeSpy = require('../src/RuntimeSpy')
var SmartMock = require('../src/SmartMock').SmartMock

var Variable = require('../src/Variable')
var FileWriter = require('../src/Writers').FileWriter



getMockFunction = SmartMock.getMockFunction
checkMockDataReadiness = SmartMock.checkMockDataReadiness
assertInput = SmartMock.assertInput
getOutput = SmartMock.getOutput


var testedFunction = function (a, b, c) {

}

mocha.describe('Spies and Mocks', function () {

    
    var globalFunction1 = function (x) { return x * 2 }
    var globalFunction2 = function (x) {
        globalVariable1['1'] = x+5
        return x * 2
    }
    var globalVariable1 = { 1: 1, 2: 2, 3: { a: 1, b: 2 } }
    var globalVariable2 = { 1: 1, 2: 2, 3: { a: 1, b: 2 } }
    globalVariable2['4'] = globalVariable2

    var testFunction = function (param1, param2, param3) {
        //Spy setup
        mySpy = new RuntimeSpy()
        mySpy.setInitialMethodCall('tetFunction', arguments, 'param1, param2, param3')
        mySpy.addGlobalVariablesToTrack(globalVariable1['1'])
        mySpy.addGlobalFunctionsToTrack(globalFunction2)
        mySpy.startTracking()
        //end Spy setup
        globalFunction2(param1)
        var toReturn = globalVariable1['1']+param2.getPI()+param3['1']['0']['2']
        //set assertion and finish
        mySpy.setEndValue(toReturn)
        mySpy.endTracking()
        var myMock = new SmartMock(mySpy)
        var myWriter = new FileWriter()
        myWriter.setFileName('test001')
        myMock.createHarness(myWriter.write())
        //*******/
        return toReturn
    }

    

    mocha.it('End to End', function () {
        var p2 = { getPI: function () { return 3.1415927 } }
        p3 = { 1: {} ,2:2}
        p3['1']['0'] = p3
testFunction(1,p2,p3)

        
    })


})