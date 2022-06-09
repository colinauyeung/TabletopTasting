// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var mediaID = "47d79ebab9517b8f27c35fef1bf86db0e8e28cf8d19c47dc5393cd4d43dc5f40"
var electron = require('electron');

var AR = require("../src/aruco").AR;
var MP = require("../modules/pointmath").MP;
var VI = require("../modules/vision").VI;
const remote = require('electron').remote
const windowManager = remote.require('electron-window-manager');
var des = [0, 0, 1250, 0, 1250, 700, 0, 700];

var vidstream;
var canvas, context, detector;
var firstfind;

var recording = false;
    function toggleRecording(){
    if(recording){
        recording = false;
        document.getElementById("recording").innerHTML = "Record"
        // window.api.stoprecording();
    }
    else{
        recording = true;
        document.getElementById("recording").innerHTML = "Stop"
        startRecording();
    }
}




// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  detector = new AR.Detector({
    dictionaryName: 'ARUCO'
  });
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
})


function startRecording() {
  vidstream = document.getElementById("video");
  canvas.width = parseInt(canvas.style.width);
  canvas.height = parseInt(canvas.style.height);
  console.log("recording started!");
  function errorCallback(e) {
      console.log('Error', e)
  }

  window.navigator.getUserMedia( {
      audio: false,
      video: {
          mandatory: {
              // label: "HD Webcam C615 (046d:082c)"
              chromeMediaSourceId: mediaID,
          }
      }},
  (localMediaStream) => {
    filename = Date.now();
    handleStream(localMediaStream);

  }, errorCallback)

}

function handleStream(stream) {
  const track = stream.getVideoTracks()[0];
  camera = new ImageCapture(track);
  recorder = new MediaRecorder(stream);
  blobs = [];
  recorder.ondataavailable = function(event) {
      blobs.push(event.data);
  };
  recorder.start();
  if ("srcObject" in vidstream) {
      vidstream.srcObject = stream;
  } else {
      vidstream.src = window.URL.createObjectURL(stream);
  }

  requestAnimationFrame(tick);

}

function tick(){
  requestAnimationFrame(tick);
  if (video.readyState === video.HAVE_ENOUGH_DATA){
      VI.snapshot(context);

      var markers = detector.detect(VI.imageData);
      VI.drawCorners(context, markers);
      VI.findcorners(markers);


      if(!firstfind){
          if(VI.allcornersfound()){
              // console.log(boundingmarkers);
              firstfind = true;
          }
      }
      if(VI.allcornersfound()){
          VI.findmainbox();
          // VI.findinterbox();
          VI.drawId(context, markers);
          if(firstfind){
              // console.log(VI.interactionbox);
              markers.push(VI.workingbox);
              // markers.push(VI.interactionbox);
          }
          VI.drawCorners(context, markers); 
          markers.forEach((marker) => {
            if(MP.in_box(marker.corners, VI.workingbox)){
                if(marker.id == 887){
                  let refpoint = MP.findcenter(marker.corners)
                  let point = VI.getRealPos(VI.workingbox.corners, refpoint, des);
                  windowManager.sharedData.set("cup887", {x:point[0], y:point[1], refx:refpoint.x, refy:refpoint.y})
                }
                if(marker.id == 502){
                  let refpoint = MP.findcenter(marker.corners)
                  let point = VI.getRealPos(VI.workingbox.corners, refpoint, des);
                  windowManager.sharedData.set("cup502", {x:point[0], y:point[1], refx:refpoint.x, refy:refpoint.y})
                }
            }
          })
      }
  }
}

function showmedia(){
  console.log(navigator.mediaDevices.enumerateDevices());
}