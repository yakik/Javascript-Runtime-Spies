var analyzeCode = require('./src/analyzeCode.js')

var fs = require("fs")
var text = fs.readFileSync(process.argv[2]).toString('utf-8')
console.log(analyzeCode.getAnalyzedFunctions(text))