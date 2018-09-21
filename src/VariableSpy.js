var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode())
    var VariableLiteral = require('./VariableLiteral')
class VariableSpy {
    constructor(variableName, variableNameForValue,runtimeSpyName) {
        //methodParameterIndex is undefined if this is not a parameter for the intial call
        this.variableName = variableName
        this.trafficData = { input: [], output: [] }
        this.variableValueLiterals = new Map()
        this.runtimeSpyName = runtimeSpyName
        this.variableNameForValue = variableNameForValue
    }

    getCodeToInitializeVariable() {
        var returnString = ''
            returnString += this.runtimeSpyName + '.trackSpiedVariablesValues(' +
            '\'Initial\',function (variableNameForValue,variableName) {' +
            ' return VariableLiteral.getVariableLiteral(eval(variableNameForValue)).getLiteralAndCyclicDefinition(variableName)}' +
       ' )\n'
        return returnString
    }

    trackValueChanges(callTag, spyFunctionContextGetLiteral) {
        if (this.variableNameForValue=='') return
        if (this.variableValueLiterals.size > 0) {
            var currentValue = Array.from(this.variableValueLiterals)[this.variableValueLiterals.size - 1]
            if (currentValue != spyFunctionContextGetLiteral(this.variableNameForValue, this.variableName))
                this.setNewVariableLiteral(callTag, spyFunctionContextGetLiteral(this.variableNameForValue, this.variableName))
        }
        else {
            this.setNewVariableLiteral(callTag, spyFunctionContextGetLiteral(this.variableNameForValue, this.variableName))
        }
            
    }


    getLiteral(tag) {
        return this.variableValueLiterals.get(tag)
    }

    getVariableName() {
        return this.variableName
    }

    setNewVariableLiteral(tag, literal) {
        this.variableValueLiterals.set(tag, literal)
    }

}
if (isNode())
    module.exports = VariableSpy