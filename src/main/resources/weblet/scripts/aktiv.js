/*
*
*
*
*/

var aktivJS_tag = "aktivJS:HCR";
var aktivJS_tag_unsafe = aktivJS_tag + ":XSS";
var aktivJS_worker;
var hcrelems = [];

function main(event) {
    for (var i = 0; i < hcrelems.length; i++) {
        fetchUpdate(hcrelems[i].address, hcrelems[i].element, updateDOM);
    }
}

function activateAktiv(timeout, callback) {
    var codeBlob = new Blob([
        'function timedCount() { postMessage(null); setTimeout("timedCount()", ' + timeout + ');} timedCount()'
    ], { type: 'application/javascript' });

    aktivJS_worker = new Worker(URL.createObjectURL(codeBlob));

    aktivJS_worker.onmessage = function (event) {
        callback(event);
    }
}

function updateDOM(dom, data) {
    if (data === "") {
        dom.innerHTML = "{aktivJS:HCR::404}";
    } else {
        if (dom.getAttribute(aktivJS_tag_unsafe) != null) {
            dom.innerHTML = data;
        } else {
            dom.innerHTML = escapeHTML(data);
        }
    }
}

function fetchUpdate(theUrl, dom, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(dom, xmlHttp.responseText);
    }
    xmlHttp.open("GET", (theUrl + "?_=" + Math.floor(Date.now() / 1000)), true); // true for asynchronous 
    xmlHttp.send(null);
}

function getAktivAttributes() {
    var all = document.getElementsByTagName("*");
    var aktivElements = [];

    for (var i = 0, max = all.length; i < max; i++) {
        if (all[i].getAttribute(aktivJS_tag) != null) {
            aktivElements.push({
                element: all[i],
                address: all[i].getAttribute(aktivJS_tag)
            });
        } else if (all[i].getAttribute(aktivJS_tag_unsafe) != null) {
            console.warn("AktivJS:   " + all[i] + " (id: " + all[i].id + ")" + " is not running in safe mode. This could enable XSS, it is advised that you change the attribute to '" + aktivJS_tag + "'!");
            aktivElements.push({
                element: all[i],
                address: all[i].getAttribute(aktivJS_tag_unsafe)
            });
        }
    }

    return aktivElements;
}

function escapeHTML (unsafe_str) {
    return unsafe_str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#39;')
      .replace(/\//g, '&#x2F;')
}


window.onload = function () {
    activateAktiv(3000, main);
    hcrelems = getAktivAttributes();
    console.log("AktivJS is loaded with the following attribute keyword: '" + aktivJS_tag + "' on " + hcrelems.length + " elements");
}







