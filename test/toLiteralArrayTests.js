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

  mocha.it('identifies circular reference array', function () {

    var a = { 1: 1, 2: 2, 3: 3 }
    var b = [1,a]
    a.y = b
    expect(CodeDefinition.getCodeDefinition(a).getLiteral())
      .equals('{1:1,2:2,3:3,y:[1]}')
    expect(CodeDefinition.getCodeDefinition(a).getCircularDefinitions()[0].getCircularDefinition('myVar'))
      .equals('myVar[\'y\'][1]=myVar')
  })
  mocha.it('identifies circular reference internal', function () {

    var a = { 1: 1, 2: 2, 3: 3 }
    var c = []
    var b = [1, c]
    c[0] = b
    a.a4 = b
    expect(CodeDefinition.getCodeDefinition(a).getLiteral())
      .equals('{1:1,2:2,3:3,a4:[1,[]]}')
    expect(CodeDefinition.getCodeDefinition(a).getCircularDefinitions()[0].getCircularDefinition('myVar'))
      .equals('myVar[\'a4\'][1][0]=myVar[\'a4\']')
  })

  mocha.it('two duplicates', function () {

    var a = { 1: 1, 2: 2, 3: 3 }
    var c = []
    var b = [1, c]
    c[0] = b
    a.a4 = b
    a.a5 = b
    expect(CodeDefinition.getCodeDefinition(a).getLiteral())
      .equals('{1:1,2:2,3:3,a4:[1,[]],a5:[1,[]]}')
      expect(CodeDefinition.getCodeDefinition(a).getCircularDefinitions().length)
      .equals(2)
    expect(CodeDefinition.getCodeDefinition(a).getCircularDefinitions()[0].getCircularDefinition('myVar'))
      .equals('myVar[\'a4\'][1][0]=myVar[\'a4\']')
      expect(CodeDefinition.getCodeDefinition(a).getCircularDefinitions()[1].getCircularDefinition('myVar'))
      .equals('myVar[\'a5\'][1][0]=myVar[\'a5\']')
  })

})


