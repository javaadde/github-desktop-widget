<div align="center">

# 📊 GitHub Contribution Widget

**A beautiful desktop widget to display your GitHub contribution graph on Windows**

![Widget Preview](/asset/Screenshot.png)

[![Download](https://img.shields.io/badge/Download-Latest%20Release-brightgreen?style=for-the-badge)](/asset/github-widget%20Setup%201.0.0.exe)
[![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)](/releases/download/v.1.0.0/github-widget%20Setup%201.0.0.exe)
[![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)](LICENSE)

</div>

---

## ✨ Features

- 🎨 **Beautiful UI** - Sleek dark theme with GitHub-style contribution graph
- 📅 **Full Year View** - Scroll through your entire year of contributions
- 🔄 **Auto-Refresh** - Updates your contribution data every hour
- 🖱️ **Interactive** - Hover over any day to see detailed contribution count
- 📌 **Always Accessible** - Sits on your desktop, draggable anywhere
- ⚡ **Lightweight** - Only 77 MB installer, minimal system resources
- 🚀 **Auto-Start** - Optionally launches on Windows startup

---

## 📥 Download & Installation

### Step 1: Download
Click the button below to download the installer:

**[⬇️ Download GitHub Widget Setup (77 MB)](/releases/download/v.1.0.0/github-widget%20Setup%201.0.0.exe)**

### Step 2: Install
1. Run `github-widget Setup 1.0.0.exe`
2. Windows SmartScreen may appear - click "More info" → "Run anyway" (the app is safe, just unsigned)
3. Follow the installation wizard:
   - Choose installation directory (default recommended)
   - Select "Create desktop shortcut" if you want quick access
   - Click "Install"

### Step 3: Setup Your Username
1. When you first launch the widget, you'll see a setup modal
2. Enter your GitHub username (e.g., `octocat`)
3. Click "Save"
4. Your contribution graph will load automatically! 🎉

---

## 🎮 How to Use

### Basic Usage
- **Move the Widget**: Click and drag the top handle (⋮⋮) to reposition
- **Scroll Through History**: Use horizontal scrolling to view the entire year
- **View Details**: Hover over any square to see contribution count and date
- **Resize**: Drag from the edges to make the widget wider or narrower

### Settings Menu
Click the ⚙️ icon in the top-right corner to:
- **Change Username**: Switch to a different GitHub account
- **Close Widget**: Exit the application

### Auto-Start
The widget is configured to automatically start when Windows boots. You can disable this in:
- Windows Settings → Apps → Startup → GitHub Widget (toggle off)

---

## 🖥️ System Requirements

- **OS**: Windows 10 or Windows 11 (64-bit)
- **RAM**: 100 MB minimum
- **Disk Space**: 200 MB (for installation)
- **Internet**: Required to fetch contribution data

---

## 🛠️ Building from Source

If you want to build the widget yourself:

```bash
# Clone the repository
git clone https://github.com//javaadde/github-desktop-widget.git
cd github-widget

# Install dependencies
npm install

# Run in development mode
npm start

# Build installer
npm run build
```

The installer will be created in the `build_output` folder.

---

## 🐛 Troubleshooting

### Widget not loading data?
- Make sure you entered the correct GitHub username (case-sensitive)
- Check your internet connection
- Try changing the username in Settings and re-entering it

### Widget disappeared?
- The widget may be off-screen if you use multiple monitors
- Close and relaunch the app to reset position

### Windows SmartScreen warning?
- This is normal for unsigned applications
- Click "More info" → "Run anyway" to proceed safely

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features or find bugs:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License 
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)



This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💖 Support

If you find this widget useful, consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📢 Sharing with fellow developers

---

<div align="center">

**Made with ❤️ for developers who love tracking their progress**

[Report Bug](https://github.com//javaadde/github-desktop-widget/issues) · [Request Feature](https://github.com//javaadde/github-desktop-widget/issues)

</div>
