$(function(){
    jsonObj = [];
    //jsonObj = JSON.parse(window.localStorage.getItem("testObject"));
    let shortcut1  ={};
    chrome.storage.sync.get('shortcut',function(obj){
        console.log("obj out",obj['shortcut']);
        shortcut1=obj['shortcut'];
        const keys = Object.keys(shortcut1);
        console.log("keys",keys);
        var tr='';
        keys.forEach((key, index) => {
            console.log(`${key}: ${shortcut1[key]}`);
            tr += `<tr><td>${key}</td><td>${shortcut1[key]}</td><td style="width:50px;"><button  class="btn btn-info edit"  type="button"  data-key="${key}" data-value="${shortcut1[key]}">Edit</button></td><td style="width:50px;"><button  class="btn btn-danger delete" type="button"  data-key="${key}">Delete</button></td></tr>`;
        });
        $('#tbody').append(tr);
        $(".delete").click(function(){
            var text = $(this).attr("data-key")
            let x  = confirm("Are you sure to delete this tag");
            if(x == true)
            {
                console.log(text);
                console.log(" before shortcut1",shortcut1);
                delete shortcut1[text];
                console.log(" After shortcut1",shortcut1);
                chrome.storage.sync.set({'shortcut':shortcut1});
                location.reload();
            }
          });
          $(".edit").click(function(){
            var text_key = $(this).attr("data-key")
            var text_value = $(this).attr("data-value")
            console.log(text_key);
            console.log(text_value);
            let output = removeCharacter(text_key);
            console.log(`Output is ${output}`);  
            $('#tag').val(output);
            $('#content').val(text_value);
          });     
            function removeCharacter(str){
                let tmp = str.split('');
                return tmp.slice(1).join('');
            } 
    });

    // // onkeydown
    // document.body.addEventListener("focus", getNameAndId, true);
    // function getNameAndId(event) {
    //     var target = event.target;
    //     if(target.tagName && target.id)
    //     {
    //         console.log("kkiru",event.target);
    //     }
    // }
    // // ////
    var availableTags = [
        "@ActionScript","@AppleScript",
    ];
    $( "#tag" ).autocomplete({
        source: availableTags
    });


    $('#save').click(function(){
        chrome.storage.sync.get('shortcut',function(obj){
            shortcut1=obj['shortcut'];
            x = $('#tag').val();
            const regex = new RegExp("/^[A-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]*$/i");
            const found = regex.test(x[0]);
            console.log("found",found);
            console.log("x[0]",x[0]);
            x = '@'+x;
            let y = $('#content').val();
            shortcut1[x] = y;
            console.log("shortcut1",shortcut1);
            chrome.storage.sync.set({'shortcut':shortcut1});
            chrome.storage.sync.get('shortcut',function(obj){
            console.log("obj out",obj);
            });
            $('#tag').val("");
            $('#content').val("");
            location.reload();
        });
    });
    $('#reset').click(function(){
        chrome.storage.sync.set({'shortcut':{}});
        location.reload();
    })
    $('#start').click(function(){
        chrome.storage.sync.set({'inUse':true});
        location.reload();
    })
    $('#stop').click(function(){
        chrome.storage.sync.set({'inUse':false});
        location.reload();
    })

    // document.body.addEventListener("focus", getNameAndId, true);

    // getNameAndId()
    // {
    //     alert("acaling.");
    // }

    // $('#save').click(function(){
    //     if(window.localStorage.getItem("testObject") != null){
    //         console.log(window.localStorage.getItem("testObject"))
    //         jsonObj = JSON.parse(window.localStorage.getItem("testObject"))
           
    //     }
    //     var tag = $('#tag').val();
    //     var content = $('#content').val();
    //     console.log(tag)


    //     if(tag && content){
    //         console.log(content);
    //         tag.trim();
    //         content.trim();
    //         let obj = {
    //             "tag":tag,
    //             "content":content
    //         };

    //         if(jsonObj == null){
    //             jsonObj = [];
    //         }


            
    //         jsonObj.push(obj);
    //         window.localStorage.setItem('testObject',JSON.stringify(jsonObj));     

    //         /*
    //         var length = jsonObj.length;
    //         console.log(length);
    //         for (var i = 0; i <= length; i++) {
                
    //             if(jsonObj == null){
           
    //             }
    //             if (jsonObj[i].tag == obj.tag) {
    //                 alert("Already Exist");
    //                 break
    //             }else{
    //                 jsonObj.push(obj);
    //                 window.localStorage.setItem('testObject',JSON.stringify(jsonObj));
    //             }
    //         }
            
    //         */
        
           
    //        $('#tag').val("");
    //        $('#content').val("")
    //     }
    //     jsonObj = null;
    // });
    
    
});


 