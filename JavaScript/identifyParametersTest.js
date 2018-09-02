var mocha = require('mocha')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect

var IdentifyParameters = require('./identifyParameters.js')


mocha.describe('IdentifyParameters Tests', function () {
  mocha.it('test number', function () {
    var identifiedParametersString = (function(a) {
      return IdentifyParameters.identifyParameters(arguments)
    })(2)
    
      expect(identifiedParametersString)
        .equals('var a = 2;')
    })
  })


