var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode())
    var VariableLiteral = require('./VariableLiteral')
    class FunctionArgumentSpy {
        constructor(variableName, variableValue,runtimeSpyName) {
            //methodParameterIndex is undefined if this is not a parameter for the intial call
            this.variableName = variableName
            this.variableValueLiterals = new Map()
            this.runtimeSpyName = runtimeSpyName
            this.variableValue = variableValue
        }
    
    
        getMockText() {
           
            return this.variableValue
        }
    
        getLiteral(name) {
            var returnText = VariableLiteral.getVariableLiteral(this.variableValueLiterals).getLiteralAndCyclicDefinition(name)
             return returnText 
        }
    
        getVariableName() {
            return this.variableName
        }
    
    }


if (isNode())
    module.exports = FunctionArgumentSpy