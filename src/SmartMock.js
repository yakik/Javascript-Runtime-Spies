var chai = require('chai')
var expect = chai.expect
var CodeDefinition = require('./Variable')

class SmartMock {
    constructor(smartSpy) {
        this.smartSpy = smartSpy
     }

     getFunctionCallString() {
		return this.smartSpy.getFunctionCallString()
	}
    getMockFunction(functionName, mockDataSourceVariable) {
       var upperThis = this
        return function () {
            upperThis.checkMockDataReadiness(functionName, mockDataSourceVariable)
            upperThis.mockDataSource = upperThis.assertInput(functionName, arguments, mockDataSourceVariable)
            var output = upperThis.getOutput(functionName, mockDataSourceVariable)
            upperThis.mockDataSource = output.mockDataSource
            return output.output
        }
    }

    checkMockDataReadiness(functionName, mockDataSource) {
        if (mockDataSource[functionName].inputIndex == undefined)
            mockDataSource[functionName].inputIndex = 0
        if (mockDataSource[functionName].outputIndex == undefined)
            mockDataSource[functionName].outputIndex = 0
        return mockDataSource
    }

    assertInput(functionName, callArguments, mockDataSource) {
        expect(CodeDefinition.getVariable(mockDataSource[functionName].
            input[mockDataSource[functionName].inputIndex]).getLiteral()).
            equals(CodeDefinition.getVariable(Array.from(callArguments)).getLiteral())
        mockDataSource[functionName].inputIndex++
        return mockDataSource
    }
    getOutput(functionName, mockDataSource) {
        var output = mockDataSource[functionName].output[mockDataSource[functionName].outputIndex]
        mockDataSource[functionName].outputIndex++
        return { mockDataSource: mockDataSource, output: output }
    }

}

module.exports = SmartMock
