# Building Onusshar Windows Installer

This guide explains how to build the Onusshar Windows installer from source.

## Prerequisites

### Required Software

1. **Visual Studio 2019 or later** with C++ development tools
   - Download: https://visualstudio.microsoft.com/downloads/
   - Required components:
     - Desktop development with C++
     - Windows 10 SDK (10.0.17763.0 or later)
     - MSVC v142 or later

2. **CMake 3.15 or later**
   - Download: https://cmake.org/download/
   - Add to PATH during installation

3. **Inno Setup 6.0 or later**
   - Download: https://jrsoftware.org/isdl.php
   - Use default installation path: `C:\Program Files (x86)\Inno Setup 6\`

4. **Node.js 18 or later** (for dictionary dependency)
   - Download: https://nodejs.org/

### System Requirements

- Windows 10 (1809+) or Windows 11
- x64 processor
- 4 GB RAM minimum
- 2 GB free disk space for build

## Build Steps

### Option 1: Automated Build (Recommended)

Run the automated build script:

```cmd
cd windows-ime
build-installer.bat
```

This will:
1. Configure the project with CMake
2. Build the IME DLL with MSBuild
3. Create the installer with Inno Setup
4. Output: `dist/OnussharSetup-0.3.1-win64.exe`

### Option 2: Manual Build

#### Step 1: Install Dependencies

```cmd
cd ..
npm install
cd windows-ime
```

#### Step 2: Configure CMake

```cmd
cmake -B build -S . -G "Visual Studio 16 2019" -A x64
```

Or for Visual Studio 2022:
```cmd
cmake -B build -S . -G "Visual Studio 17 2022" -A x64
```

#### Step 3: Build the DLL

```cmd
cmake --build build --config Release
```

Output: `build/Release/OnussharIME.dll`

#### Step 4: Create Installer

```cmd
"C:\Program Files (x86)\Inno Setup 6\ISCC.exe" installer.iss
```

Output: `dist/OnussharSetup-0.3.1-win64.exe`

## Installer Configuration

The installer (`installer.iss`) performs:

1. ✅ Copies `OnussharIME.dll` to `C:\Program Files\Onusshar\`
2. ✅ Registers the IME DLL with `regsvr32`
3. ✅ Adds registry entries for Windows Text Services Framework (TSF)
4. ✅ Creates Start Menu shortcuts
5. ✅ Opens Language Settings after installation
6. ✅ Creates uninstaller

### Registry Keys

The installer registers these keys:

```
HKLM\SOFTWARE\Microsoft\CTF\TIP\{8B9F6A3C-4D2E-4F1A-9B3C-7E5D8A2F1C9B}
HKLM\SOFTWARE\Microsoft\CTF\TIP\{...}\LanguageProfile\0x00000445\{...}
```

- `0x00000445` = Bengali language code (India)
- `{8B9F6A3C...}` = Onusshar CLSID

## Testing the Installer

1. **Run as Administrator:**
   ```cmd
   dist\OnussharSetup-0.3.1-win64.exe
   ```

2. **Follow wizard steps:**
   - Accept license
   - Choose installation directory
   - Wait for installation

3. **Verify registration:**
   ```cmd
   reg query "HKLM\SOFTWARE\Microsoft\CTF\TIP\{8B9F6A3C-4D2E-4F1A-9B3C-7E5D8A2F1C9B}"
   ```

4. **Test typing:**
   - Open Settings → Time & Language → Language
   - Click Bengali → Options → Add keyboard
   - Select "Onusshar"
   - Press Win+Space to switch
   - Type "ami" → should get "আমি"

## Troubleshooting

### CMake Error: Generator Not Found

**Problem:** `Could not find Visual Studio instance`

**Solution:** Install Visual Studio with C++ tools or specify generator manually:
```cmd
cmake -B build -S . -G "Visual Studio 17 2022" -A x64
```

### Build Error: Windows SDK Not Found

**Problem:** `The Windows SDK version X.X was not found`

**Solution:**
1. Open Visual Studio Installer
2. Modify installation
3. Install "Windows 10 SDK (10.0.17763.0)" or later

### Inno Setup Error: File Not Found

**Problem:** `ISCC.exe not found`

**Solution:** Install Inno Setup or update path in `build-installer.bat`:
```batch
set INNO_SETUP="C:\Program Files (x86)\Inno Setup 6\ISCC.exe"
```

### DLL Registration Failed

**Problem:** Installer completes but keyboard doesn't appear

**Solution:** Manually register:
```cmd
regsvr32 "C:\Program Files\Onusshar\OnussharIME.dll"
```

Then restart Explorer:
```cmd
taskkill /f /im explorer.exe
start explorer.exe
```

### IME Not Showing in Language Settings

**Problem:** Onusshar doesn't appear in Bengali keyboard list

**Solution:**
1. Verify DLL registration (see above)
2. Check registry keys exist
3. Restart Windows
4. Try re-installing

## Distribution

### Code Signing (Optional but Recommended)

To avoid Windows SmartScreen warnings:

1. Obtain a code signing certificate
2. Sign the installer:
   ```cmd
   signtool sign /f certificate.pfx /p password /tr http://timestamp.digicert.com /td sha256 /fd sha256 dist\OnussharSetup-0.3.1-win64.exe
   ```

### Uploading to GitHub Releases

```bash
gh release create v0.3.1 \
  dist/OnussharSetup-0.3.1-win64.exe \
  --title "Onusshar v0.3.1 - Windows" \
  --notes "Windows installer with 1550+ word dictionary"
```

## File Structure

```
windows-ime/
├── src/                    # Source code (.cpp, .h)
├── assets/                 # Icons and resources
│   └── icon.ico           # Installer icon
├── build/                  # CMake build directory (generated)
│   └── Release/
│       └── OnussharIME.dll
├── dist/                   # Installer output (generated)
│   └── OnussharSetup-0.3.1-win64.exe
├── CMakeLists.txt         # CMake configuration
├── installer.iss          # Inno Setup script
├── build-installer.bat    # Automated build script
├── BUILD.md              # This file
└── README.md             # Usage documentation
```

## Build Customization

### Change Version

Edit `installer.iss`:
```iss
#define MyAppVersion "0.3.2"
```

Also update `CMakeLists.txt`:
```cmake
project(OnussharIME VERSION 0.3.2)
```

### Change Installation Directory

Edit `installer.iss`:
```iss
DefaultDirName={autopf}\YourFolder
```

### Add More Files

Edit `installer.iss` in `[Files]` section:
```iss
Source: "your_file.txt"; DestDir: "{app}"; Flags: ignoreversion
```

## Additional Resources

- [CMake Documentation](https://cmake.org/documentation/)
- [Inno Setup Documentation](https://jrsoftware.org/ishelp/)
- [Windows TSF Guide](https://docs.microsoft.com/en-us/windows/win32/tsf/text-services-framework)
- [MSBuild Reference](https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild)

## Support

If you encounter build issues:
1. Check prerequisites are installed
2. Read error messages carefully
3. Check Troubleshooting section above
4. Open an issue: https://github.com/onusshar/onusshar/issues
