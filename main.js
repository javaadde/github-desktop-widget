const { app, BrowserWindow } = require("electron");
const path = require("path");
const { exec } = require("child_process");

function createWindow() {
  const win = new BrowserWindow({
    width: 300,
    height: 200,
    frame: false,
    transparent: true,
    resizable: false,
    hasShadow: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, "renderer.js"),
    },
  });

  win.loadFile("index.html");

  // ---- THIS PART MAKES THE WINDOW STICK TO THE DESKTOP ----
  win.once("ready-to-show", () => {
    attachToDesktop(win);
  });
}

function attachToDesktop(win) {
  // force Electron window into the Windows wallpaper layer
  exec(`
    powershell -command "
    $progman = (Get-Process explorer).MainWindowHandle
    $hwnd = ${win.getNativeWindowHandle().readInt32LE(0)}
    [void](Add-Type @'
    using System;
    using System.Runtime.InteropServices;
    public class Win32 {
      [DllImport(\\"user32.dll\\")]
      public static extern IntPtr SetParent(IntPtr hWndChild, IntPtr hWndNewParent);
    }
'@)
    [Win32]::SetParent($hwnd, $progman)
    "
  `);
}

app.whenReady().then(createWindow);
