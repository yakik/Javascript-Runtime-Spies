## This is still work in progress, undergoing refactoring and redesign

### Runtime Spies - Javascript
A set of tools to harness javascript legacy code into a unit test.
The main idea is to run the system in an integrative environment after adding some code. The added code captures the data going to the unit and out of it and generates code that will harness the unit in a unit test environment.

### example (see explanation below)

```js
        var helper1 = function (x) { return 2 * x }
        var helper2 = function (x) { return 3 * x }
        
        var callString = '' //string to be used by one spy

        var testFunction = function (A) {
            callString = getDefinitionAndCallingStringSpy(arguments, 'testFunction') //spy
            return helper1(A) + helper2(A)
        }
        
        var trafficCapture = {} //captures data from the spies

        helper1 = getSpyFunction(this, 'helper1', helper1, trafficCapture) //creating wrapper functions (spies) to track ingoing
        helper2 = getSpyFunction(this, 'helper2', helper2, trafficCapture) // and out going data

        expect(testFunction(5)).equals(25) //running the function after spies were created

        /*change original functions, we don't need them anymore for our test. We do this to make sure the spies work...*/
        helper1 = function (x) { return 2 }
        helper2 = function (x) { return 2 }

        /*mocking */
        eval('var mockDataSource = ' + toLiteral(trafficCapture)) //creating the data, using the output of the previous run
        helper1 = getMockFunction('helper1', mockDataSource)
        helper2 = getMockFunction('helper2', mockDataSource)
        expect(eval(callString)).equals(25)

```

### Example Explanation - Spies

We would like to write a unit test for testFunction (the original function does not include the statement starting with "callString...").
testFunction is using two functions, helper1 and helper2.
We need to spy on two things:
* The parameters testFunction is called with
* Data going in and out through the global functions (helper1, helper2)

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

#### APIs
**toLiteral(variable, array of variables)** (@toLiteral.js): returns the literal string of the variable. In case it detects a circular reference it writes CIRCULAR. It also indicates whether it stumbled upon a FUNCTION, NULL or UNDEFINED.
The parameter "array of variables" is optional. It is used to detect circular reference (it should hold variables that were already analyzed for the top most variable.

**getDefinitionAndCallingStringSpy(callingFunctionArguments, functionName, paramString)** (@spies.js): returns a string that defines and initializes the variables to be used when calling functionName. Initialization is done according to callingFunctionArguments (an array). ParamString is a comma separated string of parameter names, it is optional. If it is sent, the variables names will be according to this, otherwise the variables will get default names. The string should be eval()'ed in the unit test.

**getSpyFunction (originalContext,functionName, originalFunction, trafficCaptureVariable)** (@spies.js): returns a function that wraps originalFunction and logs the arguments sent and the output returned using trafficCaptureVariable. originalContext should be the "this" of the original context of the function (probably the "this" wrapping the unit tested functioins.

**getMockFunction(functionName, mockDataSourceVariable)** (@mocks.js): returns a function to be used at the unit test. The function asserts the input sent against what's logged at mockDataSourceVariable (will usually be taken from trafficCaptureVariable used at the spy function) and returns the return values indicated there.




#### copyright notice

Copyright (C) 2018 [Yaki Koren](http://github.com/Yakik)
 
Redistribution, modification and use of this source code is allowed. You do need to mention the copyright.
