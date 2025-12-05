# How to Make GitHub Widget Auto-Start on Boot

## ✅ Your App is Now Packaged!

Your GitHub widget has been successfully packaged as a standalone executable located at:
```
dist\github-widget-win32-x64\github-widget.exe
```

## 🚀 How to Enable Auto-Start

### Method 1: Run the Executable Once (Automatic)
The easiest way is to simply run the packaged executable:

1. Navigate to: `dist\github-widget-win32-x64\`
2. Double-click `github-widget.exe`
3. The app will automatically enable auto-start on first run!

**That's it!** The app will now start automatically every time you boot your computer or laptop.

---

### Method 2: Create a Shortcut in Startup Folder (Manual)

If you prefer manual control:

1. Press `Win + R` to open Run dialog
2. Type: `shell:startup` and press Enter
3. This opens your Startup folder
4. Create a shortcut to `github-widget.exe` in this folder

---

## 📍 Where is the Executable?

**Full Path:**
```
C:\Users\javaa\OneDrive\Desktop\github-widget\dist\github-widget-win32-x64\github-widget.exe
```

---

## 🔄 To Rebuild the App

If you make changes to your code, rebuild the executable:

```bash
npm run package
```

This will update the executable in the `dist` folder.

---

## ⚙️ How Auto-Launch Works

The app uses the `auto-launch` npm package which:
- Creates a registry entry in Windows: `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run`
- Points to the executable path
- Starts the app automatically when you log into Windows

---

## 🎯 Important Notes

1. **Development vs Production:**
   - `npm start` = Development mode (won't auto-start)
   - `github-widget.exe` = Production mode (will auto-start)

2. **Moving the App:**
   - If you move the `github-widget-win32-x64` folder, you'll need to run the exe once from the new location to update the auto-start path

3. **Disabling Auto-Start:**
   - The app includes IPC handlers to toggle auto-start programmatically
   - Or manually remove from Windows Startup settings

---

## 🎨 Next Steps

You can now:
- ✅ Copy the `dist\github-widget-win32-x64` folder to any location
- ✅ Run `github-widget.exe` to start the widget
- ✅ The widget will auto-start on every boot
- ✅ Works on both your desktop and laptop!

Enjoy your auto-starting GitHub widget! 🎉
