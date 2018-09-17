class CodeDefinition {


	constructor(variable, ancestors, propertyName, path) {
		this.variable = variable
		

		this.setPropertyName(propertyName)
		this.setPath(path)
		/*console.log('AA')
		console.log(this.path)
		console.log('BB')*/
		this.setAncestors(ancestors)
	}

	setPath(path) {
		if (path == undefined)
			this.path = ''
		else
			this.path = path
		if (this.propertyName != '')
			this.path += '.'+this.propertyName
	}
	
	setPropertyName(propertyName) {
		this.propertyName = ''
		if (propertyName != undefined)
			this.propertyName = propertyName
	}

	setAncestors(ancestors) {
		if (ancestors != undefined)
			this.ancestors = new Map(ancestors)
		else
			this.ancestors = new Map()
		this.ancestors.set(this.variable, this.path)
	}

	static getCodeDefinition(variable, ancestors, propertyName,path) {
		var newCodeDefinition
		if (variable === null) {
			newCodeDefinition = new NullCodeDefinition(variable, ancestors, propertyName, path)
		}
		else {
			
			if (Array.isArray(variable))
				newCodeDefinition = new ArrayCodeDefinition(variable, ancestors, propertyName, path)
			else {
				if (typeof variable == 'object')
					newCodeDefinition = new ObjectCodeDefinition(variable, ancestors, propertyName, path)
				else {
					if (typeof variable == 'function')
						newCodeDefinition = new FunctionCodeDefinition(variable, ancestors, propertyName, path)
					else
						newCodeDefinition = new PrimitiveCodeDefinition(variable, ancestors, propertyName, path)
				}
			}
		}
		return newCodeDefinition
	}

	static getCircularCodeDefinition(variable, ancestors, propertyName, path, duplicateAncestorPath) {
		var newCodeDefinition = new CircularCodeDefinition(variable, ancestors, propertyName, path)
		newCodeDefinition.setDuplicateAncestorPath(duplicateAncestorPath)
		return newCodeDefinition
	}

	getLiteral() {
		var literal = ''
		if (this.propertyName != '')
			literal += this.propertyName + ':'
		return literal += this.getValueLiteral()
	}

	getValueLiteral() { }

	getCircularDefinitions() {
		return []
	}

}

class PrimitiveCodeDefinition extends CodeDefinition {
	constructor(variable, ancestors, propertyName, path) {
		super(variable, ancestors, propertyName, path)
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

class CollectionCodeDefinition extends CodeDefinition{
	constructor(variable, ancestors, propertyName, path) {
		super(variable, ancestors, propertyName, path)
		this.addChildren()
	}

	getCircularDefinitions() {
		var circularDefinitions = []
	
		this.children.forEach((child) => {
			circularDefinitions = circularDefinitions.
				concat(child.getCircularDefinitions())
		})
		return circularDefinitions	
	}
}

class ArrayCodeDefinition extends CollectionCodeDefinition {
	constructor(variable, ancestors, propertyName, path) {
		super(variable, ancestors, propertyName, path)
		this.addChildren()
	}

	getValueLiteral() {
		var literal = '['
		this.children.forEach((child, index) => {
			var childLiteral = child.getLiteral()
			if (childLiteral != '') {
				if (index > 0)
					literal += ','
				literal += childLiteral
			}
		})
		literal += ']'
		return literal
	}

	addChildren() {
		this.children = []
		var upperThis = this
		this.variable.forEach((item,index) => {
			if (!upperThis.ancestors.has(item)) {
				upperThis.children.
					push(CodeDefinition.getCodeDefinition(
						item, upperThis.ancestors, undefined, upperThis.path + '[' + index + ']'))
			}
			else {
				upperThis.children.
					push(CodeDefinition.getCircularCodeDefinition(
						item, upperThis.ancestors, undefined, upperThis.path + '[' + index + ']',upperThis.ancestors.get(item)))
			}
		})
	}

	

	
}


class ObjectCodeDefinition extends CollectionCodeDefinition {
	
	addChildren() {
		this.children = []
		var upperThis = this
		var objectProperties = Object.getOwnPropertyNames(this.variable)
		Object.values(this.variable).forEach((item, index) => {
			if (!upperThis.ancestors.has(item)) {
				upperThis.children.
					push(CodeDefinition.getCodeDefinition(item, upperThis.ancestors, objectProperties[index],upperThis.path))
			}
			else {
				upperThis.children.
					push(CodeDefinition.getCircularCodeDefinition(
						item, upperThis.ancestors, objectProperties[index],this.path,upperThis.ancestors.get(item)))
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
	constructor(variable, ancestors, propertyName, path) {
		super(variable, ancestors, propertyName, path)
	}


	getValueLiteral() {
		return 'function(){}'
	}

}

class NullCodeDefinition extends CodeDefinition {
	constructor(variable, ancestors, propertyName, path) {
		super(variable, ancestors, propertyName, path)
	}


	getValueLiteral() {
		return 'null'
	}

}

class CircularCodeDefinition extends CodeDefinition {
	constructor(variable, ancestors, propertyName, path) {
		super(variable, ancestors, propertyName, path)
	}


	getLiteral() {
		return ''
	}

	getCircularDefinitions() {

		return [this]
	}

	getCircularDefinition(newVariableName) {

		var circularDefinition = newVariableName + this.path + '=' + newVariableName + this.duplicateAncestorPath
		return circularDefinition
	}

	setDuplicateAncestorPath(duplicateAncestorPath) {
		this.duplicateAncestorPath = duplicateAncestorPath
	}

}

module.exports = CodeDefinition

