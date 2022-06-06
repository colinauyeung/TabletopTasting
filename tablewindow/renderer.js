const remote = require('electron').remote
const windowManager = remote.require('electron-window-manager');

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

windowManager.sharedData.watch("cup887", function(prop, action, newValue, oldValue){
    var cup = document.getElementById("cup887")
    setTranslate(newValue.x, newValue.y, cup);
})

windowManager.sharedData.watch("cup502", function(prop, action, newValue, oldValue){
    var cup = document.getElementById("cup502")
    setTranslate(newValue.x, newValue.y, cup);
})