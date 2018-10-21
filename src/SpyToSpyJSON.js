var spyToSpyJSON = function(spyData) {
    return {
        testedFunctionCall : spyData.testedFunctionCall,
    result : spyData.result,
    variables : getReadableHarnessVariables(spyData.variableSpies),
    functions : getReadableHarnessFunctions(spyData.functionSpies)
    }
}

var getReadableHarnessFunctions=function(functions) {
    var returnedArray = []
    functions.forEach(functionSpied=> {
        let functionJSON = { name: functionSpied.getName(), traffic: [] }
        let trafficData = functionSpied.getTrafficData()
        trafficData.input.forEach((input, index) => {
            functionJSON.traffic.push({callNumber:index ,arguments:input.slice(), returnValue:trafficData.output[index]})
        })
        returnedArray.push(functionJSON)
    })
    return returnedArray;
}

var getReadableHarnessVariables=function(variables) {
    var returnedArray = []
    variables.forEach(variable => {
        let variableJSON = { name: variable.getName(), values: [] }
        variable.variableValueLiterals.forEach((value, key) => {
            variableJSON.values.push({ timing: key, value: value })
        })
        returnedArray.push(variableJSON)
    })
    return returnedArray;
}


module.exports = spyToSpyJSON