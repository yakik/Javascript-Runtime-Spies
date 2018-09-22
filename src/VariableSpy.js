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


    trackValueChanges(callTag, spyFunctionContextGetLiteral) {
        if (this.variableNameForValue == '') return
        var newValue = spyFunctionContextGetLiteral(this.variableNameForValue, this.variableName)
        newValue = newValue.replace(/\'/g,'\\\'')

        if (this.variableValueLiterals.size > 0) {
            var currentValue = Array.from(this.variableValueLiterals)[this.variableValueLiterals.size - 1][1]
            if (currentValue != spyFunctionContextGetLiteral(this.variableNameForValue, this.variableName))
                this.setNewVariableLiteral(callTag, newValue)
        }
        else {
            this.setNewVariableLiteral(callTag, )
        }
            
    }

    getMockText() {
        var mockText = this.getLiteral(this.variableName + '_DB') + '\n'
        mockText +=  this.variableValueLiterals.get('Initial') + '\n'
        return mockText
    }

    getLiteral(name) {
        var returnText = VariableLiteral.getVariableLiteral(this.variableValueLiterals).getLiteralAndCyclicDefinition(name)
         return returnText 
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