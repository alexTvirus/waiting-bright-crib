"use strict";

var Transform = require('stream').Transform;
var URL = require('url');
module.exports = function () {
    function fixUrlOnGlit(data) {
        data.url = decodeURIComponent(data.url)
        var uri = URL.parse(data.url);
        
        if (uri.protocol == "http:" ) {
            data.url = data.url.replace("http:","http:/")
        }
        if (uri.protocol == "https:" ) {
            data.url = data.url.replace("https:","https:/")
        }
        console.log(data.url)
    }

    return fixUrlOnGlit;
};