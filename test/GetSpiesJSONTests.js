var getSpiesJSON = require('../src/GetSpiesJSON')
var JSONToJavascript = require('../src/JSONToJavascript')
var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect

mocha.describe('Spy Tests', function () {

    mocha.it('function', function () {
        var SpyJSON = [{ variableDefinition: { name: 'functionSpiesDB', value: {} } },
        {
            block: [
                { copyFunctionToTemporaryVariable: { functionName: 'a' } },
                {
                    functionAssignment: {
                        name: 'a',
                        content: [{ callSpiedFunctionAndStoreResult: { returnVariable: 'output' } },
                        { reportSpiedFunctionCallingArgumentsAndResult: { functionName: 'a', returnVariable: 'output', spiesDB:'functionSpiesDB' } },
                        { returnOutput: { returnVariable: 'output' } }]
                    }
                }
            ]
        }
        ]
        expect(getSpiesJSON({ functions: [{ name: 'a' }] })).to.deep.equal(SpyJSON)
        var expectedJavascript ='var functionSpiesDB = {}\n' +
        '{\n' +
        'let __tempFunction = a\n' +
        'a = function(){\n' +
        'var output = __tempFunction.apply(null, Array.from(arguments))\n' +
        'functionSpiesDB = RuntimeSpy.getFunctionSpiesDBAfterThisCall(a, arguments, output, functionSpiesDB)\n' +
        'return output\n' +
        '}\n' +
        '}\n'
        expect(JSONToJavascript(getSpiesJSON({ functions: [{ name: 'a' }] }))).equals(expectedJavascript)
    })
})

