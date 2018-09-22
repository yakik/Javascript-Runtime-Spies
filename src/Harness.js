var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode()) {
    var GlobalVariableMock = require('./GlobalVariableMock')
    var FunctionMock = require('./FunctionMock')
}
const mockRepositoryDataName = 'mockRepositoryData'
class Harness {
    constructor(harnessName){
        this.harnessName = harnessName
        this.globalVariablesMocks = new Map()
        this.functionMocks = new Map()
    }

    setMockRepositoryData(mockRepositoryData) {
        this.mockRepositoryData = mockRepositoryData
    }
    
    addGlobalVariableMock(variableName, dataMap) {
        this.globalVariablesMocks.set(variableName,new GlobalVariableMock(variableName,this.harnessName,dataMap))
    }

    updateVariablesByTag(tag, evalCodeFunction) {
        this.globalVariablesMocks.forEach(variable =>{
            var definition = variable.getDefinitionByTag(tag)
            if (definition != undefined)
                evalCodeFunction(definition)
        })
    }

    addFunctionMock(functionName) {
        this.functionMocks.set(functionName,
            new FunctionMock(functionName, this.harnessName, this.mockRepositoryData[functionName]))
    }
    
    callFunctionSpy(functionName, callArguments,evalCodeFunction) {
        var functionMock = this.functionMocks.get(functionName)
        var output = functionMock.callFunction(callArguments)
        this.updateVariablesByTag(output.tag, evalCodeFunction)
        return output.output
    }
}

if (isNode())
	module.exports = Harness