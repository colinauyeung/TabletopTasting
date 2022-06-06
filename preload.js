// const {
//   contextBridge,
//   ipcRenderer
// } = require("electron");

// var AR = require("./src/aruco").AR;
// var MP = require("./modules/pointmath").MP;
// var VI = require("./modules/vision").VI;

// var vidstream;
// var canvas, context, detector;
// var firstfind;

// // All of the Node.js APIs are available in the preload process.
// // It has the same sandbox as a Chrome extension.
// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }

//   for (const type of ['chrome', 'node', 'electron']) {
//     replaceText(`${type}-version`, process.versions[type])
//   }

//   detector = new AR.Detector({
//     dictionaryName: 'ARUCO'
//   });
//   canvas = document.getElementById("canvas");
//   context = canvas.getContext("2d");
// })

// function startRecording() {
//   vidstream = document.getElementById("video");

//   canvas.width = parseInt(canvas.style.width);
//   canvas.height = parseInt(canvas.style.height);
//   console.log("recording started!");
//   function errorCallback(e) {
//       console.log('Error', e)
//   }


//   window.navigator.getUserMedia( {
//       audio: false,
//       video: {
//           mandatory: {
//               // label: "HD Webcam C615 (046d:082c)"
//               chromeMediaSourceId: '955183132d42fc09e7fd3f239f3cd3e81ff097f641fa41f1f60dd2c9cb2860b0',
//           }
//       }},
//   (localMediaStream) => {
//     filename = Date.now();
//     handleStream(localMediaStream);

//   }, errorCallback)

// }

// function handleStream(stream) {
//   const track = stream.getVideoTracks()[0];
//   camera = new ImageCapture(track);
//   recorder = new MediaRecorder(stream);
//   blobs = [];
//   recorder.ondataavailable = function(event) {
//       blobs.push(event.data);
//   };
//   recorder.start();
//   if ("srcObject" in vidstream) {
//       vidstream.srcObject = stream;
//   } else {
//       vidstream.src = window.URL.createObjectURL(stream);
//   }

//   requestAnimationFrame(tick);

// }

// function tick(){
//   requestAnimationFrame(tick);
//   if (video.readyState === video.HAVE_ENOUGH_DATA){
//       VI.snapshot(context);

//       var markers = detector.detect(VI.imageData);
//       VI.drawCorners(context, markers);
//       VI.findcorners(markers);


//       if(!firstfind){
//           if(VI.allcornersfound()){
//               // console.log(boundingmarkers);
//               firstfind = true;
//           }
//       }
//       if(VI.allcornersfound()){
//           console.log("Found all corners!");
//           VI.findmainbox();
//           // VI.findinterbox();
//           VI.drawId(context, markers);
//           if(firstfind){
//               // console.log(VI.interactionbox);
//               markers.push(VI.workingbox);
//               // markers.push(VI.interactionbox);
//           }
//           VI.drawCorners(context, markers);    
//       }
//   }
// }

// contextBridge.exposeInMainWorld(
//   "api", {
//       send: (channel, data) => {
//           // whitelist channels
//           let validChannels = ["toMain"];
//           if (validChannels.includes(channel)) {
//               ipcRenderer.send(channel, data);
//           }
//       },
//       receive: (channel, func) => {
//           let validChannels = ["fromMain"];
//           if (validChannels.includes(channel)) {
//               // Deliberately strip event as it includes `sender`
//               ipcRenderer.on(channel, (event, ...args) => func(...args));
//           }
//       },
//       // record: () => {
//       //     startRecording();
//       //     setTimeout(function() { stopRecording() }, 30000);
//       // },
//       recordAuto: () => {
//         startRecording();
//       },
//       stoprecording: () => {
//         var a = 1;
//       }

//   }
// );