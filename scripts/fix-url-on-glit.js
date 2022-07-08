"use strict";

var Transform = require('stream').Transform;
var url = require('url');
module.exports = function () {
    return function FixUrlOnGlit(data) {
        data.url = decodeURIComponent(data.url)
        var uri = URL.parse(data.url);
        if (uri.protocol == "http:" ) {
            data.url = data.url.replace("http:","http:/")
        }
        if (uri.protocol == "https:" ) {
            data.url = data.url.replace("https:","https:/")
        }
    };

    return FixUrlOnGlit;
};