var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode()) {
	var GlobalVariableMock = require('./GlobalVariableMock')
}
class Harness {
    constructor(harnessName){
        this.harnessName = harnessName
        this.globalVariablesMocks = new Map()
    }
    
    addGlobalVariableMock(variableName, dataMap) {
        this.globalVariablesMocks.set(variableName,new GlobalVariableMock(variableName,this.harnessName,dataMap))
    }

    updateVariablesByTag(tag, evalCodeFunction) {
        this.globalVariablesMocks.forEach(variable =>{
            var definition = variable.getDefinitionByTag(tag)
            if (definition != undefined)
                evalCodeFunction(definition)
        })
	}
}

if (isNode())
	module.exports = Harness