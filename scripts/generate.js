const fetch = require('node-fetch');
var projects = require('../projects.json');
projects = projects.map(project => fetch(`https://raw.githubusercontent.com/${project}/master/package.json`).then(res => res.json()));
Promise
	.all(projects)
	.then((packages) =>{
		return packages.map(package => `
# ${package.name}

![npm](https://nodei.co/npm/${package.name}.png?downloads=true&downloadRank=true&stars=true)

${package.description}

* [Project Page](${package.homepage})
* [NPM Package](https://www.npmjs.com/package/${package.name})

`)
	})
	.then(markdown => markdown.join(''))
	.then(console.log)