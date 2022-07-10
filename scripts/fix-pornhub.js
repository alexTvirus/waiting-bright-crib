"use strict";

var Transform = require('stream').Transform;
var URL = require('url');
module.exports = function () {
    function fixPornhub(data) {
        data.url = decodeURIComponent(data.url)
        var uri = URL.parse(data.url);
        if (uri.hostname == "www.pornhub.com" ) {
            data.url = data.url.replace("www.pornhub.com","localhost:5000")
        }
        
    }

    return fixPornhub;
};