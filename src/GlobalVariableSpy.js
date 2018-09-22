var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode())
    var VariableLiteral = require('./VariableLiteral')
   

class GlobalVariableSpy {
    constructor(variableName,runtimeSpyName) {
        this.variableName = variableName
        this.variableValueLiterals = new Map()
        this.runtimeSpyName = runtimeSpyName
    }


    trackValueChanges(callTag, spyFunctionContextGetLiteral) {
        var newValue = spyFunctionContextGetLiteral(this.variableName, this.variableName)
        newValue = newValue.replace(/\'/g,'\\\'')

        if (this.variableValueLiterals.size > 0) {
            var currentValue = Array.from(this.variableValueLiterals)[this.variableValueLiterals.size - 1][1]
            if (currentValue != spyFunctionContextGetLiteral(this.variableName, this.variableName))
                this.setNewVariableLiteral(callTag, newValue)
        }
        else {
            this.setNewVariableLiteral(callTag,newValue )
        }
            
    }

    getMockText() {
        var mockText =  VariableLiteral.getVariableLiteral(this.variableValueLiterals).getLiteralAndCyclicDefinition(this.variableName + '_DB') + '\n'
      //  mockText +=  this.variableValueLiterals.get('Initial') + '\n'
        return mockText
    }

    getVariableName() {
        return this.variableName
    }

    setNewVariableLiteral(tag, literal) {
        this.variableValueLiterals.set(tag, literal)
    }

}
if (isNode())
    module.exports = GlobalVariableSpy