
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
	
	var opt = normalizeFilterInput(options);

	var top = defaultTop;
	
	//top <=0 not allowed
	if (options.top && options.top > 0) {
		top = options.top;
	}

	var repos = filterTop(opt.repos,top);

	if (options.summary ) {
		repos  = summarize(repos);
	}

	return repos;
}

var normalizeFilterInput = function (options) {
	var opt = {};


	if (options instanceof Array) {
		opt.repos = options;
		opt.summary = false;
		opt.top = defaultTop;
	}
	else if (options instanceof Object) {
		opt.repos = options.repos;
		opt.summary = options.summary;

		//0 is not allowed
		opt.top = options.top || defaultTop;
	}

	return opt;
}


module.exports = {
	filter : filter,
	TOP : defaultTop
}
