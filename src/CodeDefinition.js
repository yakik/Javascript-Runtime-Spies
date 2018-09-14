class CodeDefinition {


	constructor(variable) {
		this.variable = variable
	}

	setPropertyName(propertyName) {
		this.propertyName = propertyName
	}

	setAncestors(ancestors) {
		this.ancestors = ancestors
	}

	static getCodeDefinition(variable, ancestors, propertyName) {
		var newCodeDefinition
		if (Array.isArray(variable))
			newCodeDefinition = new ArrayCodeDefinition(variable)
		else {
			if (typeof variable == 'object')
				newCodeDefinition = new ObjectCodeDefinition(variable)
			else {
				if (typeof variable == 'function')
					newCodeDefinition = new FunctionCodeDefinition(variable)
				else
					newCodeDefinition = new PrimitiveCodeDefinition(variable)
			}
		}
		if (ancestors != undefined)
			newCodeDefinition.setAncestors(propertyName)
		if (propertyName != undefined)
			newCodeDefinition.setPropertyName(propertyName)


		return newCodeDefinition
	}

	getLiteral() {
		var literal = ''
		if (this.propertyName != undefined)
			literal += this.propertyName + ':'
		return literal += this.getValueLiteral()
	}

	getValueLiteral() { }

}

class PrimitiveCodeDefinition extends CodeDefinition {
	constructor(variable) {
		super(variable)
	}

	getValueLiteral() {

		switch (typeof this.variable) {
			case 'number':
				return this.variable.toString()
			case 'string':
				return '\'' + this.variable + '\''
			case 'undefined':
				return 'undefined'
			case 'boolean':
				return this.variable ? 'true' : 'false'
			default:
				return 'ERROR!!'
		}
	}
}

class ArrayCodeDefinition extends CodeDefinition {
	constructor(variable, ancestors) {
		super(variable)

		if (this.ancestors == undefined)
			this.ancestors = []
		if (ancestors != undefined)
			this.ancestors.push.apply(ancestors)
		this.ancestors.push(variable)
		this.children = []
		this.addChildren()
	}


	getValueLiteral() {
		var literal = '['
		this.children.forEach((child, index) => {
			if (index > 0)
				literal += ','
			literal += child.getLiteral()
		})
		literal += ']'
		return literal
	}

	addChildren() {
		var upperThis = this
		this.variable.forEach((item) => {
			if (!upperThis.ancestors.includes(item)) {
				upperThis.children.
					push(CodeDefinition.getCodeDefinition(item, upperThis.ancestors))
			}
		})
	}
}

class ObjectCodeDefinition extends CodeDefinition {
	constructor(variable, ancestors, propertyName) {
		super(variable)
		if (this.ancestors == undefined)
			this.ancestors = []
		if (ancestors != undefined)
			this.ancestors.push.apply(ancestors)
		this.ancestors.push(variable)
		this.children = []
		this.addChildren()
	}

	addChildren() {
		var upperThis = this
		var objectProperties = Object.getOwnPropertyNames(this.variable)
		Object.values(this.variable).forEach((item, index) => {
			if (!upperThis.ancestors.includes(item)) {
				upperThis.children.
					push(CodeDefinition.getCodeDefinition(item, upperThis.ancestors, objectProperties[index]))
			}
		})
	}

	getValueLiteral() {
		if (this.variable == null) {
			return 'null'
		}
		if (this.variable == undefined) {
			return 'undefined'
		}

		var literal = '{'
		this.children.forEach((child, index) => {
			if (index > 0)
				literal += ','
			literal += child.getLiteral()
		})
		literal += '}'
		return literal
	}

}

class FunctionCodeDefinition extends CodeDefinition {
	constructor(variable, ancestors, propertyName) {
		super(variable)
	}


	getValueLiteral() {
			return 'function(){}'
	}

}

module.exports = CodeDefinition

