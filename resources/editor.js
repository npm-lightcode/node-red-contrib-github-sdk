import { MultiTypeField } from "./editor-utils.js"

const tokenField = new MultiTypeField(RED, 'token')

RED.nodes.registerType('github-octokit', {
	category: 'github',
	color: '#afb8c1',
	defaults: {
		...tokenField.defaults()
	},
	inputs:1,
	outputs:1,
	icon: "switch",
	label: function() {
		return this.name || "github-octokit";
	},
	oneditprepare: function() {
		tokenField.oneditprepare(this)
	},
	oneditsave: function() {
		tokenField.oneditsave(this)
	},
});

