"use strict";

var Transform = require('stream').Transform;
var URL = require('url');
var google_analytics_id = process.env.GA_ID || 'G-N30SHFS6P2';
module.exports = function () {

    function addGa(html) {
        if (google_analytics_id) {
            var ga = [
                `<!-- Global site tag (gtag.js) - Google Analytics --> <script async src='https://www.googletagmanager.com/gtag/js?id=${google_analytics_id}'></script> <script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${google_analytics_id}'); </script>`
                ].join("\n");
            html = html.replace("</body>", ga + "\n\n</body>");
        }
        return html;
    }

    function googleAnalyticsMiddleware(data) {
        if (data.contentType == 'text/html') {

            // https://nodejs.org/api/stream.html#stream_transform
            data.stream = data.stream.pipe(new Transform({
                decodeStrings: false,
                transform: function(chunk, encoding, next) {
                    this.push(addGa(chunk.toString()));
                    next();
                }
            }));
        }
    }

    return googleAnalyticsMiddleware;
};