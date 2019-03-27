const { app, BrowserWindow } = require('electron')

const path = require("path");
const url = require("url");
const glob = require('glob')
const fs = require('fs');
require('./electron/processes/file-operations');

let win;

function createWindow () {
  let {width, height} = require('electron').screen.getPrimaryDisplay().size
  // Create the browser window.
  win = new BrowserWindow({
    width: width, 
    height: height,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/frontend/assets/logo.png`
  });

  win.maximize()


  win.loadURL(`file://${__dirname}/dist/frontend/index.html`) // Use for production build
  // win.loadURL('http://localhost:4200');

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})
