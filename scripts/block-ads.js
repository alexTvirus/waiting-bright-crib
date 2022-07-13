"use strict";

var Transform = require('stream').Transform;
var URL = require('url');
module.exports = function () {
    function blockAD(data) {
        if (data.url.startsWith("https://www.pornhub.com/_xa/ads")) {
            console.log(data.url)
            data.clientResponse.status(200).send("");
        }
        
    }

    return blockAD;
};