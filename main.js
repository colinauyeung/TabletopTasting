//Environment Variables
require('dotenv').config()
const tmi = require('tmi.js');
// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const windowManager = require('electron-window-manager');
const path = require('path')

function createWindow () {
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


  windowManager.init({
    'onLoadFailure': function(window){
        console.log('Cannot load the requested page!');
    }
  });

  windowManager.sharedData.set("cup887", {"x": 0, "y":0})
  windowManager.sharedData.set("cup887", {"x": 0, "y":0})
  windowManager.sharedData.set("chat887", {name:"blah", message:"blah"});
  windowManager.sharedData.set("chat502", {name:"blah", message:"blah"});

  var win = windowManager.createNew("Main", "Control", "file://" + __dirname + "/control_window/index.html",
  false, {
    'width': 1400,
    'height': 800,
    resizable: true,
    'webPreferences': {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        preload:path.join(__dirname, 'preload.js')
    }
  });
  win.open();

  var win2 = windowManager.createNew("Tabletop", "Tabletop", "file://" + __dirname + "/tablewindow/index.html",
  false, {
    'width': 1400,
    'height': 800,
    resizable: true,
    'webPreferences': {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        preload:path.join(__dirname, 'preload.js')
    }
  });
  win2.open();

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
      username: 'daisuketestbot',
      password: process.env.OAUTH
    },
    channels: ['daisuketestbot']
  });

  client.connect();

  client.on('message', (channel, tags, message, self) => {
    // Ignore echoed messages.
    if(self) return;
    let bits = message.split(" ");
    if(bits.length > 0){
      if(bits[0].toLowerCase() === '!a') {
        windowManager.sharedData.set("chat887", {name:tags.username, message:message});
        // client.say(channel, `@${tags.username}, Yo what's up`);
  
      }
      if(bits[0].toLowerCase() === "!b"){
        windowManager.sharedData.set("chat502", {name:tags.username, message:message});
      }
    }
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



