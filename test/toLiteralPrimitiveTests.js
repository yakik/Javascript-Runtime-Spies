var mocha = require('mocha')
var chai = require('chai')
//chai.use(require('chai-as-promised'))
var expect = chai.expect

var CodeDefinition = require('../src/CodeDefinition')


mocha.describe('IdentifyParameters Primitive Tests', function () {

  mocha.it('null', function () {
    var a = null
    expect((CodeDefinition.getCodeDefinition(a)).getLiteral()).equals('null')
})
  mocha.it('test three numbers', function () {
      expect((CodeDefinition.getCodeDefinition(3)).getLiteral()).equals('3')
  })

  mocha.it('test three numbers, one is a variable', function () {
    var d = 3
    expect((CodeDefinition.getCodeDefinition(d)).getLiteral()).equals('3')
  })

  mocha.it('test three numbers, one is string', function () {
    expect((CodeDefinition.getCodeDefinition('yaki')).getLiteral()).equals('\'yaki\'')
  })

  mocha.it('test three numbers, one is boolean', function () {
    expect((CodeDefinition.getCodeDefinition(true)).getLiteral()).equals('true')
  })

  mocha.it('test three numbers, one is undefined', function () {
    var undefinedVariable
    expect((CodeDefinition.getCodeDefinition(undefinedVariable)).getLiteral()).equals('undefined')
  })




})


