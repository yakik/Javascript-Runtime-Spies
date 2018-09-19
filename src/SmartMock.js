
var chai = require('chai')
var expect = chai.expect
var VariableLiteral = require('./VariableLiteral')

class SmartMock {
    constructor(functionName, mockDataSource) {
        this.functionName = functionName
        this.mockDataSource = mockDataSource
        this.callIndex = 0
    }

    static getSmartMock(functionName, mockDataSource) {
        var mock = new SmartMock(functionName, mockDataSource)
        return mock
    }

    getSmartMockFunction() {
        var upperThis = this
        return function () {
            upperThis.assertInput(arguments, upperThis.callIndex)
            var output = upperThis.getOutput(upperThis.callIndex)
            upperThis.callIndex++
            return output
        }
    }

    assertInput(callArguments, callIndex) {
        expect(VariableLiteral.getVariableLiteral(this.mockDataSource.input[callIndex]).getLiteral()).
            equals(VariableLiteral.getVariableLiteral(Array.from(callArguments)).getLiteral())
    }

    getOutput(callIndex) {
        return this.mockDataSource.output[callIndex]
    }

}
var isNode = new Function("try {return this===global;}catch(e){return false;}");

if (isNode())
module.exports = SmartMock
