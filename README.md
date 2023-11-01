### Decription

A node for injecting Github Octokit SDK into your flows.

### Usage

Use this node before any function node that would use Github Octokit SDK.

The only parameter needed is your Github API token. It can be provided as text using the `cred` option in the drop down menu, but can also read a variable. The variale is useful if you have multiple `github-octokit` nodes and only want to provide your token :
  - once per flow, using `flow` option
  - once for all your flows, using the `global` option
  - before starting node-red, using the `env` option
  - inject it in a previrous node in your sequence, using the `msg` option
  - any other complex setup using the `expression` option

#### Example

This particular example is using the [secret](https://flows.nodered.org/node/node-red-contrib-secret) node to inject Gihub token into the flow.githubToken variable, that is then read by the github-octokit node.

![Flow](docs/node-options.png?raw=true)

![Flow](docs/example.png?raw=true)

And in importable format:

    [{"id":"89849cc0c5de1efc","type":"tab","label":"Github","disabled":false,"info":"","env":[]},{"id":"b8c6d859c594d82c","type":"group","z":"89849cc0c5de1efc","style":{"stroke":"#999999","stroke-opacity":"1","fill":"none","fill-opacity":"1","label":true,"label-position":"nw","color":"#a4a4a4"},"nodes":["006652cfa210be17","20cf3448de97b082","5f48fa1be6a963e5"],"x":54,"y":19,"w":632,"h":82},{"id":"78bec7def7df0c26","type":"group","z":"89849cc0c5de1efc","style":{"stroke":"#999999","stroke-opacity":"1","fill":"none","fill-opacity":"1","label":true,"label-position":"nw","color":"#a4a4a4"},"nodes":["c92df70ff3d3b651","ef24fa3d4c261348","5d20e90605c9f37f","ab90d61ff64be4d5"],"x":74,"y":139,"w":472,"h":222},{"id":"006652cfa210be17","type":"inject","z":"89849cc0c5de1efc","g":"b8c6d859c594d82c","name":"Startup","props":[],"repeat":"","crontab":"","once":true,"onceDelay":"0.0","topic":"","x":160,"y":60,"wires":[["5f48fa1be6a963e5"]]},{"id":"20cf3448de97b082","type":"function","z":"89849cc0c5de1efc","g":"b8c6d859c594d82c","name":"save to flow.githubToken","func":"flow.set('githubToken', msg.secret)","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":550,"y":60,"wires":[[]]},{"id":"5f48fa1be6a963e5","type":"secret","z":"89849cc0c5de1efc","g":"b8c6d859c594d82c","name":"Github token","x":330,"y":60,"wires":[["20cf3448de97b082"]]},{"id":"c92df70ff3d3b651","type":"inject","z":"89849cc0c5de1efc","g":"78bec7def7df0c26","name":"Every 30 minutes","props":[{"p":"payload"}],"repeat":"","crontab":"*/30 0-23 * * *","once":false,"onceDelay":"300","topic":"","payload":"","payloadType":"date","x":210,"y":180,"wires":[["ab90d61ff64be4d5"]]},{"id":"ef24fa3d4c261348","type":"function","z":"89849cc0c5de1efc","g":"78bec7def7df0c26","name":"Get repositories in npm-ligthcode Github org","func":"msg.payload = await msg.githubOctokit.paginate(\n  'GET /orgs/npm-lightcode/repos'\n)\nreturn msg","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":350,"y":240,"wires":[["5d20e90605c9f37f"]]},{"id":"5d20e90605c9f37f","type":"debug","z":"89849cc0c5de1efc","g":"78bec7def7df0c26","name":"Show output","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":370,"y":320,"wires":[]},{"id":"ab90d61ff64be4d5","type":"github-octokit","z":"89849cc0c5de1efc","g":"78bec7def7df0c26","tokenType":"flow","token":"githubToken","x":430,"y":180,"wires":[["ef24fa3d4c261348"]]}]
