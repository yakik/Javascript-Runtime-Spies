var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode())
    var VariableLiteral = require('./VariableLiteral')
class VariableSpy {
    constructor(variableName, variable) {
        this.variableName = variableName
        this.trafficData = { input: [], output: [] }
        if (variable != undefined)
            this.variable = variable
    }


    getMockText() {
        return VariableLiteral.getVariableLiteral(this.variable).getLiteralAndCyclicDefinition(this.variableName)

    }

    getVariableName() {
        return this.variableName
    }

    setVariable(variable) {
        this.variable = variable
    }


}
if (isNode())
    module.exports = VariableSpy