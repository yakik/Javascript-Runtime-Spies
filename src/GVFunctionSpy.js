var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode()) {
    var VariableLiteral = require('./VariableLiteral')
    var GlobalVariableSpy = require('./GVGlobalVariableSpy')
}
class GVFunctionSpy extends GlobalVariableSpy{
    constructor(name, runtimeSpyName, runtimeSpy) {
        super(name, runtimeSpyName, runtimeSpy)
        this.trafficData = { input: [], output: [] }
        this.functionCallIndex = 0;
    }

    getName() {
        return this.name
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
        var returnCode =  this.name + '__Original = ' + this.name + '\n'
        returnCode += this.name + ' = function(){\n' +
            'return ' + this.runtimeSpyName + '.reportSpiedFunctionCallAndGetResult(' +
            '\'' + this.name + '\',arguments,' +
            'function (variable, variableName) {' +
            ' return VariableLiteral.getVariableLiteral(eval(variable)).getLiteralAndCyclicDefinition(variableName)},' +
             this.name + '__Original) \n' +
            '}\n'
        return returnCode
    }
    reportSpiedFunctionCallAndGetResult(callArguments, spyFunctionContextGetLiteral, originalSpiedFunction) {
        this.trafficData.input.push(Array.from(callArguments))
        var returnValue = originalSpiedFunction.apply(null,Array.from(callArguments))
        this.trafficData.output.push(returnValue)
        var toReturn = { returnValue: returnValue, callTag: this.name+'_'+this.functionCallIndex }
        this.functionCallIndex++
        return toReturn
    }

    getDataRepositoryText() {
        return VariableLiteral.getVariableLiteral(this.trafficData).getLiteral()
    }

}
if (isNode())
    module.exports = GVFunctionSpy


