var getSpiesCode = function(spyData) {
    return {
        testedFunctionCall : spyData.testedFunctionCall,
    result : spyData.result,
    variables : getReadableHarnessVariables(spyData.variableSpies),
    functions : getReadableHarnessFunctions(spyData.functionSpies)
    }
}




module.exports = getSpiesCode