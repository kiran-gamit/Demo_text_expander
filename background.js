chrome.browserAction.onClicked.addListener(function (tab) {
            alert("Started");
            // chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            // console.log("tabs",tabs);
            // var formFillup='';
            // chrome.storage.sync.get('shortcut',function(obj){
            //     formFillup=obj.shortcut;
            //     chrome.tabs.sendMessage(tabs[0].id,formFillup)
            // });    
            // })         
});

// chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
//     console.log("here calling",tabs[0].url);
// });
chrome.runtime.onMessage.addListener(function(message,sender,sendRequest){
    if (message === "showOptions") {
     window.open(chrome.runtime.getURL(`options.html`));
    }
  });
