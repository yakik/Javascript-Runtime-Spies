var leafFunctionsAnalysis = function (analyzedVariable, path) {
    var myAnalysis = []
    if (path == undefined) path = ''
    if (typeof analyzedVariable == 'object') {
        path += '.'
        for (var propertyName in analyzedVariable)
            if (typeof analyzedVariable[propertyName] == 'function')
                myAnalysis.push(path + propertyName)
            else 
                myAnalysis = myAnalysis.
                    concat(leafFunctionsAnalysis(analyzedVariable[propertyName], path + propertyName))
    }
    return myAnalysis
}


module.exports = leafFunctionsAnalysis