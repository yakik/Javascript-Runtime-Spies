var Variable = require('./Variable')
class VariableSpy {
	constructor(variableName,variable) {
        this.variableName = variableName
        this.trafficData = { input: [], output: [] }
        if (variable != undefined)
            this.variable = variable
    }
    

    getMockText() {
        return 'var ' + this.variableName +' = ' + Variable.getVariable(this.variable).getLiteral()+'\n'
        
    }

    getVariableName() {
        return this.variableName
    }

    setVariable(variable) {
        this.variable = variable
    }


}

module.exports = VariableSpy