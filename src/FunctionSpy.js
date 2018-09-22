var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode())
    var VariableLiteral = require('./VariableLiteral')
class FunctionSpy {
    constructor(functionName, runtimeSpyName) {
        this.functionName = functionName
        this.trafficData = { input: [], output: [] }
        this.runtimeSpyName = runtimeSpyName
        this.functionCallIndex = 0;
    }

    getFunctionName() {
        return this.functionName
    }
    
    getCallIndex()
    {
        return this.functionCallIndex
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
            '\'' + this.functionName + '\',arguments,' +
            'function (variable, variableName) {' +
            ' return VariableLiteral.getVariableLiteral(eval(variable)).getLiteralAndCyclicDefinition(variableName)},' +
             this.functionName + '__Original) \n' +
            '}\n'
        return returnCode
    }
    reportSpiedFunctionCallAndGetResult(callArguments, spyFunctionContextGetLiteral, originalSpiedFunction) {
        this.trafficData.input.push(Array.from(callArguments))
        var returnValue = originalSpiedFunction.apply(null,Array.from(callArguments))
        this.trafficData.output.push(returnValue)
        var toReturn = { returnValue: returnValue, callTag: this.functionName+'_'+this.functionCallIndex }
        this.functionCallIndex++
        return toReturn
    }

    getDataRepositoryText() {
        return VariableLiteral.getVariableLiteral(this.trafficData).getLiteral()
    }

}
if (isNode())
    module.exports = FunctionSpy


