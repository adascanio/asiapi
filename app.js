var express = require('express');
var request = require('request');
var util = require('util');
var repoFilter = require('./repoFilter');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/user/:handle', function (req, res) {

	var handle = req.params.handle;

	var url = util.format('https://api.github.com/users/%s/repos', handle);

	var top = req.query.top || repoFilter.TOP;

	if (top*1 < 0) {
		top = 0;
	}

	var summary = req.query.summary || 'false';


	summary = summary.toLowerCase() === 'true';

	request({headers: {'User-Agent': 'asiapi'}, url: url, json: true}, function(error, response, body) {
		
		if (!error && response.statusCode === 200) {
			var ret = repoFilter.filter(
			{repos : body, 
			top : top, 
			summary : summary});
			
		}
		else {
			ret = body;
		}
		res.json(ret);
	});
  
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});