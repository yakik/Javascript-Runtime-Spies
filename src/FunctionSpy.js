var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode())
    var VariableLiteral = require('./VariableLiteral')
class FunctionSpy {
    constructor(functionName) {
        this.functionName = functionName
        this.trafficData = { input: [], output: [] }
    }

    getFunctionName() {
        return this.functionName
    }

    getSpyFunction(originalContext, originalFunction) {
        var runtimeSpyThis = this
        return function () {
            runtimeSpyThis.trafficData.input.push(Array.from(arguments))
            var returnValue = originalFunction.apply(originalContext, arguments)
            runtimeSpyThis.trafficData.output.push(returnValue)
            return returnValue
        }
    }

    getDataRepositoryText() {
        return VariableLiteral.getVariableLiteral(this.trafficData).getLiteral()
    }

    getMockText() {
        return this.functionName + '= SmartMock.getSmartMock(\'' + this.functionName +
            '\',mockRepositoryData[\'' + this.functionName + '\']).getSmartMockFunction()\n'

    }


}
if (isNode())
module.exports = FunctionSpy