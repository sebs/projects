const fetch = require('node-fetch');
var projects = require('../projects.json');
var github = require('octonode');
var client = github.client();
projects = projects.map(project => fetch(`https://raw.githubusercontent.com/${project}/master/package.json`).then(res => res.json()));
Promise
	.all(projects)
	.then((packages) =>{
		return packages.map(package => `
# ${package.name}

${package.description}

[Project Page](${package.homepage})

`)
	}).then(markdown => markdown.join('')).then(console.log)