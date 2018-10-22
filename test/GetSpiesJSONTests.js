var getSpiesJSON = require('../src/GetSpiesJSON')
var JSONToJavascript = require('../src/JSONToJavascript')
var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect

mocha.describe('Spy Tests', function () {

    mocha.it('get function spies', function () {
        var SpyJSON = [{ variableDefinition: { name: 'spiesDB', value: [] } },
        {
            block: [
                { copyFunctionToTemporaryVariable: { functionName: 'a' } },
                {
                    functionAssignment: {
                        name: 'a',
                        content: [{ callSpiedFunctionAndStoreResult: { returnVariable: 'output' } },
                        { reportSpiedFunctionCallingArgumentsAndResult: { functionName: 'a', returnVariable: 'output', spiesDB: 'spiesDB' } },
                        { returnOutput: { returnVariable: 'output' } }]
                    }
                }
            ]
        }
        ]
        expect(getSpiesJSON({ functions: [{ name: 'a' }] })).to.deep.equal(SpyJSON)
        var expectedJavascript = 'var spiesDB = []\n' +
            '{\n' +
            'let __tempFunction = a\n' +
            'a = function(){\n' +
            'var output = __tempFunction.apply(null, Array.from(arguments))\n' +
            'spiesDB = RuntimeSpy.getSpiesDBAfterThisSpiedFunctionCall(\'a\', arguments, output, spiesDB)\n' +
            'return output\n' +
            '}\n' +
            '}\n'
        expect(JSONToJavascript(getSpiesJSON({ functions: [{ name: 'a' }] }))).equals(expectedJavascript)
    })

    mocha.it('get variable spies', function () {
        var SpyJSON = [{ variableDefinition: { name: 'spiesDB', value: [] } }, { reportSpiedVariableValue: { name: '\'b\'', tag: '\'Initial\'', value: 'b', spiesDB: 'spiesDB' } },
        { reportSpiedVariableValue: { name: '\'c\'', tag: '\'Initial\'', value: 'c', spiesDB: 'spiesDB' } }]

        expect(getSpiesJSON({ variables: [{ name: 'b' }, { name: 'c' }] })).to.deep.equal(SpyJSON)
        var expectedJavascript = 'var spiesDB = []\n' +
            'spiesDB = RuntimeSpy.getSpiesDBAfterVariableUpdate(\'b\', \'Initial\', b, spiesDB)\n' +
            'spiesDB = RuntimeSpy.getSpiesDBAfterVariableUpdate(\'c\', \'Initial\', c, spiesDB)\n' 
           
        expect(JSONToJavascript(getSpiesJSON({ variables: [{ name: 'b' }, { name: 'c' }] }))).equals(expectedJavascript)
    })
})

