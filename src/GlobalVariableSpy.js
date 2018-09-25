var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode())
    var VariableLiteral = require('./VariableLiteral')
   

class GlobalVariableSpy {
    constructor(name, runtimeSpyName, runtimeSpy) {
        this.name = name
        this.runtimeSpyName = runtimeSpyName
        this.runtimeSpy = runtimeSpy
    }

    getName() {
        return this.name
    }

    static getSpy(name, runtimeSpyName, runtimeSpy, type) {
        if (type == 'function')
            return new FunctionSpy(name, runtimeSpyName, runtimeSpy)
        else
            return new NonFunctionSpy(name, runtimeSpyName, runtimeSpy)
    }
}

class NonFunctionSpy extends GlobalVariableSpy{
    constructor(name,runtimeSpyName,runtimeSpy) {
        super(name,runtimeSpyName,runtimeSpy)
        this.variableValueLiterals = new Map()
    }

    trackValueChanges(callTag, spyFunctionContextGetLiteral) {
        var newValue = spyFunctionContextGetLiteral(this.name, this.name)
        
        if (this.variableValueLiterals.size > 0) {
            var currentValue = Array.from(this.variableValueLiterals)[this.variableValueLiterals.size - 1][1]
            if (currentValue != spyFunctionContextGetLiteral(this.name, this.name))
                this.setNewVariableLiteral(callTag, newValue)
        }
        else {
            this.setNewVariableLiteral(callTag,newValue )
        }
    }

    getMockText() {
        var mockText =  VariableLiteral.getVariableLiteral(this.variableValueLiterals).getLiteralAndCyclicDefinition(this.name + '_DB') + '\n'
        mockText +=  'var ' + this.name + '\n'
        return mockText
    }

    setNewVariableLiteral(tag, literal) {
        this.variableValueLiterals.set(tag, literal)
    }

}

class FunctionSpy extends GlobalVariableSpy{
    constructor(name, runtimeSpyName, runtimeSpy) {
        super(name, runtimeSpyName, runtimeSpy)
        this.trafficData = { input: [], output: [] }
        this.functionCallIndex = 0;
    }

    
    getCallIndex()
    {
        return this.functionCallIndex
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
    module.exports = GlobalVariableSpy
