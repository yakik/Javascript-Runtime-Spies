var getSpiesJSON = function (variablesToSpy) {
    var returnedJSON = []
    if (variablesToSpy.variables != undefined)
        variablesToSpy.variables.forEach(variable => {
            returnedJSON.push(getVariableSpyJSON(variable))
        })

    if (variablesToSpy.functions != undefined)
        returnedJSON.push({ variableDefinition: { name: 'functionSpiesDB', value: {} } })
        variablesToSpy.functions.forEach(functionSpy => {
            returnedJSON.push(getFunctionSpyJSON(functionSpy))
        })
    return returnedJSON
}

var getFunctionSpyJSON=function(functionSpy){
    return {
        block: [
            { copyFunctionToTemporaryVariable: { functionName: functionSpy.name } },
            {
                functionAssignment: {
                    name: functionSpy.name,
                    content: [{ callSpiedFunctionAndStoreResult: {returnVariable: 'output'} },
                        { reportSpiedFunctionCallingArgumentsAndResult: { functionName: functionSpy.name, returnVariable:'output' } },
                    {returnOutput:{returnVariable:'output'}}]
                }
            }
        ]
    }
}
module.exports = getSpiesJSON