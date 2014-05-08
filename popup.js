// triple click
$.event.special.tripleclick = {
    setup: function(data, namespaces) {
        var elem = this, $elem = jQuery(elem);
        $elem.bind('click', jQuery.event.special.tripleclick.handler);
    },

    teardown: function(namespaces) {
        var elem = this, $elem = jQuery(elem);
        $elem.unbind('click', jQuery.event.special.tripleclick.handler)
    },

    handler: function(event) {
        var elem = this, $elem = jQuery(elem), clicks = $elem.data('clicks') || 0;
        clicks += 1;
        if ( clicks === 3 ) {
            clicks = 0;

            // set event type to "tripleclick"
            event.type = "tripleclick";
            
            // let jQuery handle the triggering of "tripleclick" event handlers
            jQuery.event.handle.apply(this, arguments)  
        }
        $elem.data('clicks', clicks);
    }  
};

document.addEventListener('DOMContentLoaded', function () {
    // The url
    var url = $("#url");
    var img = $("#qrcode");
    var love = "susu, I love you~";

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var tablink = tabs[0].url;
        if (typeof tablink === 'undefined') {
            tablink = love;
        }

        url.text(tablink);
        // Generate a QRcode locally
        var qrcode = new QRCode("qrcode", {
            text: tablink,
            width: 256,
            height: 256,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        
        img.bind("tripleclick", function() {
            if (url.text() === love) {
                return;
            }
            url.text(love);
            qrcode.clear();
            qrcode.makeCode(love);
        });
    });
});

