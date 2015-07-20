document.addEventListener('DOMContentLoaded', function () {
    // The url
    var url = document.getElementById('url');
    var img = document.getElementById('qrcode');
    var love = 'susu, I love you~';

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var tablink = tabs[0].url;
        if (typeof tablink === 'undefined') {
            tablink = love;
        }

        // Generate a QRcode locally
        var qrcode = new QRCode('qrcode', {
            text: tablink,
            width: 256,
            height: 256,
            colorDark : '#000000',
            colorLight : '#ffffff',
            correctLevel : QRCode.CorrectLevel.H
        });
        
        url.innerText = tablink;
        // triple click
        img.addEventListener('click', function(event) {
            if (event.detail === 3) {
                if (url.innerText === love) {
                    url.innerText = tablink;
                } else {
                    url.innerText = love;
                }
            }
        });
    });
});

