const fetch = require('node-fetch');
var projects = require('../projects.json');


function fetchProject(project) {
	return fetch(`https://raw.githubusercontent.com/${project}/master/package.json`)
		.then(res => res.json())
}

function fetchStats(projectName, range) {
	return fetch(`https://api.npmjs.org/downloads/point/last-year/${projectName}`)
		.then(res => res.json())
}

const add = (a, b) => a + b

projects = projects.map(project => fetchProject(project));
Promise
	.all(projects) // all projects
	.then(projects=>projects.map(project=>project.name)) // extract the names
	.then(projectNames=>projectNames.map(name=>fetchStats(name))) // get stats for names
	.then(res=>Promise.all(res)) // resolve results
	.then(stats=>stats.map(datum=>datum.downloads)) // only downloads
	.then(stats=>stats.filter(datum=>typeof datum !== 'undefined')) // only download
	.then(downloadCounts=>downloadCounts.reduce(add))
	.then(console.log)
// https://api.npmjs.org/downloads/point/last-week/express/