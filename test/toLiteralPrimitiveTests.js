var mocha = require('mocha')
var chai = require('chai')
//chai.use(require('chai-as-promised'))
var expect = chai.expect

var ToCodeDefinition = require('../src/toCodeDefinition')


mocha.describe('IdentifyParameters Primitive Tests', function () {

  mocha.it('test three numbers', function () {
      expect(ToCodeDefinition.toCodeDefinition(3).literal).equals('3')
  })

  mocha.it('test three numbers, one is a variable', function () {
    var d = 3
    expect(ToCodeDefinition.toCodeDefinition(d).literal).equals('3')
  })

  mocha.it('test three numbers, one is string', function () {
    expect(ToCodeDefinition.toCodeDefinition('yaki').literal).equals('\'yaki\'')
  })

  mocha.it('test three numbers, one is boolean', function () {
    expect(ToCodeDefinition.toCodeDefinition(true).literal).equals('true')
  })

  mocha.it('test three numbers, one is undefined', function () {
    var undefinedVariable
    expect(ToCodeDefinition.toCodeDefinition(undefinedVariable).literal).equals('undefined')
  })




})


