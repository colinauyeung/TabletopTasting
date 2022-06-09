

const remote = require('electron').remote
const windowManager = remote.require('electron-window-manager');
const linkPreviewGenerator = require("link-preview-generator");




function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

async function getlinkpreview(link){
    let bits = link.split(":");
    if(bits.length < 1){
        return null;
    }
    if(bits[0] === "http" || bits[0] == "https"){
        const previewData = await linkPreviewGenerator(link);
        var box = document.createElement("div");
        box.className = "previewbox";
        var image = document.createElement("img");
        image.src = previewData.img;
        image.className = "previewimg";
        var text = document.createElement("div");
        text.className = "previewtext";
        var title = document.createElement("h3");
        title.className = "previewtitle";
        title.innerHTML = previewData.title;
        var description = document.createElement("p");
        description.className = "previewdescription";
        description.innerHTML = previewData.description;

        text.appendChild(title);
        text.appendChild(description);
        box.appendChild(image);
        box.appendChild(text);
        return box;
    }
    return null;
    

}

windowManager.sharedData.watch("cup887", function(prop, action, newValue, oldValue){
    var cup = document.getElementById("cup887")
    let x = newValue.x - 25;
    let y = newValue.y - 25;
    setTranslate(x, y, cup);
})

windowManager.sharedData.watch("cup502", function(prop, action, newValue, oldValue){
    var cup = document.getElementById("cup502")
    let x = newValue.x - 25;
    let y = newValue.y - 25 - (50*1);
    setTranslate(x, y, cup);
})

windowManager.sharedData.watch("chat887", function(prop, action, newValue, oldValue){
    console.log(newValue)
    //broken, need to function async
    getlinkpreview(newValue.message)
    .then(function(preview){
        if(preview != null){
            let text = document.getElementById("text887")
            text.appendChild(preview);
            if(text.childNodes.length > 5){
                text.removeChild(text.firstChild);
            }
        }
    });


})

windowManager.sharedData.watch("chat502", function(prop, action, newValue, oldValue){
    console.log(newValue)
    //broken, need to function async
    getlinkpreview(newValue.message)
    .then(function(preview){
        if(preview != null){
            let text = document.getElementById("text502")
            text.appendChild(preview);
            if(text.childNodes.length > 5){
                text.removeChild(text.firstChild);
            }
        }
    });
})