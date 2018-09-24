const fetch = require('node-fetch');
var projects = require('../projects.json');
projects = projects.map(project => fetch(`https://raw.githubusercontent.com/${project}/master/package.json`).then(res => res.json()));