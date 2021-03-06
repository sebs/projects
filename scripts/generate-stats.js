const fetch = require('node-fetch');
var projects = require('../projects.json');
const { getHihertoUrl, getDefaultUrl, isHihertoUrl } = require('./url-util.js');

function fetchProject(project) {

	let generateUrl = isHihertoUrl(project) ? getHihertoUrl : getDefaultUrl;
	let url = generateUrl(project);
	return fetch(url)
		.then(res => res.json()).catch(console.error)
}

function fetchStats(projectName, range) {
	return fetch(`https://api.npmjs.org/downloads/point/2012-01-01:2020-12-31/${projectName}`)
		.then(res => res.json()).catch(console.error)
}

const add = (a, b) => a + b

projects = projects.map(project => fetchProject(project));
Promise
	.all(projects) // all projects
	.then(projects=>projects.map(project=>project.name)) // extract the names
	.then(projectNames=>projectNames.map(name=>fetchStats(name))) // get stats for names
	.then(res=>Promise.all(res)) // resolve results
	.then(stats=>stats.map(datum=>datum.downloads)) // only downloads
	.then(stats=>stats.filter(datum=>typeof datum !== 'undefined')) // only downloads with counts
	.then(downloadCounts=>downloadCounts.reduce(add)) // sum all counts
	.then(count=>{ return {count} }) // put the number in a object
	.then(JSON.stringify) // stringify the output
	.then(console.log) // putput the data
	.catch(console.error) // echo error