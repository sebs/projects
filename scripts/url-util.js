
function getHihertoUrl(project) {
	let folder = project.replace('@hiherto-elements/', '');
	project = '@hiherto-elements/es-next-modules/master/' + folder;
	return `https://raw.githubusercontent.com/hiherto-elements/es-next-modules/master/packages/${folder}/package.json`;
}

function getDefaultUrl(project) {
	return `https://raw.githubusercontent.com/${project}/master/package.json`;
}

function isHihertoUrl(project) {
	return project.match('@hiherto-elements');
}

module.exports = {
	getHihertoUrl,
	getDefaultUrl,
	isHihertoUrl
}

