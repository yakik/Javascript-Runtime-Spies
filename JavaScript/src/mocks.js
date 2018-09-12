var chai = require('chai')
var expect = chai.expect
var toLiteral = require('./toLiteral').toLiteral

var getMockTextForFunction = function (functionName, mockDataSourceVariable) {
	var theString = 'var ' + functionName + ' = function(){\n' +
		'checkMockDataReadiness(\'' + functionName + '\','+mockDataSourceVariable+')\n' +
		'mockDataSource=assertInput(\'' + functionName + '\',arguments,'+mockDataSourceVariable+')\n' +
        'var output=getOutput(\'' + functionName + '\',' + mockDataSourceVariable + ')\n' +
        'mockDataSource = output.mockDataSource\n' +
		'return output.output\n' +
		'}'
	return theString
}

var checkMockDataReadiness = function (functionName,mockDataSource) {
    if (mockDataSource[functionName].inputIndex == undefined) 
        mockDataSource[functionName].inputIndex = 0
        if (mockDataSource[functionName].outputIndex==undefined) 
		mockDataSource[functionName].outputIndex=0
	return mockDataSource
}

var assertInput = function (functionName, callArguments,mockDataSource) {
    expect(toLiteral(mockDataSource[functionName].input[mockDataSource[functionName].inputIndex])).
        equals(toLiteral(Array.from(callArguments)))
    mockDataSource[functionName].inputIndex++
    return mockDataSource
 }
var getOutput = function (functionName,mockDataSource) {
	var output = mockDataSource[functionName].output[mockDataSource[functionName].outputIndex]
    mockDataSource[functionName].outputIndex++
    return { mockDataSource: mockDataSource, output: output }
}
 
module.exports.getMockTextForFunction = getMockTextForFunction
module.exports.checkMockDataReadiness = checkMockDataReadiness
module.exports.assertInput = assertInput
module.exports.getOutput = getOutput