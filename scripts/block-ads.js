"use strict";

var Transform = require('stream').Transform;
var URL = require('url');
module.exports = function () {
    function fixPornhub(data) {
        if (data.url.startsWith("https://www.pornhub.com/_xa/ads")) {
            data.url = data.url.replace("www.pornhub.com","localhost:55901")
            data.url = data.url.replace("https","http")
            data.headers.host = "localhost"
        }
        
    }

    return fixPornhub;
};