"use strict";

var Transform = require('stream').Transform;
var URL = require('url');
module.exports = function () {
    function blockAD(data) {
        if (data.url.includes("/www.pornhub.com/_xa/ads")) {
            data.clientResponse.status(200).send("");
        }
        
    }

    return blockAD;
};