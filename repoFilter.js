
var defaultTop = 5;

var summarizedField = ['id', 'name', 'size', 'html_url'];

var summarize = function (repos) {
	var summarizedRepos = [];
	for(var i= 0, len = repos.length; i < len; i++ ) {
		var sumRepo = {};

		summarizedField.forEach(function(elm){
			sumRepo[elm] = repos[i][elm];
		});
		
		summarizedRepos.push(sumRepo);
	}
	return summarizedRepos;
}

var filterTop = function (repos, top) {
	
	repos.sort(function(a, b) {
    	return parseFloat(b.size) - parseFloat(a.size);
	});

	repos = repos.splice(0, top);

	return repos;
	
}

var filter = function (options) {
	
	var repos = options.repos;

	//0 not allowed
	var top = options.top || defaultTop;

	var repos = filterTop(repos,top);

	if (options.summary) {
		repos  = summarize(repos);
	}

	return repos;
}


module.exports = {
	filter : filter,
	TOP : defaultTop
}
