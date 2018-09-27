### The Problem We're trying to solve
When working with Legacy code one of the main problems is we do not have tests. To start refactoring code we better have tests to let us do it with calm.
Whilte integration tests are good, unit tests are much better. Integration tests take a long time and a complicated environment (if that's not the case for you - use the integration tests). Unit tests are fast and do not need any special environment. When we code we run our unit tests every 2-3 minutes if not more, and it takes them under a second to complete.
Writing unit tests for legcy code isn't easy. One of the problems is that the code is usually entangled in many other pieces of code, which makes harnessing it inot a unit tests very difficult.
The problem we're trying to solve here is to help harnessing legacy code into a unit test.

### Runtime Spies - Javascript
The Runtime Spies are pieces of code you add to your code (on a side branch - this doesn't go into production) which capture traffic going into and out of the code you want to test (is it one function? A set of function? That's for you to decide).
After adding the code you run scenarios in the integration environenment. The Runtime spies capture the traffic and produce a harness for the unit test.

Then you should start refactoring.

## Main Features
- Capture the arguments sent into a function and producing code that will call your functioin with the same arguments
- Capture data going into and out of global functions and producing code for the harness that will imitate these functions
- Capture global variables data (also if they change due to global variables) and produce harness code to simulate them

### example (see explanation below)
This is taken from one unit test from the project. You need to require RuntimeSpy.js for it to work.
GLobal variables:
```js
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
```
The function we want to harness:
```js
var testFunction = function (A) {
            helper1(21)
            var a = globalVar2['4']['12'](3)
            var result = a+helper1(A) + helper2(A) + globalVar + globalVar2['3']['2']['1'] + globalVar2['4']['12'](4)
            
            return result
        }
```
We add our code to the function
```js
 
             var testFunction = function (A) {
            
            // We've added the following lines to generate the harness
            var mySpy = new RuntimeSpy('mySpy') //the main spy object
            mySpy.setStartFunctionCall(arguments, 'testFunction','A') //capturing the function's arguments (2nd paramtere is the function's name, third is the list of parameters
            eval(mySpy.addGlobalVariablesSpies({ globalVar: globalVar, globalVar2: globalVar2, helper1: helper1, helper2: helper2 }).getCodeToEvalToSpyOnVariables()) //spying on global variables
            //end of setup
           
            helper1(21)
            var a = globalVar2['4']['12'](3)
            var result = a+helper1(A) + helper2(A) + globalVar + globalVar2['3']['2']['1'] + globalVar2['4']['12'](4)

            mySpy.addFinalResult(result) //here we tell the spy what is the end result so it can later assert on it
            harness = mySpy.getHarness() //generating the harness

            return result
        }

```
Now we run the function with our code in it. And this is the harness the RuntimeSpy generates:
```js
       var myHarness = new Harness('myHarness')
var mockRepositoryData = {}
mockRepositoryData['globalVar2[\'4\'][\'12\']'] = {input:[[3],[4]],output:['__globalFunctionReturnVariable1','__globalFunctionReturnVariable4']}
mockRepositoryData['helper1'] = {input:[[21],[5]],output:['__globalFunctionReturnVariable0','__globalFunctionReturnVariable2']}
mockRepositoryData['helper2'] = {input:[[5]],output:['__globalFunctionReturnVariable3']}
myHarness.setMockRepositoryData(mockRepositoryData)
A_DB = new Map([['Initial','A = 5']])
var A

myHarness.addGlobalVariableMock('A',A_DB)
globalVar_DB = new Map([['Initial','globalVar = 5'],['helper1_0','globalVar = 42'],['helper1_1','globalVar = 10']])
var globalVar

myHarness.addGlobalVariableMock('globalVar',globalVar_DB)
globalVar2_DB = new Map([['Initial','globalVar2 = {1:6,2:2,3:{1:1},4:{1:4,12:function(){}}};globalVar2[\'3\'][\'2\']=globalVar2']])
var globalVar2

myHarness.addGlobalVariableMock('globalVar2',globalVar2_DB)
__globalFunctionReturnVariable0_DB = new Map([['Initial','__globalFunctionReturnVariable0 = 42']])
var __globalFunctionReturnVariable0

myHarness.addGlobalVariableMock('__globalFunctionReturnVariable0',__globalFunctionReturnVariable0_DB)
__globalFunctionReturnVariable1_DB = new Map([['Initial','__globalFunctionReturnVariable1 = 15']])
var __globalFunctionReturnVariable1

myHarness.addGlobalVariableMock('__globalFunctionReturnVariable1',__globalFunctionReturnVariable1_DB)
__globalFunctionReturnVariable2_DB = new Map([['Initial','__globalFunctionReturnVariable2 = 10']])
var __globalFunctionReturnVariable2

myHarness.addGlobalVariableMock('__globalFunctionReturnVariable2',__globalFunctionReturnVariable2_DB)
__globalFunctionReturnVariable3_DB = new Map([['Initial','__globalFunctionReturnVariable3 = 15']])
var __globalFunctionReturnVariable3

myHarness.addGlobalVariableMock('__globalFunctionReturnVariable3',__globalFunctionReturnVariable3_DB)
__globalFunctionReturnVariable4_DB = new Map([['Initial','__globalFunctionReturnVariable4 = 20']])
var __globalFunctionReturnVariable4

myHarness.addGlobalVariableMock('__globalFunctionReturnVariable4',__globalFunctionReturnVariable4_DB)
myHarness.updateVariablesByTag('Initial',function(codeToEval){eval(codeToEval)})
myHarness.addFunctionMock('globalVar2[\'4\'][\'12\']')
globalVar2['4']['12']= function(){
var returnValue =  myHarness.callFunctionSpy('globalVar2[\'4\'][\'12\']',arguments,function(codeToEval){eval(codeToEval)})
if (returnValue!='NOVALUERETURNED')return eval(returnValue)
}
myHarness.addFunctionMock('helper1')
helper1= function(){
var returnValue =  myHarness.callFunctionSpy('helper1',arguments,function(codeToEval){eval(codeToEval)})
if (returnValue!='NOVALUERETURNED')return eval(returnValue)
}
myHarness.addFunctionMock('helper2')
helper2= function(){
var returnValue =  myHarness.callFunctionSpy('helper2',arguments,function(codeToEval){eval(codeToEval)})
if (returnValue!='NOVALUERETURNED')return eval(returnValue)
}
expect(VariableLiteral.getVariableLiteral(testFunction(A)
).getLiteralAndCyclicDefinition('result')).equals('result = 76')
```

Contact me for any querie or comment: yaki.koren@gmail.com OR yaki@agilesparks.com

#### copyright notice

Copyright (C) 2018 [Yaki Koren](http://github.com/Yakik)
 
Redistribution, modification and use of this source code is allowed. You do need to mention the copyright.
This software is intended to be used in a test environment only.
