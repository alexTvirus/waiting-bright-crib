const nodestatic = require('node-static');
const distFolder = new nodestatic.Server('./public');
var url = require('url');
var querystring = require('querystring');
var express = require('express');
var cac = require('./lib/cac.js');
var Transform = require('stream').Transform;
// const injectScript = require("./scripts/top-bar.js");
const fixUrlOnGlit = require("./scripts/fix-url-on-glit.js");
const fixPornhub = require("./scripts/fix-pornhub.js");
const blockAD = require("./scripts/block-ads.js");
const googleAnalyticsMiddleware  = require("./scripts/google-ana.js");
var app = express();


function validateRequest(data) {
	//console.log(data.url)
	//console.log(data.headers)
	
}

var cacConfig = {
    prefix: '/proxy/',
      requestMiddleware:[
        // blockAD(),
        fixUrlOnGlit(),
        fixPornhub(),
        
    ],
    responseMiddleware: [
        // injectScript({
        //     processContentTypes: ["text/html","text/plain"],
        // })
        // googleAnalyticsMiddleware()
    ],
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

app.get('/form.css', (req, res) => {
  distFolder.serve(req, res, function (err, result) {
            // Fallback for history mode
            if (err !== null && err.status === 404) {
                distFolder.serveFile('/form.css', 200, {}, req, res);
            }
        });
});

app.get('/sw-proxy.js', (req, res) => {
  distFolder.serve(req, res, function (err, result) {
            // Fallback for history mode
            if (err !== null && err.status === 404) {
                distFolder.serveFile('/sw-proxy.js', 200, {}, req, res);
            }
        });
});

// for compatibility with gatlin and other servers, export the app rather than passing it directly to http.createServer
module.exports = app;
