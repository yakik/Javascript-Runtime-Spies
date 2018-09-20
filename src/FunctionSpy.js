var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode())
    var VariableLiteral = require('./VariableLiteral')
class FunctionSpy {
    constructor(functionName, runtimeSpyName) {
        this.functionName = functionName
        this.trafficData = { input: [], output: [] }
        this.runtimeSpyName = runtimeSpyName
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

    getCodeForSpy() {
        var returnCode = 'var ' + this.functionName + '__Original = ' + this.functionName + '\n'
        returnCode += this.functionName + ' = function(){\n' +
            'return ' + this.runtimeSpyName + '.reportSpiedFunctionCallAndGetResult(' +
           '\''+ this.functionName +'\',arguments,null,' + this.functionName + '__Original)\n' +
            '}\n'
        return returnCode
    }
    reportSpiedFunctionCallAndGetResult(callArguments, spyFunctionContextGetLiteral, originalSpiedFunction) {
        this.trafficData.input.push(Array.from(callArguments))
        var returnValue = originalSpiedFunction.apply(null,Array.from(callArguments))
        this.trafficData.output.push(returnValue)
        return returnValue
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