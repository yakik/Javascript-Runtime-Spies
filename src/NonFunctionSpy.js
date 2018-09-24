var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode()) {
    var VariableLiteral = require('./VariableLiteral')
    var GlobalVariableSpy = require('./GlobalVariableSpy')
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

    getVariableName() {
        return this.name
    }

    setNewVariableLiteral(tag, literal) {
        this.variableValueLiterals.set(tag, literal)
    }

}
if (isNode())
    module.exports = NonFunctionSpy