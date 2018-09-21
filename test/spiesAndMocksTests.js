var RuntimeSpy = require('../src/RuntimeSpy')
var SmartMock = require('../src/SmartMock')
var VariableLiteral = require('../src/VariableLiteral')
var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect




mocha.describe('Spies and Mocks', function () {

    mocha.it('should return definitions/calling statements (no param names)', function () {
        var a = [1, 2, 3]
        var b = { q: 1, w: a }
        var mySpy = new RuntimeSpy('mySpy')
        var testFunction = function () {
            mySpy.setStartFunctionCall(arguments, 'testFunction')
            eval(mySpy.getCodeToEvalToSpyOnVariables())
            return a[0] + b.q
        }
        testFunction(a, b, 2)
       // console.log(mySpy.getHarness())
        expect(eval(mySpy.getHarness())).equals(2)
    })

    mocha.it('should return definitions/calling statements (with param names)', function () {
        var a = [1, 2, 3]
        var b = { q: 1, w: a }
        var harness = ''
        var testFunction = function (A, B, C) {
            var mySpy = new RuntimeSpy('mySpy')
            mySpy.setStartFunctionCall(arguments, 'testFunction', 'A,B ,C')
            eval(mySpy.getCodeToEvalToSpyOnVariables())
            harness = mySpy.getHarness()
            return a[0] + b.q
        }
        testFunction(a, b, 2)
        console.log(harness)
        expect(eval(harness)).equals(2)
    })



    mocha.it('Mocks', function () {
        
        var helper1 = function (x) {
            
            globalVar = 2 * x
            return 2 * x
        }
        var helper2 = function (x) { return 3 * x }
        var globalVar = 5
        var globalVar2 = { 1: 6, 2: 2 }
        var b = { 1: 1, 2: globalVar2 }
        globalVar2['3']=b

var harness = ''        

        var testFunction = function (A) {
            
            var mySpy = new RuntimeSpy('mySpy')
            mySpy.setStartFunctionCall(arguments, 'testFunction')
            eval(mySpy.addVariableSpies('globalVar', 'globalVar2').getCodeToEvalToSpyOnVariables())
            var functiontext = mySpy.addFunctionSpies('helper1', 'helper2').getCodeToEvalToSpyOnFunctions()
            eval(functiontext)

            helper1(21)
            var result = helper1(A) + helper2(A) + globalVar + globalVar2['3']['2']['1']
            harness = mySpy.getHarness()
            return result
        }

       

        expect(testFunction(5)).equals(41)

        /*change original functions, we don't need them anymore for our test*/
        helper1 = function (x) { return 2 }
        helper2 = function (x) { return 2 }
        globalVar = 8
        
      //  console.log(harness)
        //expect(eval(harness)).equals(36)
    })

    mocha.it('Mocks -> test output of Mocks', function () {
        
       
        var testFunction = function (A) {
            
           
            helper1(21)
            var result = helper1(A) + helper2(A) + globalVar + globalVar2['3']['2']['1']
            return result
        }
        var mockRepositoryData = {}
        mockRepositoryData['helper1'] = {input:[[21],[5]],output:[42,10]}
        mockRepositoryData['helper2'] = {input:[[5]],output:[15]}
        helper1= SmartMock.getSmartMock('helper1',mockRepositoryData['helper1']).getSmartMockFunction()
        
        helper2= SmartMock.getSmartMock('helper2',mockRepositoryData['helper2']).getSmartMockFunction()
        
        var testFunctionParam0_DB = new Map([['Initial','var testFunctionParam0 = 5']])
        var testFunctionParam0 = 5
        
        var globalVar_DB = new Map([['Initial','var globalVar = 5'],['helper1_0','var globalVar = 42'],['helper1_1','var globalVar = 10']])
        var globalVar = 5
        
        var globalVar2_DB = new Map([['Initial','var globalVar2 = {1:6,2:2,3:{1:1}};globalVar2[\'3\'][\'2\']=globalVar2']])
        var globalVar2 = {1:6,2:2,3:{1:1}};globalVar2['3']['2']=globalVar2
        
        testFunction(testFunctionParam0)

    })

})



