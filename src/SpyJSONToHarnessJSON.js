
var spyJSONToHarnessJSON = function(spyJSON) {
    var harnessJSON = []
    spyJSON.variables.forEach(variable => {
        harnessJSON.push(getVariableHarness(variable))
    });
    spyJSON.functions.forEach((functionSpy,index) => {
        harnessJSON.push(getFunctionHarness(functionSpy,index))
    });
    if (spyJSON.result != 'NOTSET' && spyJSON.testedFunctionCall != 'EMPTY')
        harnessJSON.push( { testFunctionAssertion: { result: spyJSON.result, testFunctionCall: spyJSON.testedFunctionCall } })
    return harnessJSON
}

var getVariableHarness = function(variable){
    var returnedJSON = {
        variableDefinition: {
            name: variable.name,
            value: variable.values.filter(value => value.timing == 'Initial')[0].value
        }
    }
    
    return returnedJSON
}

var getFunctionHarness = function(functionSpyJSON,index){
    var returnedJSON = {
        functionHarness: [
            { variableDefinition: getFunctionDBDefinition(functionSpyJSON,index) },
            { variableDefinition: { name: 'MOCK'+ index + '_counter', value: 0 } },
            { functionDefinition: getFunctionDefinition(functionSpyJSON,index) }]
    }
    return returnedJSON
}

var getFunctionDefinition = function (functionSpyJSON,index) {
    var returnedJSON = {
            name: functionSpyJSON.name,
            content: [
                { validateInputAndGetOutput: { function: functionSpyJSON.name, DB: 'MOCK' + index +'_DB', counter: 'MOCK' + index + '_counter', returnVariable: 'output' } },
                { increaseCounterByOne: { counter: 'MOCK' + index + '_counter' } },
                { returnOutput: { returnVariable: 'output' } }]
        }
        return returnedJSON
}

var getFunctionDBDefinition=function(functionSpyJSON,index){
    var returnedJSON = { name: 'MOCK' + index + '_DB', value:[] }
    functionSpyJSON.traffic.forEach(call => {
        returnedJSON.value.push({ arguments: call.arguments, returnValue: call.returnValue })
    })
    return returnedJSON
}

module.exports = spyJSONToHarnessJSON