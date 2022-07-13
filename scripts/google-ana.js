"use strict";

var Transform = require('stream').Transform;
var URL = require('url');
var google_analytics_id = process.env.GA_ID || null;
module.exports = function () {

    function addGa(html) {
        if (google_analytics_id) {
            var ga = [
                "<script type=\"text/javascript\">",
                "var _gaq = []; // overwrite the existing one, if any",
                "_gaq.push(['_setAccount', '" + google_analytics_id + "']);",
                "_gaq.push(['_trackPageview']);",
                "(function() {",
                "  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;",
                "  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';",
                "  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);",
                "})();",
                "</script>"
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