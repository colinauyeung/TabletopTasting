//Environment Variables
require('dotenv').config()
const tmi = require('tmi.js');
// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const windowManager = require('electron-window-manager');
const path = require('path')
var flip = true;

var localchannels = ["jinnytty", "ironmouse", "sinder", "hasanabi", "lirik","jynxzi"]


function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  app.allowRendererProcessReuse = false;
  // createWindow()

  console.log('Version: ' + process.versions.node);

  windowManager.init({
    'onLoadFailure': function (window) {
      console.log('Cannot load the requested page!');
    }
  });

  windowManager.sharedData.set("cup887", { "x": 0, "y": 0, refx: 0, refy: 0 });
  windowManager.sharedData.set("cup502", { "x": 0, "y": 0, refx: 0, refy: 0 });
  windowManager.sharedData.set("cup740", { "x": 0, "y": 0, refx: 0, refy: 0 });
  windowManager.sharedData.set("cup53", { "x": 0, "y": 0, refx: 0, refy: 0 });
  windowManager.sharedData.set("cup183", { "x": 0, "y": 0, refx: 0, refy: 0 });
  windowManager.sharedData.set("cup990", { "x": 0, "y": 0, refx: 0, refy: 0 });
  windowManager.sharedData.set("chat887", { name: "blah", message: "blah" });
  windowManager.sharedData.set("chat502", { name: "blah", message: "blah" });
  windowManager.sharedData.set("chat740", { name: "blah", message: "blah" });
  windowManager.sharedData.set("chat53", { name: "blah", message: "blah" });
  windowManager.sharedData.set("chat183", { name: "blah", message: "blah" });
  windowManager.sharedData.set("chat990", { name: "blah", message: "blah" });

  var win = windowManager.createNew("Main", "Control", "file://" + __dirname + "/control_window/index.html",
    false, {
    'width': 1400,
    'height': 800,
    resizable: true,
    'webPreferences': {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  win.open();

  var win2 = windowManager.createNew("Tabletop", "Tabletop", "file://" + __dirname + "/tablewindow/index.html",
    false, {
    'width': 1280,
    'height': 720,
    resizable: true,
    'webPreferences': {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win2.open();
  win2.object.setAlwaysOnTop(true, level = "status");

  // var win3 = windowManager.createNew("Tabletop2", "Tabletop", "file://" + __dirname + "/tablewindow2/index.html",
  //   false, {
  //   'width': 1280,
  //   'height': 720,
  //   resizable: true,
  //   'webPreferences': {
  //     nodeIntegration: true,
  //     contextIsolation: false,
  //     enableRemoteModule: true,
  //     preload: path.join(__dirname, 'preload.js')
  //   }
  // });

  // win3.open();
  // win3.object.setAlwaysOnTop(true, level = "status");

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) win.open();
  })

  //Twitch controls
  const client = new tmi.Client({
    options: { debug: true },
    connection: {
      secure: true,
      reconnect: true
    },
    identity: {
      username: 'icosah',
      password: process.env.OAUTH
    },
    channels: localchannels
  });

  client.connect();

  client.on('message', (channel, tags, message, self) => {
    // Ignore echoed messages.
    if (self) return;
    // console.log(message);
    // if(channel===localchannels[0]){
    //   windowManager.sharedData.set("chat887", {name:tags.username, message:message});
    //   return
    // }
    // if(channel===localchannels[1]){
    //   windowManager.sharedData.set("chat502", {name:tags.username, message:message});
    //   return
    // }
    // if(channel===localchannels[2]){
    //   windowManager.sharedData.set("chat740", {name:tags.username, message:message});
    //   return
    // }
    // if(channel===localchannels[3]){
    //   windowManager.sharedData.set("chat53", {name:tags.username, message:message});
    //   return
    // }
    // if(channel===localchannels[4]){
    //   windowManager.sharedData.set("chat183", {name:tags.username, message:message});
    //   return
    // }
    // if(channel===localchannels[5]){
    //   windowManager.sharedData.set("chat990", {name:tags.username, message:message});
    //   return
    // }
  
    
  
   
    //Code if I want to run it on a random chat
    // if(flip){
    //   windowManager.sharedData.set("chat887", {name:tags.username, message:message});
    //   flip = !flip
    // }
    // else{
    //   windowManager.sharedData.set("chat502", {name:tags.username, message:message});
    //   flip = !flip
    // }
    // let bits = message.split(" ");
    // if (bits.length > 1) {
    //   if (bits[0].toLowerCase() === '!a') {
    //     windowManager.sharedData.set("chat887", { name: tags.username, message: bits[1] });
    //     // client.say(channel, `@${tags.username}, Yo what's up`);

    //   }
    //   if (bits[0].toLowerCase() === "!b") {
    //     windowManager.sharedData.set("chat502", { name: tags.username, message: bits[1] });
    //   }
    // }
  });
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


const WebSocket = require('ws');

const ws = new WebSocket("ws://localhost:8080");
// const wss = new WebSocket.Server({ port: 8080 });
const clients = new Map();

let poll = false;
var votesA = 0;
var votesB = 0;
var votesC = 0;
var votesD = 0;
var votesE = 0;
var votesF = 0;


ws.addEventListener("open", () => {
    console.log("We are connected");
});

ws.addEventListener('message', function (event) {
  var data = event.data
  console.log(data)
  // console.log("type:" + data + " " + typeof (data))
  var object = JSON.parse(data);
  console.log('received: ' + object.username);
  if (object.channel == "a") {
    if(poll == true){
      votesA++;
      windowManager.sharedData.set("votesA", { votes: votesA });
    }
    windowManager.sharedData.set("chat887", { name: object.username, message: object.content });
    
  } else if (object.channel == "b") {
    if(poll == true){
      votesB++;
      windowManager.sharedData.set("votesB", { votes: votesB });
    }

    windowManager.sharedData.set("chat502", { name: object.username, message: object.content });
    
  } else if (object.channel == "c") {
    if(poll == true){
      votesC++;
      windowManager.sharedData.set("votesC", { votes: votesC });
    }

    windowManager.sharedData.set("chat740", { name: object.username, message: object.content });
   
  } else if (object.channel == "d") {
    if(poll == true){
      votesD++;
      windowManager.sharedData.set("votesD", { votes: votesD });
    }

    windowManager.sharedData.set("chat53", { name: object.username, message: object.content });
    
  } else if (object.channel == "e") {
    if(poll == true){
      votesE++;
      windowManager.sharedData.set("votesE", { votes: votesE });
    }

    windowManager.sharedData.set("chat183", { name: object.username, message: object.content });
    
  } else if (object.channel == "f") {
    if(poll == true){
      votesF++;
      windowManager.sharedData.set("votesF", { votes: votesF });
    }

    windowManager.sharedData.set("chat990", { name: object.username, message: object.content });
    
  } 


  if (object.content == "!poll") {
    poll = true;
    console.log("Poll started")
  }
});

