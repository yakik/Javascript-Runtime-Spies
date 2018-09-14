var mocha = require('mocha')
var chai = require('chai')
//chai.use(require('chai-as-promised'))
var expect = chai.expect

var ToLiteral = require('../src/toCodeDefinition')


mocha.describe('IdentifyParameters Primitive Tests', function () {

  mocha.it('test three numbers', function () {
      expect(ToLiteral.toCodeDefinition(3).literal).equals('3')
  })

  mocha.it('test three numbers, one is a variable', function () {
    var d = 3
    expect(ToLiteral.toCodeDefinition(d).literal).equals('3')
  })

  mocha.it('test three numbers, one is string', function () {
    expect(ToLiteral.toCodeDefinition('yaki').literal).equals('\'yaki\'')
  })

  mocha.it('test three numbers, one is boolean', function () {
    expect(ToLiteral.toCodeDefinition(true).literal).equals('true')
  })

  mocha.it('test three numbers, one is undefined', function () {
    var undefinedVariable
    expect(ToLiteral.toCodeDefinition(undefinedVariable).literal).equals('undefined')
  })




})


