var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode())
    var VariableLiteral = require('./VariableLiteral')
class VariableSpy {
    constructor(variableName, variable) {
        this.variableName = variableName
        this.trafficData = { input: [], output: [] }
        if (variable != undefined)
            this.variable = variable
      /*  else
            this.variable = eval(this.variableName)*/
    }


    getMockText() {
        var returnString = 'var ' + this.variableName + ' = ' +
            VariableLiteral.getVariableLiteral(this.variable).getLiteral() + '\n'

        VariableLiteral.getVariableLiteral(this.variable).getCircularDefinitions().forEach(definition => {
            returnString += definition.getCircularDefinition(this.variableName) + '\n'

        })

        return returnString


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