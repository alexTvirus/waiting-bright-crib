

var url = require('url');
var querystring = require('querystring');
var express = require('express');
var cac = require('./lib/cac.js');
var Transform = require('stream').Transform;

var app = express();

function validateRequest(data) {
	//console.log(data.url)
	//console.log(data.headers)
	
}

var cacConfig = {
    prefix: '/proxy/',
	//host: "www.xvideos.com",
	
	standardMiddleware: true
};



// this line must appear before any express.static calls (or anything else that sends responses)
app.use(cac(cacConfig));

// serve up static files *after* the proxy is run
app.use('/', express.static(__dirname + '/public'));

// this is for users who's form actually submitted due to JS being disabled or whatever
app.get("/no-js", function(req, res) {
    // grab the "url" parameter from the querystring
    var site = querystring.parse(url.parse(req.url).query).url;
    // and redirect the user to /proxy/url
    res.redirect(cacConfig.prefix + site);
});

// for compatibility with gatlin and other servers, export the app rather than passing it directly to http.createServer
module.exports = app;
