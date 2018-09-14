var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect

var ToCodeDefinition = require('../src/CodeDefinition')


mocha.describe('IdentifyParameters Object Tests', function () {

  mocha.it('an object', function () {
    expect(ToCodeDefinition.toCodeDefinition ({ Mom: 1, Pop: '2', 4: 3, 5: 'red' }).literal)
      .equals('{4:3,5:\'red\',Mom:1,Pop:\'2\'}')
  })

  mocha.it('object within object', function () {
    expect( ToCodeDefinition.toCodeDefinition({ Mom: 1, internal: { 1: 'ES', hello: 'world' }, Pop: '2', 4: 3, 5: 'red' }).literal)
      .equals('{4:3,5:\'red\',Mom:1,internal:{1:\'ES\',hello:\'world\'},Pop:\'2\'}')
  })

  mocha.it('Object with function', function () {
    expect(ToCodeDefinition.toCodeDefinition( { Mom: 1, myFunc: function () { }, Pop: '2', 4: 3, 5: 'red' }).literal)
      .equals('{4:3,5:\'red\',Mom:1,myFunc:function(){},Pop:\'2\'}')
  })

  mocha.it('identifies circular reference', function () {

    var a = { 1: 1, 2: 2, 3: 3 }
    var b = { 1: a }
    a.y = b
    expect(ToCodeDefinition.toCodeDefinition(a).literal)
      .equals('{1:1,2:2,3:3,y:{1:CIRCULAR}}')
  })

})


