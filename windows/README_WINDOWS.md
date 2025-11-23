# Onusshar - Windows Build Instructions

This directory contains Windows-specific build configurations and installers for Onusshar.

## Prerequisites

### Development

- Node.js 18 or later
- npm or yarn
- Windows 10/11 (for building)

### Building Installer

- [Inno Setup 6.0+](https://jrsoftware.org/isinfo.php) (for creating .exe installer)

## Building from Source

### 1. Install Dependencies

From the root directory:

```bash
npm install
```

### 2. Build the Application

```bash
# Build core engine
cd core
npm run build
cd ..

# Build Electron app
cd app
npm run build
```

### 3. Package for Windows

```bash
cd app
npm run package:win
```

This creates a distributable package in `app/dist-installers/`.

## Creating Windows Installer

### Using Inno Setup (Recommended)

1. Install [Inno Setup](https://jrsoftware.org/isinfo.php)

2. Build the app first:
   ```bash
   cd app
   npm run package:win
   ```

3. Compile the installer script:
   - Open `windows/installer/setup.iss` in Inno Setup Compiler
   - Click **Build > Compile**
   - Installer will be created in `windows/installer/output/`

### Using electron-builder (Alternative)

The `package:win` script already uses electron-builder to create NSIS installers:

```bash
cd app
npm run package:win
```

Output: `app/dist-installers/Onusshar Setup 0.1.0.exe`

## Installation

### For End Users

1. Download `OnussharSetup-x.x.x-win64.exe`
2. Run the installer
3. Follow the installation wizard
4. Choose installation options:
   - Create desktop shortcut (optional)
   - Launch at startup (recommended)
5. Click Install

### Silent Installation

For automated deployment:

```cmd
OnussharSetup-0.1.0-win64.exe /VERYSILENT /NORESTART
```

## Running Onusshar

After installation:

- **Start Menu**: Search for "Onusshar"
- **Desktop**: Double-click desktop shortcut (if created)
- **System Tray**: Look for Onusshar icon in system tray
- **Hotkey**: Press `Ctrl+Alt+B` to toggle Bengali/English mode

## Uninstallation

### Via Control Panel

1. Open **Settings** > **Apps** > **Apps & features**
2. Find **Onusshar**
3. Click **Uninstall**

### Via Start Menu

1. **Start Menu** > **Onusshar** > **Uninstall Onusshar**

## Troubleshooting

### App Won't Start

- Check if Node.js runtime is installed
- Run as Administrator
- Check Windows Event Viewer for errors

### Hotkey Not Working

- Check if another app is using `Ctrl+Alt+B`
- Open Onusshar settings and change hotkey
- Restart Onusshar

### Missing Dependencies

Reinstall Visual C++ Redistributables:
- [Download from Microsoft](https://aka.ms/vs/17/release/vc_redist.x64.exe)

## Development Mode

To run in development mode:

```bash
cd app
npm run dev
```

This starts the app with hot-reload enabled.

## Building for Distribution

Complete build process:

```bash
# From root directory
npm install
npm run build

# Package for Windows
cd app
npm run package:win

# Create installer (using Inno Setup)
# Open windows/installer/setup.iss and compile
```

## File Locations

### Installation Directory
- Default: `C:\Program Files\Onusshar\`

### User Data
- Settings: `%APPDATA%\Onusshar\config.json`
- Logs: `%APPDATA%\Onusshar\logs\`

## Code Signing (Production)

For production releases, sign the executable:

1. Obtain a code signing certificate
2. Configure in `app/package.json`:
   ```json
   "win": {
     "certificateFile": "path/to/cert.pfx",
     "certificatePassword": "password"
   }
   ```

## System Requirements

- **OS**: Windows 10 (1809+) or Windows 11
- **Architecture**: x64
- **RAM**: 256 MB minimum
- **Disk**: 200 MB free space
- **.NET Framework**: 4.5+ (usually pre-installed)

## Notes

- The app runs in the system tray by default
- First launch may prompt Windows Defender SmartScreen (normal for unsigned apps)
- Firewall rules are not required (app doesn't use network)

## Support

For issues and bug reports, visit:
https://github.com/onusshar/onusshar/issues
