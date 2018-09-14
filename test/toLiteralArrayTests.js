var mocha = require('mocha')
var chai = require('chai')
//chai.use(require('chai-as-promised'))
var expect = chai.expect

var ToLiteral = require('../src/toCodeDefinition')


mocha.describe('ToLiteral Array Tests', function () {

  mocha.it(' array', function () {
    expect(ToLiteral.toCodeDefinition([1, 2, 3]).literal).equals('[1,2,3]')
  })


  mocha.it(' array within array', function () {
    expect(ToLiteral.toCodeDefinition([1, ['a', 2, [1, 2, 3]], 3]).literal).equals('[1,[\'a\',2,[1,2,3]],3]')
  })



})


