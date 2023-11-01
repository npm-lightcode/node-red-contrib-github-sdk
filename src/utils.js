class Utils {
	constructor(RED, node) {
		this.RED = RED
		this.node = node
	}
	async getProperty(msg, property, propertyType) {
		return new Promise((resolve, reject) => {
			if (this.node.propertyType === 'jsonata') {
				this.RED.util.evaluateJSONataExpression(property, msg, (err,value) => {
					if (err) {
						reject(err)
					} else {
						resolve(value)
					}
				})
			} else {
				console.log(property,propertyType, this.node)
				this.RED.util.evaluateNodeProperty(property, propertyType, this.node, msg, (err,value) => {
					if (err || value === undefined) {
						reject(new Error(`Unable to resolve ${propertyType}.${property}`))
					} else {
						resolve(value)
					}
				})
			}
		})
	}
}

module.exports = Utils
