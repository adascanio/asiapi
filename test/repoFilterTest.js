var repositories = require('./source/repos.json');

var _ = require('underscore');
var assert = require('chai').assert;

var testee = require('../repoFilter');

var repos = {};

describe("List Repos filter", function() {

	beforeEach(function(){
		repos = _.clone(repositories);

	});

    it("gets five repos out of many more by default", function() {


   		var ret = testee.filter(repos);
   		assert.equal(ret.length, 5);
    });
  
    it("checks that filtered repositories are sorted by descending size", function() {

    	var ret = testee.filter(repos);
    	assert.isAtLeast(ret[0].size, ret[1].size);
    	assert.isAtLeast(ret[1].size, ret[2].size);
    	assert.isAtLeast(ret[2].size, ret[3].size);
    	assert.isAtLeast(ret[3].size, ret[4].size); 

    });

    it("checks that filters are summarized", function() {
    	var ret = testee.filter({repos : repos, summary : true});
    	assert.isUndefined(ret[0].owner);
    });

    it("gets two repositories out of many more", function() {
    	var ret = testee.filter({repos : repos, top: 2});
    	assert.equal(ret.length, 2);
    });
  
});