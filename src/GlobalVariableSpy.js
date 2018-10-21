class GlobalVariableSpy {
    constructor(name, runtimeSpyName, runtimeSpy) {
        this.name = name
        this.runtimeSpyName = runtimeSpyName
        this.runtimeSpy = runtimeSpy
    }

    getName() {
        return this.name
    }

    getSpyType() {
        return this.spyType
    }

    static getNewFunctionSpy(name,runtimeSpyName, runtimeSpy) {
        var newFunctionSpy = new FunctionSpy(name,runtimeSpyName, runtimeSpy)
        return newFunctionSpy
    }
    static getNewSpy(name, runtimeSpyName, runtimeSpy, theVariable) {
            var newNonFunctionVariable = new NonFunctionSpy(name, runtimeSpyName, runtimeSpy)
            newNonFunctionVariable.setNewVariableLiteral('Initial', theVariable)
            return newNonFunctionVariable
    }
}

class NonFunctionSpy extends GlobalVariableSpy {
    constructor(name, runtimeSpyName, runtimeSpy) {
        super(name, runtimeSpyName, runtimeSpy)
        this.variableValueLiterals = new Map()
        this.spyType = 'nonFunction'
    }

    trackValueChanges(callTag, spyFunctionContextGetLiteral) {
        var newValue = spyFunctionContextGetLiteral(this.name)

        if (this.variableValueLiterals.size > 0) {
            var currentValue = Array.from(this.variableValueLiterals)[this.variableValueLiterals.size - 1][1]
            if (currentValue != spyFunctionContextGetLiteral(this.name, this.name))
                this.setNewVariableLiteral(callTag, newValue)
        }
        else {
            this.setNewVariableLiteral(callTag, newValue)
        }
    }

    setNewVariableLiteral(tag, literal) {
        this.variableValueLiterals.set(tag, literal)
    }

}

class FunctionSpy extends GlobalVariableSpy {
    constructor(name,runtimeSpyName, runtimeSpy) {
        super(name, runtimeSpyName, runtimeSpy)
        this.trafficData = { input: [], output: [] }
        this.functionCallIndex = 0;
        this.spyType = 'function'
    }


    getCallIndex() {
        return this.functionCallIndex
    }

    getTrafficData()
    { return this.trafficData }

    getCodeForSpy() {
        var returnCode = '{let __tempFunction = ' + this.name + '\n'
        returnCode += this.name + ' = function(){\n' +
            'return ' + this.runtimeSpyName + '.reportSpiedFunctionCallAndGetResult(' +
            '\'' + this.name.replace(/\'/g, '\\\'') + '\',arguments,' +
            'function (variable) {' +
            ' return ' +this.runtimeSpyName + '.getLiteral(eval(variable))},' +
            '__tempFunction) \n' +
            '}}\n'
        return returnCode
    }
    reportSpiedFunctionCallAndGetResult(callArguments, spyFunctionContextGetLiteral, originalSpiedFunction) {
        var callTag = this.name + '_' + this.functionCallIndex
        this.trafficData.input.push(Array.from(callArguments))
        var returnValue = originalSpiedFunction.apply(null, Array.from(callArguments))
        if (returnValue != undefined) {
            this.trafficData.output.push(returnValue)
        }
        else
            this.trafficData.output.push('NOVALUERETURNED')
        var toReturn = { returnValue: returnValue, callTag: callTag }
        this.functionCallIndex++
        return toReturn
    }


}

    module.exports = GlobalVariableSpy

