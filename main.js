const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 340,
    height: 220, // Increased slightly to fit month labels
    frame: false,
    transparent: true,
    resizable: true,
    hasShadow: false,
    skipTaskbar: true,
    minWidth: 200,
    minHeight: 220, // Lock height
    maxHeight: 220, // Lock height
    alwaysOnTop: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);
