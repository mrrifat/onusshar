# Onusshar - macOS Build Instructions

This directory contains macOS-specific build configurations and installers for Onusshar.

## Prerequisites

### Development

- macOS Monterey (12.0) or later
- Node.js 18 or later
- Xcode Command Line Tools: `xcode-select --install`

### For Distribution

- Apple Developer account (for code signing and notarization)
- Developer ID Application certificate
- App-specific password for notarization

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

### 3. Package for macOS

```bash
cd app
npm run package:mac
```

This creates:
- `app/dist-installers/mac/Onusshar.app` - Standalone app
- `app/dist-installers/Onusshar-0.1.0.dmg` - DMG installer
- `app/dist-installers/Onusshar-0.1.0-mac.zip` - ZIP archive

## Creating macOS Installer

### Standard DMG (electron-builder)

The `package:mac` script automatically creates a DMG:

```bash
cd app
npm run package:mac
```

Output: `app/dist-installers/Onusshar-0.1.0.dmg`

### Custom DMG (Advanced)

For a custom-styled DMG with background image:

1. Install create-dmg:
   ```bash
   brew install create-dmg
   # or
   npm install -g create-dmg
   ```

2. Run the build script:
   ```bash
   cd macos/installer
   chmod +x build-dmg.sh
   ./build-dmg.sh
   ```

Output: `macos/installer/output/Onusshar-0.1.0.dmg`

## Code Signing & Notarization (Production)

For distribution outside the Mac App Store, you must sign and notarize the app.

### Prerequisites

1. **Join Apple Developer Program** ($99/year)
   - https://developer.apple.com/programs/

2. **Get Developer ID Certificate**
   - Open **Xcode** > **Preferences** > **Accounts**
   - Sign in with Apple ID
   - **Manage Certificates** > **+** > **Developer ID Application**

3. **Create App-Specific Password**
   - Visit https://appleid.apple.com
   - **Sign In** > **App-Specific Passwords**
   - Generate password for "Onusshar Notarization"

### Notarization Process

```bash
cd macos/installer
chmod +x notarize.sh

# Set credentials
export APPLE_ID="your-apple-id@example.com"
export TEAM_ID="YOUR_TEAM_ID"
export APP_PASSWORD="xxxx-xxxx-xxxx-xxxx"

# Run notarization
./notarize.sh
```

This script:
1. Code signs the app
2. Uploads to Apple for notarization
3. Waits for approval (~5-10 minutes)
4. Staples the notarization ticket
5. Verifies the notarized app

## Installation

### For End Users

#### Option 1: DMG Installer (Recommended)

1. Download `Onusshar-0.1.0.dmg`
2. Double-click to mount
3. Drag **Onusshar.app** to **Applications** folder
4. Eject the DMG
5. Open **Applications** > **Onusshar**

#### Option 2: ZIP Archive

1. Download `Onusshar-0.1.0-mac.zip`
2. Extract the archive
3. Move **Onusshar.app** to **Applications** folder
4. Open **Applications** > **Onusshar**

### First Launch

macOS may show a security warning for unsigned apps:

1. **System Preferences** > **Security & Privacy** > **General**
2. Click **"Open Anyway"** next to Onusshar message
3. Or: Right-click app > **Open** > **Open** (bypass Gatekeeper)

*Note: Notarized apps won't show this warning.*

## Running Onusshar

After installation:

- **Applications folder**: Open Onusshar.app
- **Spotlight**: ⌘+Space, type "Onusshar"
- **Menu bar**: Look for Onusshar icon
- **Hotkey**: Press `⌥⌘B` (Option+Command+B) to toggle mode

## Uninstallation

1. Quit Onusshar (Menu bar icon > Quit)
2. Move **Onusshar.app** from Applications to Trash
3. Remove settings (optional):
   ```bash
   rm -rf ~/Library/Application\ Support/Onusshar
   rm -rf ~/Library/Preferences/com.onusshar.keyboard.plist
   ```

## Troubleshooting

### App Won't Open

**"Onusshar.app is damaged and can't be opened"**

This happens with unsigned or improperly downloaded apps:

```bash
xattr -cr /Applications/Onusshar.app
```

**"App is from an unidentified developer"**

Right-click app > **Open** > **Open**

### Hotkey Not Working

1. **System Preferences** > **Security & Privacy** > **Privacy** > **Accessibility**
2. Add **Onusshar** to the list
3. Enable the checkbox
4. Restart Onusshar

### Menu Bar Icon Missing

- Check if "Automatically hide and show the menu bar" is enabled
- Move mouse to top of screen to reveal menu bar
- Or disable in **System Preferences** > **Dock & Menu Bar**

## Development Mode

To run in development mode:

```bash
cd app
npm run dev
```

This starts the app with hot-reload and debugging enabled.

## Building for Distribution

Complete build process for production:

```bash
# From root directory
npm install
npm run build

# Package for macOS
cd app
npm run package:mac

# Code sign and notarize (production only)
cd ../macos/installer
export APPLE_ID="..."
export TEAM_ID="..."
export APP_PASSWORD="..."
./notarize.sh
```

## File Locations

### Application
- App: `/Applications/Onusshar.app`

### User Data
- Settings: `~/Library/Application Support/Onusshar/config.json`
- Logs: `~/Library/Logs/Onusshar/`
- Preferences: `~/Library/Preferences/com.onusshar.keyboard.plist`

## System Requirements

- **OS**: macOS Monterey (12.0) or later
- **Architecture**: Universal (Intel + Apple Silicon)
- **RAM**: 256 MB minimum
- **Disk**: 150 MB free space

## Universal Binary (Intel + Apple Silicon)

The app is built as a universal binary by default (configured in `app/package.json`):

```json
"mac": {
  "target": ["dmg", "zip"],
  "arch": ["x64", "arm64"]
}
```

To build for specific architecture only:

```bash
# Intel only
npm run package:mac -- --x64

# Apple Silicon only
npm run package:mac -- --arm64
```

## Permissions

Onusshar may request these permissions:

- **Accessibility**: Required for global hotkey functionality
  - Grant in: **System Preferences** > **Security & Privacy** > **Privacy** > **Accessibility**

No other permissions are required.

## Mac App Store (Future)

To distribute via Mac App Store:

1. Create app-specific bundle ID in App Store Connect
2. Update `package.json` with App Store provisioning
3. Build with Mac App Store target:
   ```bash
   electron-builder --mac mas
   ```
4. Upload to App Store Connect
5. Submit for review

*Note: This is planned for future releases.*

## Support

For issues and bug reports, visit:
https://github.com/onusshar/onusshar/issues
