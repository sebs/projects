const fetch = require('node-fetch');
var projects = require('../projects.json');
var stats = require('../stats.json');

const { getHihertoUrl, getDefaultUrl, isHihertoUrl } = require('./url-util.js');

function getUrl(project) {
	let generateUrl = isHihertoUrl(project) ? getHihertoUrl : getDefaultUrl;
	return generateUrl(project);
}

projects = projects.map(project => fetch(getUrl(project)).then(res => res.json()));

const header = `
# Projects on NPM

Downloads last 365 days: ${stats.count}


`;


Promise
	.all(projects)
	.then((packages) =>{
		return packages.map(package => `
## ${package.name}

![npm](https://nodei.co/npm/${package.name}.png?downloads=true&downloadRank=true&stars=true)

${package.description}

* [Project Page](${package.homepage})
* [NPM Package](https://www.npmjs.com/package/${package.name})

`)
	})
	.then(markdown => header+markdown.join(''))
	.then(console.log)