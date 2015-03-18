function stopNote() {
	chrome.notifications.clear('notif1', function(id) { console.log("Last error:", chrome.runtime.lastError); });
	
}

function notif() {
	var opt = {
		type: "basic",
		title: "Raspberry Pi",
		message: "The link should be successfully sent to the Raspberry Pi ! Please wait ~ 15/20 seconds. If it doesn't works, please make sure the ip/ports are corrects, and the server is running.",
		iconUrl: "48.png"
	};

	chrome.notifications.create('notif1', opt, function(id) { console.log("Last error:", chrome.runtime.lastError); });

	setTimeout(stopNote, 4000);
		
}

chrome.contextMenus.onClicked.addListener(function(info) {	
	try {
		var url_encoded_url = encodeURIComponent(info.linkUrl);
		var newURL = "http://"+localStorage.raspip+":2020/"+localStorage.cmFunction+"?url=" + url_encoded_url;

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", newURL, true);
		xmlHttp.send();
		notif();
	} 
	catch(err) {
		alert('Error while trying to send the video to the Raspberry Pi. Please make sure the ip/port are corrects, and the server is running.');
		
	}
});

chrome.runtime.onInstalled.addListener(function() {
	chrome.tabs.create({url: "../options.html"});
	chrome.contextMenus.create({
		id: "Castnow",
		title: "Send to Rpi",
		contexts: ["link"]
	});
});

