"use strict";

var Transform = require('stream').Transform;
var URL = require('url');
module.exports = function () {
    function fixPornhub(data) {
        // data.url = decodeURIComponent(data.url)
        var uri = URL.parse(data.url);
        if (uri.hostname == "www.pornhub.com" ) {
            data.url = data.url.replace("https://www.pornhub.com","http://localhost:55901")
        }
        
    }

    return fixPornhub;
};