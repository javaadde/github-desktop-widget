const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const AutoLaunch = require("auto-launch");

// Configure auto-launch
const autoLauncher = new AutoLaunch({
  name: "GitHub Widget",
  path: app.getPath("exe"),
});

// Enable auto-launch on first run
autoLauncher.isEnabled().then((isEnabled) => {
  if (!isEnabled) {
    autoLauncher.enable();
    console.log("Auto-launch enabled");
  }
}).catch((err) => {
  console.error("Error checking auto-launch status:", err);
});

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

  // Optional: Add IPC handler to toggle auto-launch from renderer
  ipcMain.handle("toggle-auto-launch", async () => {
    const isEnabled = await autoLauncher.isEnabled();
    if (isEnabled) {
      await autoLauncher.disable();
      return false;
    } else {
      await autoLauncher.enable();
      return true;
    }
  });

  ipcMain.handle("get-auto-launch-status", async () => {
    return await autoLauncher.isEnabled();
  });
}

app.whenReady().then(createWindow);
