var mocha = require('mocha')
var chai = require('chai')
//chai.use(require('chai-as-promised'))
var expect = chai.expect

var CodeDefinition = require('../src/CodeDefinition')


mocha.describe('IdentifyParameters Primitive Tests', function () {

  mocha.it('test three numbers', function () {
      expect((new CodeDefinition(3)).getLiteral()).equals('3')
  })

  mocha.it('test three numbers, one is a variable', function () {
    var d = 3
    expect((new CodeDefinition(d)).getLiteral()).equals('3')
  })

  mocha.it('test three numbers, one is string', function () {
    expect((new CodeDefinition('yaki')).getLiteral()).equals('\'yaki\'')
  })

  mocha.it('test three numbers, one is boolean', function () {
    expect((new CodeDefinition(true)).getLiteral()).equals('true')
  })

  mocha.it('test three numbers, one is undefined', function () {
    var undefinedVariable
    expect((new CodeDefinition(undefinedVariable)).getLiteral()).equals('undefined')
  })




})


