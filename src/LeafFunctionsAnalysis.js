var leafFunctionsAnalysis = function (analyzedVariable, path) {
    var myAnalysis = []
    if (path == undefined) path = ''
    if (typeof analyzedVariable == 'object' && !(analyzedVariable instanceof Array)) {
        path += '.'
        for (var propertyName in analyzedVariable)
            if (typeof analyzedVariable[propertyName] == 'function')
                myAnalysis.push(path + propertyName)
            else
                myAnalysis = myAnalysis.
                    concat(leafFunctionsAnalysis(analyzedVariable[propertyName], path + propertyName))
    }
    else
        if (analyzedVariable instanceof Array) {
            analyzedVariable.forEach((arrayItem, index) => {
                if (typeof arrayItem == 'function')
                    myAnalysis.push(path + '[' + index + ']')
                else
                    myAnalysis = myAnalysis.
                        concat(leafFunctionsAnalysis(analyzedVariable[index], path + '[' + index + ']'))
            })
        }
    return myAnalysis
}


module.exports = leafFunctionsAnalysis