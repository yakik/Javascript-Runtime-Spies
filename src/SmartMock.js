var chai = require('chai')
var expect = chai.expect
var Variable = require('./Variable')

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
            // upperThis.mockDataSource = output.mockDataSource
            upperThis.callIndex++
            return output
        }
    }

    assertInput(callArguments, callIndex) {
        expect(Variable.getVariable(this.mockDataSource.input[callIndex]).getLiteral()).
            equals(Variable.getVariable(Array.from(callArguments)).getLiteral())
    }

    getOutput(callIndex) {
        return this.mockDataSource.output[callIndex]
    }

}

module.exports = SmartMock
