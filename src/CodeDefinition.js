class CodeDefinition {
	
	
	constructor(variable, ancestors) {
		this.variable = variable
		if (this.ancestors == undefined)
			this.ancestors = [variable]
		else
			this.ancestors.push(variable)
		this.children = []
		if (Array.isArray(this.variable))
			this.addChildrenArray()
	}


	addChildrenArray() {
		var upperThis = this
		this.variable.forEach((item, index) => {
			if (!upperThis.ancestors.includes(item)) {
				this.children.
					push(new CodeDefinition(item, upperThis.ancestors))
			}
		})
	}
	


	getLiteralArray() {
		var literal = '['
		this.children.forEach((child, index)=>{
			if (index > 0)
				literal += ','
			literal += child.getLiteral()
		})
		literal += ']'
		return literal
	}


	getLiteral() {
		if (Array.isArray(this.variable))
			return this.getLiteralArray()
		else {
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
}

module.exports = CodeDefinition

