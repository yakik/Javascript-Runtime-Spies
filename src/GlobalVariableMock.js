var isNode = new Function("try {return this===global;}catch(e){return false;}");
if (isNode())
    var VariableLiteral = require('./VariableLiteral')
   

class GlobalVariableMock {
    constructor(variableName,harnessName, dataMap) {
        this.variableName = variableName
        this.harnessName = harnessName
        this.dataMap = dataMap
    }


}
if (isNode())
    module.exports = GlobalVariableMock