var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect

var RuntimeSpy = require('../src/RuntimeSpy')
var SmartMock = require('../src/SmartMock')

var Variable = require('../src/Variable')
var Writers = require('../src/Writers')
captureInput = RuntimeSpy.captureFunctionInput
captureOutput = RuntimeSpy.captureFunctionOutput
argumentsToString = RuntimeSpy.argumentsToString
checkSpyDataReadiness = RuntimeSpy.SpyDataSetup
getSpyFunction = RuntimeSpy.getSpyFunction
getDefinitionAndCallingStringSpy = RuntimeSpy.getDefinitionAndCallingStringSpy


getMockFunction = SmartMock.getMockFunction
checkMockDataReadiness = SmartMock.checkMockDataReadiness
assertInput = SmartMock.assertInput
getOutput = SmartMock.getOutput

FileWriter = Writers.fileWriter

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
        mySpy = new Spy()
        mySpy.setInitialMethodCall('tetFunction', arguments, 'param1, param2, param3')
        mySpy.addGlobalVariablesToTrack(globalVariable['1'])
        mySpy.addGlobalFunctionsToTrack(globalFunction2)
        mySpy.startTracking()
        //end Spy setup
        globalFunction2(param1)
        var toReturn = globalVariable['1']+param2.getPI()+param3['1']['0']['2']
        //set assertion and finish
        mySpy.setEndValue(toReturn)
        mySpy.endTracking()
        var myMock = new Mock(mySpy)
        var myWriter = new FileWriter()
        myWriter.setFileName('test001')
        myMock.createHarness(MyWriter.write())
        //*******/
        return toReturn
    }

    

    mocha.it('End to End', function () {
//testFunction(1,2,3)

        
    })


})