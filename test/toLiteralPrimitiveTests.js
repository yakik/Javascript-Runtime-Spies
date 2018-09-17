var mocha = require('mocha')
var chai = require('chai')
//chai.use(require('chai-as-promised'))
var expect = chai.expect

var Variable = require('../src/Variable')


mocha.describe('IdentifyParameters Primitive Tests', function () {

  mocha.it('null', function () {
    var a = null
    expect((Variable.getVariable(a)).getLiteral()).equals('null')
})
  mocha.it('test three numbers', function () {
      expect((Variable.getVariable(3)).getLiteral()).equals('3')
  })

  mocha.it('test three numbers, one is a variable', function () {
    var d = 3
    expect((Variable.getVariable(d)).getLiteral()).equals('3')
  })

  mocha.it('test three numbers, one is string', function () {
    expect((Variable.getVariable('yaki')).getLiteral()).equals('\'yaki\'')
  })

  mocha.it('test three numbers, one is boolean', function () {
    expect((Variable.getVariable(true)).getLiteral()).equals('true')
  })

  mocha.it('test three numbers, one is undefined', function () {
    var undefinedVariable
    expect((Variable.getVariable(undefinedVariable)).getLiteral()).equals('undefined')
  })




})


