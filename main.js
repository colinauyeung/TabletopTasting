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

  var win = windowManager.createNew("Main", "Tabletop", "file://" + __dirname + "/index.html",
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

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) win.open();
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
