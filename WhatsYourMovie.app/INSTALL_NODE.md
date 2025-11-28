# 📦 Installing Node.js - Step by Step Guide

Node.js is required to run this application. Follow these simple steps to install it.

## Windows Installation

### Method 1: Official Installer (Recommended)

1. **Download Node.js**
   - Go to: https://nodejs.org/
   - You'll see two download buttons:
     - **LTS (Long Term Support)** - Recommended for most users
     - **Current** - Latest features
   - Click the **LTS** button to download

2. **Run the Installer**
   - Find the downloaded file (usually in Downloads folder)
   - File name: `node-v[version]-x64.msi`
   - Double-click to run it

3. **Installation Wizard**
   - Click "Next" on the welcome screen
   - Accept the license agreement
   - Choose installation path (default is fine)
   - **Important**: Make sure "Add to PATH" is checked ✅
   - Click "Next" through the rest
   - Click "Install" (may ask for admin permission)
   - Wait for installation to complete
   - Click "Finish"

4. **Verify Installation**
   - Open Command Prompt or PowerShell
   - Type: `node --version`
   - Press Enter
   - You should see something like: `v20.10.0`
   - Type: `npm --version`
   - You should see something like: `10.2.3`

5. **Restart Your Computer**
   - This ensures PATH is updated properly
   - After restart, open a NEW terminal window

### Method 2: Using Chocolatey (Alternative)

If you have Chocolatey package manager:

```powershell
choco install nodejs-lts
```

### Method 3: Using winget (Windows 11)

```powershell
winget install OpenJS.NodeJS.LTS
```

## macOS Installation

### Method 1: Official Installer

1. Go to: https://nodejs.org/
2. Download the LTS .pkg file
3. Open the downloaded file
4. Follow the installation wizard
5. Verify in Terminal:
   ```bash
   node --version
   npm --version
   ```

### Method 2: Using Homebrew

```bash
brew install node
```

## Linux Installation

### Ubuntu/Debian

```bash
# Update package list
sudo apt update

# Install Node.js
sudo apt install nodejs npm

# Verify
node --version
npm --version
```

### Using NodeSource Repository (Latest Version)

```bash
# Setup repository
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

# Install
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

### Fedora

```bash
sudo dnf install nodejs npm
```

### Arch Linux

```bash
sudo pacman -S nodejs npm
```

## Troubleshooting

### "node is not recognized" (Windows)

**Problem**: After installation, terminal doesn't recognize `node` or `npm`

**Solutions**:
1. **Restart your computer** (simplest solution)
2. **Check PATH manually**:
   - Search "Environment Variables" in Windows
   - Click "Environment Variables" button
   - Under "System variables", find "Path"
   - Click "Edit"
   - Verify this path exists: `C:\Program Files\nodejs\`
   - If not, click "New" and add it
   - Click OK on all windows
   - Restart terminal

3. **Reinstall Node.js**:
   - Uninstall Node.js from Control Panel
   - Restart computer
   - Reinstall from nodejs.org
   - Make sure "Add to PATH" is checked

### Permission Errors (Linux/Mac)

If you get permission errors with npm:

```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile
```

### Version Too Old

If you have an old version of Node.js:

**Windows**:
- Uninstall from Control Panel
- Install latest from nodejs.org

**Mac/Linux**:
```bash
# Using nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts
```

## Verifying Your Installation

After installation, open a **NEW** terminal and run:

```bash
node --version
npm --version
```

You should see version numbers. For example:
```
v20.10.0
10.2.3
```

If you see version numbers, **congratulations!** Node.js is installed correctly! ✅

## What Gets Installed?

- **Node.js**: JavaScript runtime
- **npm**: Package manager (installs libraries)
- **npx**: Package runner (runs one-off commands)

## Next Steps

Once Node.js is installed:

1. Navigate to your WhatsYourMovie.app folder
2. Run `setup.bat` (Windows) to install project dependencies
3. Follow the QUICKSTART.md guide

## Need More Help?

- Official documentation: https://nodejs.org/en/docs/
- npm documentation: https://docs.npmjs.com/
- Node.js installation troubleshooting: https://nodejs.org/en/learn/getting-started/how-to-install-nodejs

---

**Common Questions**

**Q: Which version should I install?**
A: Always choose LTS (Long Term Support) for stability

**Q: Do I need to install npm separately?**
A: No, npm comes with Node.js automatically

**Q: Can I have multiple Node versions?**
A: Yes, using nvm (Node Version Manager)

**Q: Is Node.js safe?**
A: Yes, it's open-source and used by millions of developers

**Q: Does it cost money?**
A: No, Node.js is completely free

---

After installation, return to QUICKSTART.md to continue setting up the app! 🚀

