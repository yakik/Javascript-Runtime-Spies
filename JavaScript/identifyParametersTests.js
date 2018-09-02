var mocha = require('mocha')
var chai = require('chai')
//chai.use(require('chai-as-promised'))
var expect = chai.expect

var IdentifyParameters = require('./identifyParameters.js')


mocha.describe('IdentifyParameters Tests', function () {
  mocha.it('test one number', function () {
    var identifiedParametersString = (function(a) {
      return IdentifyParameters.identifyParameters('a',arguments)
    })(2)
    
      expect(identifiedParametersString).equals('var a = 2;\n')
    })

   mocha.it('test two numbers', function () {
    var identifiedParametersString = (function(a,b) {
      return IdentifyParameters.identifyParameters('a,b',arguments)
    })(2,3)
    
      expect(identifiedParametersString).equals('var a = 2;\nvar b = 3;\n')
    })

	mocha.it('test three numbers', function () {
    var identifiedParametersString = (function(a,b,c) {
      return IdentifyParameters.identifyParameters('a,b,c',arguments)
    })(2,3,5)
    
      expect(identifiedParametersString).equals('var a = 2;\nvar b = 3;\nvar c = 5;\n')
    })





  })


