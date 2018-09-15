class CodeDefinition {


	constructor(variable, ancestors, propertyName) {
		this.variable = variable
		this.setAncestors(ancestors)

		this.setPropertyName(propertyName)
	}

	setPropertyName(propertyName) {
		this.propertyName = ''
		if (propertyName != undefined)
			this.propertyName = propertyName
	}

	setAncestors(ancestors) {
		this.ancestors = []
		if (ancestors != undefined) {
			this.ancestors=ancestors.slice()
		}
		this.ancestors.push(this.variable)
	}

	static getCodeDefinition(variable, ancestors, propertyName) {
		var newCodeDefinition
		if (Array.isArray(variable))
			newCodeDefinition = new ArrayCodeDefinition(variable, ancestors, propertyName)
		else {
			if (typeof variable == 'object')
				newCodeDefinition = new ObjectCodeDefinition(variable, ancestors, propertyName)
			else {
				if (typeof variable == 'function')
					newCodeDefinition = new FunctionCodeDefinition(variable, ancestors, propertyName)
				else
					newCodeDefinition = new PrimitiveCodeDefinition(variable, ancestors, propertyName)
			}
		}



		return newCodeDefinition
	}

	getLiteral() {
		var literal = ''
		if (this.propertyName != '')
			literal += this.propertyName + ':'
		return literal += this.getValueLiteral()
	}

	getValueLiteral() { }

}

class PrimitiveCodeDefinition extends CodeDefinition {
	constructor(variable, ancestors, propertyName) {
		super(variable, ancestors, propertyName)
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
	constructor(variable, ancestors, propertyName) {
		super(variable, ancestors, propertyName)

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
		this.children = []
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
		super(variable, ancestors, propertyName)
		this.addChildren()
	}

	addChildren() {
		this.children = []
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
		super(variable, ancestors, propertyName)
	}


	getValueLiteral() {
		return 'function(){}'
	}

}

module.exports = CodeDefinition

