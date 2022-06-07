const remote = require('electron').remote
const windowManager = remote.require('electron-window-manager');

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
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
    let text = document.getElementById("text887")
    let kid = document.createElement("div");
    let s1 = document.createElement("span");
    s1.className = "username";
    s1.innerHTML = newValue.name;
    let s2 = document.createElement("span");
    s2.className = "messagetext";
    s2.innerHTML = ": " + newValue.message;
    kid.appendChild(s1);
    kid.appendChild(s2);
    text.appendChild(kid);
    if(text.childNodes.length > 5){
        text.removeChild(text.firstChild);
    }
})

windowManager.sharedData.watch("chat502", function(prop, action, newValue, oldValue){
    console.log(newValue)
    let text = document.getElementById("text502")
    let kid = document.createElement("div");
    let s1 = document.createElement("span");
    s1.className = "username";
    s1.innerHTML = newValue.name;
    let s2 = document.createElement("span");
    s2.className = "messagetext";
    s2.innerHTML = ": " + newValue.message;
    kid.appendChild(s1);
    kid.appendChild(s2);
    text.appendChild(kid);
    if(text.childNodes.length > 5){
        text.removeChild(text.firstChild);
    }
})