var mocha = require('mocha')
var chai = require('chai')
//chai.use(require('chai-as-promised'))
var expect = chai.expect

var IdentifyParameters = require('./identifyParameters.js')


mocha.describe('IdentifyParameters Array Tests', function () {

  mocha.it('test three items, one is an array', function () {

    var identifiedParametersString = (function (a, b, c) {
      return IdentifyParameters.identifyParameters('a,b,c', arguments)
    })(2, [1, 2, 3], 5)

    expect(identifiedParametersString).equals('var a = 2;\nvar b = [1,2,3];\nvar c = 5;\n')
  })

  mocha.it('test three items, two are arrays', function () {

    var identifiedParametersString = (function (a, b, c) {
      return IdentifyParameters.identifyParameters('a,b,c', arguments)
    })(2, [1, 2, 3], ['yaki', 45, 'asaf'])

    expect(identifiedParametersString).equals('var a = 2;\nvar b = [1,2,3];\nvar c = [\'yaki\',45,\'asaf\'];\n')
  })

  mocha.it('test three items, array within array', function () {

    var identifiedParametersString = (function (a, b, c) {
      return IdentifyParameters.identifyParameters('a,b,c', arguments)
    })(2, [1, ['a', 2, [1, 2, 3]], 3], 3)

    expect(identifiedParametersString).equals('var a = 2;\nvar b = [1,[\'a\',2,[1,2,3]],3];\nvar c = 3;\n')
  })



})


