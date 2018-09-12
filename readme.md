### Runtime Spies - Javascript
A set of tools to harness javascript legacy code into a unit test.

#### Overview
This set of tools (runtime spies) can help when trying to harness legacy code into a unit test. The main problem here is how to capture all the data coming into the unit and going out of it. See the example below to understand the tools.

### example

```js
        var helper1 = function (x) { return 2 * x }
        var helper2 = function (x) { return 3 * x }
        
        var callString = ''

        var testFunction = function (A) {
            callString = getDefinitionAndCallingStringSpy(arguments, 'testFunction')
            return helper1(A) + helper2(A)
        }
        expect(testFunction(5)).equals(25)
        /* Spy */
        var trafficCapture = {}

        helper1 = getSpyFunction(this, 'helper1', helper1, trafficCapture)
        helper2 = getSpyFunction(this, 'helper2', helper2, trafficCapture)

        expect(testFunction(5)).equals(25)

        /*change original functions, we don't need them anymore for our test*/
        helper1 = function (x) { return 2 }
        helper2 = function (x) { return 2 }

        /*mock*/
        eval('var mockDataSource = ' + toLiteral(trafficCapture))
        helper1 = getMockFunction('helper1', mockDataSource)
        helper2 = getMockFunction('helper2', mockDataSource)
        expect(eval(callString)).equals(25)

```

### Title


### copyright notice

Copyright (C) 2018 [Yaki Koren](http://github.com/Yakik)
 
Redistribution, modification and use of this source code is allowed. You do need to mention the copyright.
