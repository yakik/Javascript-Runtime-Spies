{
    scopes: [{
        type: 'global', set: {
        }, taints: {
        }, dynamic: true, block: {
            type: 'Program', body: [{
                type: 'VariableDeclaration', declarations: [{
                    type: 'VariableDeclarator', id: {
                        type: 'Identifier', name: 'mocha'
                    }, init: {
                        type: 'CallExpression', callee: {
                            type: 'Identifier', name: 'require'
                        }, arguments: [{
                            type: 'Literal', value: 'mocha', raw: ''mocha''
                        }]
                    }
                }], kind: 'var'
            }, {
                type: 'VariableDeclaration', declarations: [{
                    type: 'VariableDeclarator', id: {
                        type: 'Identifier', name: 'IdentifyParameters'
                    }, init: {
                        type: 'CallExpression', callee: {
                            type: 'Identifier', name: 'require'
                        }, arguments: [{
                            type: 'Literal', value: './identifyParameters.js', raw: ''./ identifyParameters.js''}]
                    }
                }], kind: 'var'
            }, {
                type: 'VariableDeclaration', declarations: [{
                    type: 'VariableDeclarator', id: {
                        type: 'Identifier', name: 'isCircularReference'
                    }, init: {
                        type: 'FunctionExpression', id: null, params: [{
                            type: 'Identifier', name: 'object'
                        }], body: {
                            type: 'BlockStatement', body: [{
                                type: 'ForStatement', init: {
                                    type: 'VariableDeclaration', declarations: [{
                                        type: 'VariableDeclarator', id: {
                                            type: 'Identifier', name: 'objectIndex'
                                        }, init: {
                                            type: 'Literal', value: 0, raw: '0'
                                        }
                                    }], kind: 'var'
                                }, test: {
                                    type: 'BinaryExpression', operator: '<', left: {
                                        type: 'Identifier', name: 'objectIndex'
                                    }, right: {
                                        type: 'MemberExpression', computed: false, object: {
                                            type: 'Identifier', name: 'allObjects'
                                        }, property: {
                                            type: 'Identifier', name: 'length'
                                        }
                                    }
                                }, update: {
                                    type: 'UpdateExpression', operator: '++', argument: {
                                        type: 'Identifier', name: 'objectIndex'
                                    }, prefix: false
                                }, body: {
                                    type: 'IfStatement', test: {
                                        type: 'BinaryExpression', operator: '===', left: {
                                            type: 'MemberExpression', computed: true, object: {
                                                type: 'Identifier', name: 'allObjects'
                                            }, property: {
                                                type: 'Identifier', name: 'objectIndex'
                                            }
                                        }, right: {
                                            type: 'Identifier', name: 'object'
                                        }
                                    }, consequent: {
                                        type: 'ReturnStatement', argument: {
                                            type: 'Literal', value: true, raw: 'true'
                                        }
                                    }, alternate: null
                                }
                            }, {
                                type: 'ReturnStatement', argument: {
                                    type: 'Literal', value: false, raw: 'false'
                                }
                            }]
                        }, generator: false, expression: false, async: false
                    }
                }], kind: 'var'
            }, {
                type: 'VariableDeclaration', declarations: [{
                    type: 'VariableDeclarator', id: {
                        type: 'Identifier', name: 'getNonArrayObjectLiteral'
                    }, init: {
                        type: 'FunctionExpression', id: null, params: [{
                            type: 'Identifier', name: 'object'
                        }], body: {
                            type: 'BlockStatement', body: [{
                                type: 'IfStatement', test: {
                                    type: 'BinaryExpression', operator: '==', left: {
                                        type: 'Identifier', name: 'object'
                                    }, right: {
                                        type: 'Literal', value: null, raw: 'null'
                                    }
                                }, consequent: {
                                    type: 'ReturnStatement', argument: {
                                        type: 'Literal', value: 'null', raw: ''null''
                                    }
                                }, alternate: null
                            }, {
                                type: 'IfStatement', test: {
                                    type: 'BinaryExpression', operator: '==', left: {
                                        type: 'Identifier', name: 'object'
                                    }, right: {
                                        type: 'Identifier', name: 'undefined'
                                    }
                                }, consequent: {
                                    type: 'ReturnStatement', argument: {
                                        type: 'Literal', value: 'undefined', raw: ''undefined''
                                    }
                                }, alternate: null
                            }, {
                                type: 'IfStatement', test: {
                                    type: 'UnaryExpression', operator: '!', argument: {
                                        type: 'CallExpression', callee: {
                                            type: 'Identifier', name: 'isCircularReference'
                                        }, arguments: [{
                                            type: 'Identifier', name: 'object'
                                        }]
                                    }, prefix: true
                                }, consequent: {
                                    type: 'BlockStatement', body: [{
                                        type: 'ExpressionStatement', expression: {
                                            type: 'CallExpression', callee: {
                                                type: 'MemberExpression', computed: false, object: {
                                                    type: 'Identifier', name: 'allObjects'
                                                }, property: {
                                                    type: 'Identifier', name: 'push'
                                                }
                                            }, arguments: [{
                                                type: 'Identifier', name: 'object'
                                            }]
                                        }
                                    }, {
                                        type: 'VariableDeclaration', declarations: [{
                                            type: 'VariableDeclarator', id: {
                                                type: 'Identifier', name: 'literal'
                                            }, init: {
                                                type: 'Literal', value: '{
',raw:''{
''}
                                        }], kind: 'var'
                                    }, {
                                        type: 'VariableDeclaration', declarations: [{
                                            type: 'VariableDeclarator', id: {
                                                type: 'Identifier', name: 'objectProperties'
                                            }, init: {
                                                type: 'CallExpression', callee: {
                                                    type: 'MemberExpression', computed: false, object: {
                                                        type: 'Identifier', name: 'Object'
                                                    }, property: {
                                                        type: 'Identifier', name: 'getOwnPropertyNames'
                                                    }
                                                }, arguments: [{
                                                    type: 'Identifier', name: 'object'
                                                }]
                                            }
                                        }], kind: 'var'
                                    }, {
                                        type: 'VariableDeclaration', declarations: [{
                                            type: 'VariableDeclarator', id: {
                                                type: 'Identifier', name: 'objectValues'
                                            }, init: {
                                                type: 'CallExpression', callee: {
                                                    type: 'MemberExpression', computed: false, object: {
                                                        type: 'Identifier', name: 'Object'
                                                    }, property: {
                                                        type: 'Identifier', name: 'values'
                                                    }
                                                }, arguments: [{
                                                    type: 'Identifier', name: 'object'
                                                }]
                                            }
                                        }], kind: 'var'
                                    }, {
                                        type: 'ForStatement', init: {
                                            type: 'VariableDeclaration', declarations: [{
                                                type: 'VariableDeclarator', id: {
                                                    type: 'Identifier', name: 'objectPropertyIndex'
                                                }, init: {
                                                    type: 'Literal', value: 0, raw: '0'
                                                }
                                            }], kind: 'var'
                                        }, test: {
                                            type: 'BinaryExpression', operator: '<', left: {
                                                type: 'Identifier', name: 'objectPropertyIndex'
                                            }, right: {
                                                type: 'MemberExpression', computed: false, object: {
                                                    type: 'Identifier', name: 'objectProperties'
                                                }, property: {
                                                    type: 'Identifier', name: 'length'
                                                }
                                            }
                                        }, update: {
                                            type: 'UpdateExpression', operator: '++', argument: {
                                                type: 'Identifier', name: 'objectPropertyIndex'
                                            }, prefix: false
                                        }, body: {
                                            type: 'BlockStatement', body: [{
                                                type: 'IfStatement', test: {
                                                    type: 'BinaryExpression', operator: '>', left: {
                                                        type: 'Identifier', name: 'objectPropertyIndex'
                                                    }, right: {
                                                        type: 'Literal', value: 0, raw: '0'
                                                    }
                                                }, consequent: {
                                                    type: 'ExpressionStatement', expression: {
                                                        type: 'AssignmentExpression', operator: '+=', left: {
                                                            type: 'Identifier', name: 'literal'
                                                        }, right: {
                                                            type: 'Literal', value: ',', raw: '', ''}
                                                    }
                                                }, alternate: null
                                            }, {
                                                type: 'ExpressionStatement', expression: {
                                                    type: 'AssignmentExpression', operator: '+=', left: {
                                                        type: 'Identifier', name: 'literal'
                                                    }, right: {
                                                        type: 'BinaryExpression', operator: '+', left: {
                                                            type: 'BinaryExpression', operator: '+', left: {
                                                                type: 'MemberExpression', computed: true, object: {
                                                                    type: 'Identifier', name: 'objectProperties'
                                                                }, property: {
                                                                    type: 'Identifier', name: 'objectPropertyIndex'
                                                                }
                                                            }, right: {
                                                                type: 'Literal', value: ':', raw: '': ''}
                                                        }, right: {
                                                            type: 'CallExpression', callee: {
                                                                type: 'Identifier', name: 'getArgumentLiteral'
                                                            }, arguments: [{
                                                                type: 'MemberExpression', computed: true, object: {
                                                                    type: 'Identifier', name: 'objectValues'
                                                                }, property: {
                                                                    type: 'Identifier', name: 'objectPropertyIndex'
                                                                }
                                                            }]
                                                        }
                                                    }
                                                }
                                            }]
                                        }
                                    }, {
                                        type: 'ExpressionStatement', expression: {
                                            type: 'AssignmentExpression', operator: '+=', left: {
                                                type: 'Identifier', name: 'literal'
                                            }, right: {
                                                type: 'Literal', value: '}', raw: ''
                                            }''}
                                    }},{
                                type: 'ReturnStatement', argument: {
                                    type: 'Identifier', name: 'literal'
                                }
                            }]
                        }, alternate: {
                            type: 'BlockStatement', body: [{
                                type: 'ReturnStatement', argument: {
                                    type: 'Literal', value: 'CIRCULAR', raw: ''CIRCULAR''
                                }
                            }]
                        }
                    }]
            }, generator: false, expression: false, async: false}
    }], kind: 'var'
}], sourceType: 'script'}, through: [{
    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: null, flag: 2, writeExpr: CIRCULAR, partial: false, init: true, __maybeImplicitGlobal: null
}, {
    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: null, flag: 1, __maybeImplicitGlobal: undefined
}, {
    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: null, flag: 2, writeExpr: CIRCULAR, partial: false, init: true, __maybeImplicitGlobal: null
}, {
    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: null, flag: 1, __maybeImplicitGlobal: undefined
}, {
    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: null, flag: 2, writeExpr: CIRCULAR, partial: false, init: true, __maybeImplicitGlobal: null
}, {
    identifier: CIRCULAR, from: {
        type: 'function', set: {
        }, taints: {
        }, dynamic: false, block: CIRCULAR, through: [CIRCULAR, {
            identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: null, flag: 1, __maybeImplicitGlobal: undefined
        }], variables: [{
            name: 'arguments', identifiers: [], references: [], defs: [], tainted: false, stack: true, scope: CIRCULAR
        }, {
            name: 'object', identifiers: [CIRCULAR], references: [{
                identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 1, __maybeImplicitGlobal: undefined
            }], defs: [{
                type: 'Parameter', name: CIRCULAR, node: CIRCULAR, parent: null, index: 0, kind: null, rest: false
            }], tainted: false, stack: true, scope: CIRCULAR
        }, {
            name: 'objectIndex', identifiers: [CIRCULAR], references: [{
                identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 2, writeExpr: CIRCULAR, partial: false, init: true, __maybeImplicitGlobal: null
            }, {
                identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 1, __maybeImplicitGlobal: undefined
            }, {
                identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 3, writeExpr: null, partial: false, init: false, __maybeImplicitGlobal: undefined
            }, {
                identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 1, __maybeImplicitGlobal: undefined
            }], defs: [{
                type: 'Variable', name: CIRCULAR, node: CIRCULAR, parent: CIRCULAR, index: 0, kind: 'var'
            }], tainted: false, stack: true, scope: CIRCULAR
        }], references: [CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR], variableScope: CIRCULAR, functionExpressionScope: false, directCallToEvalScope: false, thisFound: false, __left: null, upper: CIRCULAR, isStrict: false, childScopes: [], __declaredVariables: {
        }
    }, tainted: false, resolved: null, flag: 1, __maybeImplicitGlobal: undefined
}, CIRCULAR, {
    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: null, flag: 2, writeExpr: CIRCULAR, partial: false, init: true, __maybeImplicitGlobal: null
}, {
    identifier: CIRCULAR, from: {
        type: 'function', set: {
        }, taints: {
        }, dynamic: false, block: CIRCULAR, through: [CIRCULAR, {
            identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: null, flag: 1, __maybeImplicitGlobal: undefined
        }, {
                identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: null, flag: 1, __maybeImplicitGlobal: undefined
            }, {
                identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: null, flag: 1, __maybeImplicitGlobal: undefined
            }, {
                identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: null, flag: 1, __maybeImplicitGlobal: undefined
            }, {
                identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: null, flag: 1, __maybeImplicitGlobal: undefined
            }], variables: [{
                name: 'arguments', identifiers: [], references: [], defs: [], tainted: false, stack: true, scope: CIRCULAR
            }, {
                name: 'object', identifiers: [CIRCULAR], references: [{
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 1, __maybeImplicitGlobal: undefined
                }, {
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 1, __maybeImplicitGlobal: undefined
                }, {
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 1, __maybeImplicitGlobal: undefined
                }, {
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 1, __maybeImplicitGlobal: undefined
                }, {
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 1, __maybeImplicitGlobal: undefined
                }, {
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 1, __maybeImplicitGlobal: undefined
                }], defs: [{
                    type: 'Parameter', name: CIRCULAR, node: CIRCULAR, parent: null, index: 0, kind: null, rest: false
                }], tainted: false, stack: true, scope: CIRCULAR
            }, {
                name: 'literal', identifiers: [CIRCULAR], references: [{
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 2, writeExpr: CIRCULAR, partial: false, init: true, __maybeImplicitGlobal: null
                }, {
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 3, writeExpr: CIRCULAR, partial: false, init: false, __maybeImplicitGlobal: undefined
                }, {
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 3, writeExpr: CIRCULAR, partial: false, init: false, __maybeImplicitGlobal: undefined
                }, {
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 3, writeExpr: CIRCULAR, partial: false, init: false, __maybeImplicitGlobal: undefined
                }, {
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 1, __maybeImplicitGlobal: undefined
                }], defs: [{
                    type: 'Variable', name: CIRCULAR, node: CIRCULAR, parent: CIRCULAR, index: 0, kind: 'var'
                }], tainted: false, stack: true, scope: CIRCULAR
            }, {
                name: 'objectProperties', identifiers: [CIRCULAR], references: [{
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 2, writeExpr: CIRCULAR, partial: false, init: true, __maybeImplicitGlobal: null
                }, {
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 1, __maybeImplicitGlobal: undefined
                }, {
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 1, __maybeImplicitGlobal: undefined
                }], defs: [{
                    type: 'Variable', name: CIRCULAR, node: CIRCULAR, parent: CIRCULAR, index: 0, kind: 'var'
                }], tainted: false, stack: true, scope: CIRCULAR
            }, {
                name: 'objectValues', identifiers: [CIRCULAR], references: [{
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 2, writeExpr: CIRCULAR, partial: false, init: true, __maybeImplicitGlobal: null
                }, {
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 1, __maybeImplicitGlobal: undefined
                }], defs: [{
                    type: 'Variable', name: CIRCULAR, node: CIRCULAR, parent: CIRCULAR, index: 0, kind: 'var'
                }], tainted: false, stack: true, scope: CIRCULAR
            }, {
                name: 'objectPropertyIndex', identifiers: [CIRCULAR], references: [{
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 2, writeExpr: CIRCULAR, partial: false, init: true, __maybeImplicitGlobal: null
                }, {
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 1, __maybeImplicitGlobal: undefined
                }, {
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 3, writeExpr: null, partial: false, init: false, __maybeImplicitGlobal: undefined
                }, {
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 1, __maybeImplicitGlobal: undefined
                }, {
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 1, __maybeImplicitGlobal: undefined
                }, {
                    identifier: CIRCULAR, from: CIRCULAR, tainted: false, resolved: CIRCULAR, flag: 1, __maybeImplicitGlobal: undefined
                }], defs: [{
                    type: 'Variable', name: CIRCULAR, node: CIRCULAR, parent: CIRCULAR, index: 0, kind: 'var'
                }], tainted: false, stack: true, scope: CIRCULAR
            }], references: [CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR], variableScope: CIRCULAR, functionExpressionScope: false, directCallToEvalScope: false, thisFound: false, __left: null, upper: CIRCULAR, isStrict: false, childScopes: [], __declaredVariables: CIRCULAR
    }, tainted: false, resolved: null, flag: 1, __maybeImplicitGlobal: undefined
}, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR], variables: [{
    name: 'mocha', identifiers: [CIRCULAR], references: [], defs: [{
        type: 'Variable', name: CIRCULAR, node: CIRCULAR, parent: CIRCULAR, index: 0, kind: 'var'
    }], tainted: false, stack: true, scope: CIRCULAR
}, {
    name: 'IdentifyParameters', identifiers: [CIRCULAR], references: [], defs: [{
        type: 'Variable', name: CIRCULAR, node: CIRCULAR, parent: CIRCULAR, index: 0, kind: 'var'
    }], tainted: false, stack: true, scope: CIRCULAR
}, {
    name: 'isCircularReference', identifiers: [CIRCULAR], references: [], defs: [{
        type: 'Variable', name: CIRCULAR, node: CIRCULAR, parent: CIRCULAR, index: 0, kind: 'var'
    }], tainted: false, stack: true, scope: CIRCULAR
}, {
    name: 'getNonArrayObjectLiteral', identifiers: [CIRCULAR], references: [], defs: [{
        type: 'Variable', name: CIRCULAR, node: CIRCULAR, parent: CIRCULAR, index: 0, kind: 'var'
    }], tainted: false, stack: true, scope: CIRCULAR
}], references: [CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR], variableScope: CIRCULAR, functionExpressionScope: false, directCallToEvalScope: false, thisFound: false, __left: null, upper: null, isStrict: false, childScopes: [CIRCULAR, CIRCULAR], __declaredVariables: CIRCULAR, implicit: {
    set: {
    }, variables: [], left: [CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR, CIRCULAR]
}}, CIRCULAR, CIRCULAR], globalScope: CIRCULAR, __nodeToScope: {
}, __currentScope: null, __options: {
    optimistic: false, directive: false, nodejsScope: false, impliedStrict: false, sourceType: 'script', ecmaVersion: 5, childVisitorKeys: null, fallback: 'iteration'
}, __declaredVariables: CIRCULAR}
















[{
    type: 'global', set: {
    }, taints: {
    },dynamic:true,block:{
    type:'Program',body:[{
    type:'VariableDeclaration',declarations:[{
    type:'VariableDeclarator',id:{
    type:'Identifier',name:'mocha'},init:{
    type:'CallExpression',callee:{
    type:'Identifier',name:'require'},arguments:[{
    type:'Literal',value:'mocha',raw:''mocha''}]}}],kind:'var'}],sourceType:'script'},through:[{
    identifier:CIRCULAR,from:CIRCULAR,tainted:false,resolved:null,flag:2,writeExpr:CIRCULAR,partial:false,init:true,__maybeImplicitGlobal:null},{
    identifier:CIRCULAR,from:CIRCULAR,tainted:false,resolved:null,flag:1,__maybeImplicitGlobal:undefined}],variables:[{
    name:'mocha',identifiers:[CIRCULAR],references:[],defs:[{
    type:'Variable',name:CIRCULAR,node:CIRCULAR,parent:CIRCULAR,index:0,kind:'var'}],tainted:false,stack:true,scope:CIRCULAR}],references:[CIRCULAR,CIRCULAR],variableScope:CIRCULAR,functionExpressionScope:false,directCallToEvalScope:false,thisFound:false,__left:null,upper:null,isStrict:false,childScopes:[],__declaredVariables:{
    },implicit:{
    set:{
    },variables:[],left:[CIRCULAR,CIRCULAR]}}]
    


