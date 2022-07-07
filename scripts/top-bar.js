"use strict";

var Transform = require('stream').Transform;

module.exports = function (config) {
    function injectScript(data) {

        if (config.processContentTypes.includes(data.contentType) || !data.contentType) {

            data.stream = data.stream.pipe(
                new Transform({
                    decodeStrings: false,
                    transform: function (chunk, encoding, next) {
                        const replace =
                            `
                            <link rel="stylesheet" type="text/css" href="https://ph.githubraw.com/assets/css/url_form.css">
<div id="hma-top" class="en-sg -with-transition" dir="ltr"><span id="hma-top-hide">Hide</span><span id="hma-top-show">Show</span>
    <form  onsubmit="window.location.href='/proxy/' + document.getElementById('hma-top-input-url').value; return false;" target="_top" novalidate="novalidate" class="hma-top-inner">
        <div class="hma-top-logo-outer"><a href="https://cac.one/" class="hma-top-logo">Web Proxy</a></div>
        <div class="hma-top-close">
            <div class="hma-top-close-icon"></div>
        </div>
        <div class="hma-top-input"><input type="text" id="hma-top-input-url" name="form[url]" required="required"
                                          placeholder="" autocomplete="off" value="https://phimsexthai.net/"><input
                id="hma-top-input-submit" type="submit"></div>
        <div class="hma-top-button-outer"><a href="https://cac.one/" data-role="cta-button" class="hma-top-button">cac.net</a>
        </div>
    </form>
</div>
                            </body>`
                        let updated = chunk
                            .toString();

                        if (updated.indexOf("</body>") != -1) {
                            updated = updated
                                .replace(`</body>`,
                                    replace);
                        }
                        this.push(updated, "utf8");
                        next();
                    },
                })
            );

        }

    }

    return injectScript;
};