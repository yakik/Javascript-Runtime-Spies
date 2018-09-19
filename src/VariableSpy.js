var VariableLiteral = require('./VariableLiteral')
class VariableSpy {
    constructor(variableName, variable) {
        this.variableName = variableName
        this.trafficData = { input: [], output: [] }
        if (variable != undefined)
            this.variable = variable
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

module.exports = VariableSpy