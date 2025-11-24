# Onusshar Installers

This document describes the automated installer system for Onusshar v0.3.1+.

## Overview

Starting with v0.3.1, Onusshar provides **easy-to-use installers** for Windows and macOS that automate the entire installation process. No more manual file copying, no more terminal commands!

## For Users

### Windows (.exe)

**Download:** `OnussharSetup-0.3.1-win64.exe`

Just double-click and follow the wizard. The installer automatically:
- ✅ Installs files to Program Files
- ✅ Registers the IME with Windows
- ✅ Adds registry entries for Text Services Framework
- ✅ Creates Start Menu shortcuts
- ✅ Opens Language Settings to add the keyboard
- ✅ Creates uninstaller

**Steps:**
1. Download `OnussharSetup-0.3.1-win64.exe`
2. Double-click the installer
3. Click "Next" → "Install"
4. Click "Finish"
5. Add Onusshar in Language Settings
6. Press Win+Space to switch keyboards

**No Administrator commands needed!** The installer handles everything.

### macOS (.dmg)

**Download:** `Onusshar-0.3.1.dmg`

Just open the DMG and run the installer. The package automatically:
- ✅ Installs to /Library/Input Methods
- ✅ Sets proper permissions (root:wheel, 755)
- ✅ Restarts Input Method server (IMKServer)
- ✅ Displays activation instructions

**Steps:**
1. Download `Onusshar-0.3.1.dmg`
2. Open the DMG
3. Double-click `OnussharInstaller.pkg`
4. Follow the wizard and enter password
5. Add Onusshar in System Settings > Input Sources
6. Press Control+Space to switch input methods

**No terminal commands needed!** The installer handles everything.

### Linux (.tar.gz)

Linux installation remains the same (using setup.py with IBus):

```bash
tar -xzf ibus-onusshar-0.3.1.tar.gz
cd ibus-onusshar
sudo python3 setup.py install
ibus restart
```

## For Developers

### Building Windows Installer

**Prerequisites:**
- Visual Studio 2019+ with C++ tools
- CMake 3.15+
- Inno Setup 6.0+

**Build:**
```cmd
cd windows-ime
build-installer.bat
```

**Output:** `dist/OnussharSetup-0.3.1-win64.exe`

**Details:** See [windows-ime/BUILD.md](windows-ime/BUILD.md)

### Building macOS Installer

**Prerequisites:**
- macOS Monterey 12.0+
- Xcode 13+
- Xcode Command Line Tools

**Build:**
```bash
cd macos-ime
chmod +x build-installer.sh
./build-installer.sh
```

**Output:** `dist/Onusshar-0.3.1.dmg`

**Details:** See [macos-ime/BUILD.md](macos-ime/BUILD.md)

## Installer Components

### Windows Installer

**Technology:** Inno Setup 6

**Files:**
- `windows-ime/installer.iss` - Inno Setup script
- `windows-ime/build-installer.bat` - Build automation
- `windows-ime/BUILD.md` - Detailed build guide

**What it installs:**
- `C:\Program Files\Onusshar\OnussharIME.dll` - Main IME DLL
- `C:\Program Files\Onusshar\assets\` - Icons and resources
- Registry keys for Windows TSF
- Start Menu shortcuts
- Uninstaller

**Registry Keys:**
```
HKLM\SOFTWARE\Microsoft\CTF\TIP\{8B9F6A3C-4D2E-4F1A-9B3C-7E5D8A2F1C9B}
```

**Installer Features:**
- ✨ Modern wizard UI with WizardStyle=modern
- 🔐 Automatic DLL registration (regsvr32)
- 🗑️ Clean uninstallation (removes all files and registry keys)
- 📋 License agreement screen
- 🌍 Multi-language support (English, Bengali)
- ✅ Version checking (requires Windows 10 1809+)
- 🚀 Post-install action: opens Language Settings

### macOS Installer

**Technology:** pkgbuild + productbuild + DMG

**Files:**
- `macos-ime/build-installer.sh` - Complete build automation
- `macos-ime/scripts/postinstall` - Post-installation script
- `macos-ime/BUILD.md` - Detailed build guide

**What it installs:**
- `/Library/Input Methods/Onusshar.app` - Input Method bundle
- Proper permissions (root:wheel, 755)

**Installer Features:**
- 📦 Standard Apple .pkg installer
- 📄 Welcome screen with feature highlights
- 📖 ReadMe with quick start guide
- 🔐 Automatic permission setting
- 🔄 Automatic IMKServer restart
- 💿 Packaged in convenient DMG disk image
- 🖥️ Universal Binary (Intel + Apple Silicon)

## File Sizes

Typical installer sizes:

- **Windows:** ~2-5 MB
- **macOS:** ~3-6 MB
- **Linux:** ~1-2 MB

Sizes include:
- Core transliteration engine
- Dictionary with 1550+ words
- IME bridge code
- Assets and resources

## Distribution Checklist

When releasing a new version:

### 1. Update Version Numbers

- [ ] `windows-ime/installer.iss` - `#define MyAppVersion`
- [ ] `macos-ime/build-installer.sh` - `VERSION=`
- [ ] `package.json` - `"version":`
- [ ] `README.md` - Version badge and download links

### 2. Build Installers

- [ ] Build Windows: `cd windows-ime && build-installer.bat`
- [ ] Build macOS: `cd macos-ime && ./build-installer.sh`
- [ ] Build Linux: `cd linux-ibus && python3 setup.py sdist`

### 3. Test Installers

- [ ] Test Windows on clean Windows 10/11 VM
- [ ] Test macOS on clean macOS 12+ system
- [ ] Test Linux on Ubuntu/Fedora/Debian
- [ ] Verify typing works in multiple applications
- [ ] Test uninstallation (Windows, manual removal on macOS/Linux)

### 4. Code Sign (Optional but Recommended)

- [ ] Sign Windows installer with certificate
- [ ] Sign macOS app with Developer ID
- [ ] Notarize macOS installer with Apple

### 5. Create GitHub Release

```bash
# Tag the release
git tag v0.3.1
git push origin v0.3.1

# Create release with installers
gh release create v0.3.1 \
  windows-ime/dist/OnussharSetup-0.3.1-win64.exe \
  macos-ime/dist/Onusshar-0.3.1.dmg \
  linux-ibus/dist/ibus-onusshar-0.3.1.tar.gz \
  --title "Onusshar v0.3.1 - Easy Installers!" \
  --notes "Release notes here..."
```

### 6. Update Documentation

- [ ] Update README.md download links
- [ ] Update website (if applicable)
- [ ] Post announcement on social media
- [ ] Update any distribution channels

## Troubleshooting

### Windows Issues

**Problem:** "App not trusted" warning

**Solution:** Code sign the installer or users can click "More info" → "Run anyway"

**Problem:** IME doesn't appear in keyboard list

**Solution:** Run as administrator: `regsvr32 "C:\Program Files\Onusshar\OnussharIME.dll"`

### macOS Issues

**Problem:** "App can't be opened because it is from an unidentified developer"

**Solution:**
1. System Settings → Privacy & Security
2. Scroll down to "Security"
3. Click "Open Anyway"

Or notarize the installer with Apple.

**Problem:** Input method doesn't appear

**Solution:**
```bash
sudo killall IMKServer
# Logout and login again
```

### Build Issues

See platform-specific BUILD.md files:
- [windows-ime/BUILD.md](windows-ime/BUILD.md)
- [macos-ime/BUILD.md](macos-ime/BUILD.md)

## Code Signing

### Why Code Sign?

**Benefits:**
- ✅ No security warnings for users
- ✅ Users trust it's from authentic source
- ✅ Required for enterprise distribution
- ✅ Better user experience

### Windows Code Signing

1. **Obtain Certificate:**
   - Purchase from CA (DigiCert, Sectigo, etc.) - $300-500/year
   - Or use free EV certificate if eligible

2. **Sign Installer:**
   ```cmd
   signtool sign /f certificate.pfx /p password /tr http://timestamp.digicert.com /td sha256 /fd sha256 OnussharSetup-0.3.1-win64.exe
   ```

### macOS Code Signing & Notarization

1. **Join Apple Developer Program** - $99/year

2. **Sign App:**
   ```bash
   codesign --deep --force --sign "Developer ID Application: Your Name (TEAMID)" Onusshar.app
   ```

3. **Sign Package:**
   ```bash
   productsign --sign "Developer ID Installer: Your Name (TEAMID)" Onusshar-0.3.1.pkg Onusshar-0.3.1-signed.pkg
   ```

4. **Notarize:**
   ```bash
   xcrun notarytool submit Onusshar-0.3.1.dmg --apple-id your@email.com --team-id TEAMID --wait
   xcrun stapler staple Onusshar-0.3.1.dmg
   ```

## Future Improvements

Planned enhancements for installers:

- [ ] Add code signing to automated build
- [ ] Create Linux .deb and .rpm packages
- [ ] Add silent install mode for enterprise
- [ ] Auto-update mechanism
- [ ] Installer localization (Bengali, Hindi, etc.)
- [ ] Chocolatey package for Windows
- [ ] Homebrew cask for macOS
- [ ] Snap/Flatpak for Linux

## Contributing

To improve the installers:

1. Test on your platform
2. Report issues with detailed steps to reproduce
3. Suggest improvements via issues
4. Submit PRs for installer scripts

**Installer script locations:**
- Windows: `windows-ime/installer.iss`
- macOS: `macos-ime/build-installer.sh`
- Linux: `linux-ibus/setup.py`

## Support

Having installation issues?

1. Check README.md installation section
2. Check platform BUILD.md troubleshooting
3. Check GitHub Issues for similar problems
4. Open new issue with:
   - OS version
   - Installer version
   - Error messages
   - Steps to reproduce

## License

The installers and build scripts are part of Onusshar and licensed under MIT License.

See [LICENSE](LICENSE) file for details.

---

**Built with ❤️ to make Bengali typing accessible to everyone**
