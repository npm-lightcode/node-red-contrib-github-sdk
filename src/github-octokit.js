const { Octokit } = require("@octokit/rest")
const Utils = require("./utils.js")

module.exports = function(RED) {
	function GithubRepoInfoNode(config) {
		RED.nodes.createNode(this, config)
		const node = this
		const utils = new Utils(RED, node)

		this.on('input', async function(msg) {
			try {
				const token = await utils.getProperty(msg, config.token, config.tokenType)
				const octokit = new Octokit({
					auth: token
				})
				msg.githubOctokit = octokit
				node.send(msg)
			} catch (e) {
				node.error(e)
			}
		})
	}
	RED.nodes.registerType("github-octokit", GithubRepoInfoNode)
}
