var mocha = require('mocha')
var chai = require('chai')
//chai.use(require('chai-as-promised'))
var expect = chai.expect

var ToLiteral = require('../src/toLiteral')


mocha.describe('IdentifyParameters Primitive Tests', function () {
  mocha.it('test one number', function () {
    var identifiedParametersString = (function (a) {
      return ToLiteral.parametersToLiteral('a', arguments)
    })(2)

    expect(identifiedParametersString).equals('var a = 2;\n')
  })

  mocha.it('test two numbers', function () {
    var identifiedParametersString = (function (a, b) {
      return ToLiteral.parametersToLiteral('a,b', arguments)
    })(2, 3)

    expect(identifiedParametersString).equals('var a = 2;\nvar b = 3;\n')
  })

  mocha.it('test three numbers', function () {
    var identifiedParametersString = (function (a, b, c) {
      return ToLiteral.parametersToLiteral('a,b,c', arguments)
    })(2, 3, 5)

    expect(identifiedParametersString).equals('var a = 2;\nvar b = 3;\nvar c = 5;\n')
  })

  mocha.it('test three numbers, one is a variable', function () {
    var d = 3
    var identifiedParametersString = (function (a, b, c) {
      return ToLiteral.parametersToLiteral('a,b,c', arguments)
    })(2, d, 5)

    expect(identifiedParametersString).equals('var a = 2;\nvar b = 3;\nvar c = 5;\n')
  })

  mocha.it('test three numbers, one is string', function () {
    var identifiedParametersString = (function (a, b, c) {
      return ToLiteral.parametersToLiteral('a,b,c', arguments)
    })(2, 'yaki', 5)

    expect(identifiedParametersString).equals('var a = 2;\nvar b = \'yaki\';\nvar c = 5;\n')
  })

  mocha.it('test three numbers, one is boolean', function () {
    var identifiedParametersString = (function (a, b, c) {
      return ToLiteral.parametersToLiteral('a,b,c', arguments)
    })(2, true, 5)

    expect(identifiedParametersString).equals('var a = 2;\nvar b = true;\nvar c = 5;\n')
  })

  mocha.it('test three numbers, one is undefined', function () {
    var undefinedVariable
    var identifiedParametersString = (function (a, b, c) {
      return ToLiteral.parametersToLiteral('a,b,c', arguments)
    })(2, undefinedVariable, 5)

    expect(identifiedParametersString).equals('var a = 2;\nvar b = undefined;\nvar c = 5;\n')
  })




})


