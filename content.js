let statusCheck = false;
chrome.storage.sync.get('shortcut',function(obj){
    message=obj.shortcut;
    console.log("obj.shortcut;",jQuery.isEmptyObject(message));
    chrome.storage.sync.get('inUse',function(obj){ 
        if(obj.inUse)
        {statusCheck = obj.inUse;}
        console.log("inUse",statusCheck);  
    })
}); 

document.body.addEventListener("focus", getNameAndId, true);
    function getNameAndId(event) 
    {
            var target = event.target;
            console.log("target",target);
            if(statusCheck === true && !jQuery.isEmptyObject(message))
            {
                replacefun(event.target);   
            }
    }

function replacefun(text)
{
            var text = text;
            var availableTags = Object.keys(message);
             $.ui.autocomplete.prototype._renderItem = function (ul, item) {
                return $("<li></li>")
                  .data("item.autocomplete", item)
                  .append($("<a></a>").html(item.label))
                  .appendTo(ul);
              };
              $(document).on("click", ".addStct", function () {
                chrome.runtime.sendMessage("showOptions");
              });
            $(`input`).autocomplete({
                source: availableTags,
                response: function (event, ui) {
                    var val = event.target.value;
                    console.log("event",val);
                    console.log("event d",val[0]);
                    if(val[0] === '@')
                    {
                        if (!ui.content.length) {
                            var noResult = { value:"",label:"No results found",button:true };
                            ui.content.push({
                                label: "<span class='addStct'>Add Shortcut +</span>",
                                button: true
                              });
                        } else {    
                        }
                    }
                },
                select: function (event, ui) {
                    if (ui.item.button) {
                        event.preventDefault();
                    }
                }
            });
            $(`textarea`).autocomplete({
                source: availableTags,
                response: function (event, ui) {
                    var val = event.target.value;
                    console.log("event",val);
                    console.log("event d",val[0]);
                    if(val[0] === '@')
                    {
                        if (!ui.content.length) {
                            var noResult = { value:"",label:"No results found",button:true };
                            ui.content.push({
                                label: "<span class='addStct' style='text-align: left;padding-left: 210px;'>Add Shortcut+</span>",
                                button: true
                              });
                        } else {    
                        }
                    }
                },
                select: function (event, ui) {
                    if (ui.item.button) {
                        event.preventDefault();
                    }
                }
            });

            shortcuts=message;
            var timer = 0;
            var re = new RegExp("\(" + Object.keys(shortcuts).join("|") + ")\\b", "g");
            update = function() {
                re = new RegExp("\(" + Object.keys(shortcuts).join("|") + ")\\b", "g");
                text.value = text.value.replace(re, (match)=> {
                    return shortcuts[match.toLowerCase()];
                });
            }
            text.onkeydown = function() {
                clearTimeout(timer);
                timer = setTimeout(update, 200);
            }
}



