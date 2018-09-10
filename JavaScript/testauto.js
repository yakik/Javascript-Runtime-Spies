eval('var func = function (q) {\
    console.log(arguments);\
    eval(\'console.log(\\\'hi\\\')\')\
}')
var property = 'asd'
var document = { original: { asd: function (a, b) {return a+b } } }
console.log(document.original.asd(1,2) )
eval('document.' + property + ' = function () {\
    	var params = [];\
        for (var index=0;index<arguments.length;index++)  \
            params.push(\'arguments[\'+index+\']\');\
    var paramsString = params.join(\',\');\
            eval(\' return document.original.'+ property + '(\'+paramsString+\')\');\
    }')

  console.log(document.asd(5,6)) 

var a = { a1: 2 }
var b = [1, 2, 3]

func(a, b)

