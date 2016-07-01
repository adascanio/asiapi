var request = require("request");
var repoFilter = require('./repoFilter');
var util = require('util');


function get (url, req, params) {

	return new Promise((success, reject) => {
		request({headers: {'User-Agent': 'asiapi'}, url: url, json: true}, (error, response, body) => {
		
			console.log(util.format('request from ', req.headers.host));

		    var ret;
			if (!error && response.statusCode === 200) {
				ret = repoFilter.filter(
				{repos : body, 
				top : params.top, 
				summary : params.summary});

				success(ret);
				
			}
			else {
				console.error("something went wrong");
				ret = body;
				reject(ret)
			}
			
		});
	});
	
}

module.exports = {
	get : get
}