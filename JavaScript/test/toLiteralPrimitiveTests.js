var mocha = require('mocha')
var chai = require('chai')
//chai.use(require('chai-as-promised'))
var expect = chai.expect

var ToLiteral = require('../src/toLiteral')


mocha.describe('IdentifyParameters Primitive Tests', function () {

  mocha.it('test three numbers', function () {
      expect(ToLiteral.toLiteral(3)).equals('3')
  })

  mocha.it('test three numbers, one is a variable', function () {
    var d = 3
    expect(ToLiteral.toLiteral(d)).equals('3')
  })

  mocha.it('test three numbers, one is string', function () {
    expect(ToLiteral.toLiteral('yaki')).equals('\'yaki\'')
  })

  mocha.it('test three numbers, one is boolean', function () {
    expect(ToLiteral.toLiteral(true)).equals('true')
  })

  mocha.it('test three numbers, one is undefined', function () {
    var undefinedVariable
    expect(ToLiteral.toLiteral(undefinedVariable)).equals('undefined')
  })




})


