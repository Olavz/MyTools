

chrome.tabs.onUpdated.addListener(function(tabId , info) {
    if (info.status == "complete") {
      show_alert();
    }
});

function runFile() {
  chrome.tabs.executeScript(null, {file: "jquery-2.2.4.min.js"});
	chrome.tabs.executeScript(null, {file: "facebook.js"});
}

function show_alert() {
    chrome.tabs.getSelected(null, function(tab) {
        var currentURL = tab.url;
        if(currentURL.indexOf("https://evry.facebook.com") > -1) {
          runFile();
        }
    });
}