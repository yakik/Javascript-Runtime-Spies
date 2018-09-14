var mocha = require('mocha')
var chai = require('chai')
//chai.use(require('chai-as-promised'))
var expect = chai.expect

var CodeDefinition = require('../src/CodeDefinition')


mocha.describe('ToLiteral Array Tests', function () {

  mocha.it(' array', function () {
    expect((CodeDefinition.getCodeDefinition([1, 2, 3])).getLiteral()).equals('[1,2,3]')
  })


  mocha.it(' array within array', function () {
    expect((CodeDefinition.getCodeDefinition([1, ['a', 2, [1, 2, 3]], 3])).getLiteral()).equals('[1,[\'a\',2,[1,2,3]],3]')
  })



})


