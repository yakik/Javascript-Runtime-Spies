var getSpiesJSON = function (variablesToSpy) {
    var returnedJSON = []
    returnedJSON.push({
        variableDefinition: {
            name: 'spiesDB', value: {
                variables: [], functions: []
            }
        }
    })
    if (variablesToSpy.variables != undefined)
        variablesToSpy.variables.forEach(variable => {
            returnedJSON.push(getVariableSpyJSON(variable))
        })

    if (variablesToSpy.functions != undefined)
        variablesToSpy.functions.forEach(functionSpy => {
            returnedJSON.push(getFunctionSpyJSON(functionSpy))
        })
    return returnedJSON
}

var getVariableSpyJSON = function (variableSpy) {
    return {reportSpiedVariableValue: {name: '\''+variableSpy.name+'\'', tag: '\'Initial\'', value:variableSpy.name,spiesDB:'spiesDB'}}
}

var getFunctionSpyJSON = function (functionSpy) {
    return {
        block: [
            { copyFunctionToTemporaryVariable: { functionName: functionSpy.name } },
            {
                functionAssignment: {
                    name: functionSpy.name,
                    content: [{ callSpiedFunctionAndStoreResult: {returnVariable: 'output'} },
                        { reportSpiedFunctionCallingArgumentsAndResult: { functionName: functionSpy.name, returnVariable:'output', spiesDB: 'spiesDB' } },
                    {returnOutput:{returnVariable:'output'}}]
                }
            }
        ]
    }
}
module.exports = getSpiesJSON