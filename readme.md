## Work in Progress
### Runtime Spies - Javascript
A set of tools to harness javascript legacy code into a unit test.
The main idea is to run the system in an integrative environment after adding some code. The added code captures the data going to the unit and out of it and generates code that will harness the unit in a unit test environment.

### example (see explanation below)

```js
        var helper1 = function (x) { return 2 * x }
        var helper2 = function (x) { return 3 * x }
        var globalVar = 5
        var globalVar2 = { 1: 6, 2: 2 }
        var b = { 1: 1, 2: globalVar2 } //variable with circular reference
        globalVar2['3']=b

        var mySpy = new RuntimeSpy('mySpy')

        var testFunction = function (A) {
            mySpy.setStartFunctionCall(arguments, 'testFunction') //code you add to spy
            eval(mySpy.addVariableSpies('globalVar','globalVar2').getCodeToEvalToSpyOnVariables()) //code to spy on global variables
             eval(mySpy.addFunctionSpies('helper1', 'helper2').getCodeToEvalToSpyOnFunctions()) // code to spy on global functions
            var result = helper1(A) + helper2(A) +globalVar+globalVar2['3']['2']['1']
            return result
        }

        expect(testFunction(5)).equals(36) //we run the function with the spies

        /*change original functions, we don't need them anymore for our test*/
        helper1 = function (x) { return 2 }
        helper2 = function (x) { return 2 }
        globalVar = 8
        
        expect(eval(mySpy.getHarness())).equals(36) //mySpy.getHarness() provides the harness (a text to be put in the unit test)
```

### Example Explanation - Spies

We would like to write a unit test for testFunction 
testFunction is using two functions, helper1 and helper2.
We need to spy on two things:
* The parameters testFunction is called with
* Data going in and out through the global functions (helper1, helper2)
* value of global variables

To track the parameters, we add the line "callString...". In run time, getDefinitionAndCallingStringSpy() will return a string that eval()'ing it will run testFunction with the same parameters we run them now.

To track helper1 and helper 2 we turn them into spy functions using (getSpyFunction()). The returned function wraps the original functions). trafficCapture is a global variable we use to capture the data traffic going through these two functions.

Now we can run the function.

### Example Explanation - Mocks

Now we can run a unit test of our function.
First we 'eval('var mockDataSource...' to build our repository of data. In a real example we would probably write the data to the log in the previous stage (e.g. console.log(toLiteral(trafficCapture))  ) and in this stage we would copy the literal and use it to define mockDataSource.

Then we build two mocks for helper1 and helper2. The mocks take the data from trafficCapture, assert the parameters sent to them and return what the original functions returned earlier.

Finally, we can run the unit using eval(callString) (again, in a real environment we would have probably console.log'ed callString and now take the output and use it as a literal.

Good luck :-)

Contact me for any querie or comment: yaki.koren@gmail.com

### known issues
cyclic definitions in Maps are not supported
in case a variable is a class, the program will not identify it. You will need to adapt the harness.






#### copyright notice

Copyright (C) 2018 [Yaki Koren](http://github.com/Yakik)
 
Redistribution, modification and use of this source code is allowed. You do need to mention the copyright.
