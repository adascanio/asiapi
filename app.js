var express = require('express');
var util = require('util');
var asiRequester = require('./asiRequester');

var app = express();

var port = process.env.PORT || 8080;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/user/:handle', function (req, res) {

	var handle = req.params.handle;

	var url = util.format('https://api.github.com/users/%s/repos', handle);

	var summary = req.query.summary || 'false';

	asiRequester.get(url, req , { 
		top : req.query.top,
	    summary: summary.toLowerCase() === 'true'
	}).then((ret) =>{
		res.json(ret)
		},
		(ret) => {
			console.log("An error occurred for api: " + url);
			res.json(ret)
	});
  
});

app.listen(port, function () {
  console.log('asiapi listening on port:', port);
});