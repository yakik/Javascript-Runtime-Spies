var mocha = require('mocha')
var chai = require('chai')
//chai.use(require('chai-as-promised'))
var expect = chai.expect

var IdentifyParameters = require('./identifyParameters.js')


mocha.describe('IdentifyParameters Tests', function () {
 
	mocha. it('test three items, one is an object', function () {

    var identifiedParametersString = (function(a,b,c) {
      return IdentifyParameters.identifyParameters('a,b,c',arguments)
    })(2, {Mom:1,Pop:'2',4:3,5:'red'},5)
    
    expect(identifiedParametersString)
      .equals('var a = 2;\nvar b = {4:3,5:\'red\',Mom:1,Pop:\'2\'};\nvar c = 5;\n')
  })

  mocha. it('test three items, object within object', function () {

    var identifiedParametersString = (function(a,b,c) {
      return IdentifyParameters.identifyParameters('a,b,c',arguments)
    })(2, { Mom: 1,internal:{ 1: 'ES', hello: 'world' },Pop:'2',4:3,5:'red'},5)
    
    expect(identifiedParametersString)
      .equals('var a = 2;\nvar b = {4:3,5:\'red\',Mom:1,internal:{1:\'ES\',hello:\'world\'},Pop:\'2\'};\nvar c = 5;\n')
  })

  mocha. it('Object with function', function () {

    var identifiedParametersString = (function(a,b,c) {
      return IdentifyParameters.identifyParameters('a,b,c',arguments)
    })(2, { Mom: 1, myFunc: function () { },Pop:'2',4:3,5:'red'},5)
    
    expect(identifiedParametersString)
      .equals('var a = 2;\nvar b = {4:3,5:\'red\',Mom:1,myFunc:function(){},Pop:\'2\'};\nvar c = 5;\n')
  })

})


