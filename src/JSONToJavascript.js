var JSONToJavascript = function (harnessJSON) {
    var javascriptCode = ''
    harnessJSON.forEach(harnessPart => {
        javascriptCode += getHarnessCode(harnessPart)
    })
    return javascriptCode
}



var getHarnessCode = function (harnessJSON) {
    var javascriptCode = ''
    for (var propertyName in harnessJSON) {
        eval('javascriptCode += ' + propertyName +'(harnessJSON[propertyName])\n')
    }
    return javascriptCode
}

var reportSpiedFunctionCallingArgumentsAndResult= function (harnessJSON) {
    return harnessJSON.spiesDB+' = RuntimeSpy.getSpiesDBAfterThisSpiedFunctionCall(\'' + harnessJSON.functionName + '\', arguments, ' +
    harnessJSON.returnVariable+', '+ harnessJSON.spiesDB+')\n'
}
var reportSpiedVariableValue= function (harnessJSON) {
    return harnessJSON.spiesDB+' = RuntimeSpy.getSpiesDBAfterVariableUpdate(' + harnessJSON.name + ', '+harnessJSON.tag+', ' +
    harnessJSON.value+', '+ harnessJSON.spiesDB+')\n'
}

var copyFunctionToTemporaryVariable = function (harnessJSON) {
    return 'let __tempFunction = ' + harnessJSON.functionName + '\n'
 }

var callSpiedFunctionAndStoreResult = function (harnessJSON) {
    return 'var ' + harnessJSON.returnVariable + ' = __tempFunction.apply(null, Array.from(arguments))\n'
 }
var block = function (harnessJSON) {
    return '{\n' + JSONToJavascript(harnessJSON)+ '}\n'
 }

 var functionHarness = function (harnessJSON) {
    return JSONToJavascript(harnessJSON)
 }

var variableDefinition=function(harnessJSON) {
    var javascriptCode = 'var '+ harnessJSON.name+' = '+JSON.stringify(harnessJSON.value)+'\n'
    return javascriptCode
 }

var functionDefinition = function (harnessJSON) {
    var varRequired = true
    if (harnessJSON.name.indexOf('.') > -1 || harnessJSON.name.indexOf('.') > -1)//leaf function
        varRequired = false
    var javascriptCode = (varRequired?'var ':'') + harnessJSON.name + ' = function(){\n' +
    JSONToJavascript(harnessJSON.content)+'\n}\n'
    return javascriptCode
}
 
var functionAssignment=function(harnessJSON) {
    var javascriptCode = harnessJSON.name + ' = function(){\n' +
    JSONToJavascript(harnessJSON.content)+'\n}\n'
    return javascriptCode
}

var validateInputAndGetOutput=function(harnessJSON) {
    var javascriptCode = 'expect(Array.from(arguments)).deep.equal('+harnessJSON.DB+'['+harnessJSON.counter+'].arguments)\n'
    javascriptCode+= 'var ' + harnessJSON.returnVariable + ' = ' +
        harnessJSON.DB+'['+harnessJSON.counter+'].returnValue\n'
    return javascriptCode
}
 
var increaseCounterByOne=function(harnessJSON) {
   
    return harnessJSON.counter+'++\n'
 }

var returnOutput=function(harnessJSON) {
    return 'return '+harnessJSON.returnVariable
}
 
var testFunctionAssertion = function (harnessJSON){
    return 'expect('+harnessJSON.testFunctionCall+').equals('+harnessJSON.result+')\n'
}


module.exports = JSONToJavascript