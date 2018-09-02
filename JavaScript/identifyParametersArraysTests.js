var mocha = require('mocha')
var chai = require('chai')
//chai.use(require('chai-as-promised'))
var expect = chai.expect

var IdentifyParameters = require('./identifyParameters.js')


mocha.describe('IdentifyParameters Tests', function () {
 
	mocha. it('test three items, one is an array', function () {

    var identifiedParametersString = (function(a,b,c) {
      return IdentifyParameters.identifyParameters('a,b,c',arguments)
    })(2,[1,2,3],5)
    
      expect(identifiedParametersString).equals('var a = 2;\nvar b = [1,2,3];\nvar c = 5;\n')
  })
  
  




  })


