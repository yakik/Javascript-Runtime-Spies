var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect

var CodeDefinition = require('../src/CodeDefinition')


mocha.describe('IdentifyParameters Object Tests', function () {

  mocha.it('an object', function () {
    expect((CodeDefinition.getCodeDefinition(({ Mom: 1, Pop: '2', 4: 3, 5: 'red' }))).getLiteral())
      .equals('{4:3,5:\'red\',Mom:1,Pop:\'2\'}')
  })

  mocha.it('object within object', function () {
    expect((CodeDefinition.getCodeDefinition({ Mom: 1, internal: { 1: 'ES', hello: 'world' }, Pop: '2', 4: 3, 5: 'red' }).getLiteral()))
      .equals('{4:3,5:\'red\',Mom:1,internal:{1:\'ES\',hello:\'world\'},Pop:\'2\'}')
  })

  mocha.it('Object with function', function () {
    var a = { Mom: 1, myFunc: function (x) { return x + 2 }, Pop: '2', 4: 3, 5: 'red', 6: function (x) { return 2 * x } }
    expect(CodeDefinition.getCodeDefinition(a).getLiteral())
      .equals('{4:3,5:\'red\',Mom:1,Pop:\'2\'}')
    var newMyFunc = CodeDefinition.getCodeDefinition(a).getFunctionsDefinitions()[0].getFunctionDefinition()
    expect(newMyFunc(3))
      .equals(6)
    expect((CodeDefinition.getCodeDefinition(a).getFunctionsDefinitions()[1].getFunctionDefinition())(3))
      .equals(5)

  })

  mocha.it('identifies circular reference object', function () {

    var a = { 1: 1, 2: 2, 3: 3 }
    var b = { 1: a }
    a.y = b
    expect(CodeDefinition.getCodeDefinition(a).getLiteral())
      .equals('{1:1,2:2,3:3,y:{}}')
    expect(CodeDefinition.getCodeDefinition(a).getCircularDefinitions()[0].getCircularDefinition('myVar'))
      .equals('myVar[\'y\'][\'1\']=myVar')
  })

  mocha.it('test complete object', function () {

    var a = { 1: 1, 2: 2, 3: 3 }
    var b = { 1: a }
    a.y = b
    a.z = function (x) { return x * 2 }
    myDefinition = CodeDefinition.getCodeDefinition(a)
    
    eval('var c=' + myDefinition.getLiteral())
    
    myDefinition.getCircularDefinitions().forEach(circularDef => {
      eval(circularDef.getCircularDefinition('c'))
    })
    myDefinition.getFunctionsDefinitions().forEach(functionDef => {
      eval('c' + functionDef.getPath() + '=functionDef.getFunctionDefinition()')
    })
    expect(c.y['1']).equals(c)
    expect(c.z(2)).equals(4)

  })

})


