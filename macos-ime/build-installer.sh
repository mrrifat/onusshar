#!/bin/bash
# Onusshar Bengali Keyboard - macOS Installer Build Script
# Creates a .pkg installer wrapped in a .dmg

set -e

VERSION="0.3.1"
APP_NAME="Onusshar"
BUNDLE_ID="com.onusshar.inputmethod"
PRODUCT_NAME="Onusshar Bengali Keyboard"

# Directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUILD_DIR="$SCRIPT_DIR/build"
DIST_DIR="$SCRIPT_DIR/dist"
PKG_ROOT="$BUILD_DIR/pkgroot"
RESOURCES_DIR="$BUILD_DIR/Resources"
DMG_DIR="$BUILD_DIR/dmg"

echo "=========================================="
echo "Building Onusshar macOS Installer v$VERSION"
echo "=========================================="

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf "$BUILD_DIR" "$DIST_DIR"
mkdir -p "$BUILD_DIR" "$DIST_DIR" "$PKG_ROOT/Applications" "$RESOURCES_DIR" "$DMG_DIR"

# Step 1: Build the Input Method bundle directly
echo ""
echo "Step 1: Compiling Swift source files..."

# Create app bundle structure
APP_BUNDLE="$BUILD_DIR/$APP_NAME.app"
mkdir -p "$APP_BUNDLE/Contents/MacOS"
mkdir -p "$APP_BUNDLE/Contents/Resources"

# Copy Info.plist
cp "$SCRIPT_DIR/OnussharInputMethod/Info.plist" "$APP_BUNDLE/Contents/Info.plist"

# Compile Swift files directly
echo "Compiling Swift Input Method..."
swiftc -emit-executable \
       -o "$APP_BUNDLE/Contents/MacOS/$APP_NAME" \
       -module-name Onusshar \
       "$SCRIPT_DIR/OnussharInputMethod/OnussharInputController.swift" \
       "$SCRIPT_DIR/OnussharInputMethod/OnussharEngineBridge.swift" \
       "$SCRIPT_DIR/OnussharInputMethod/OnussharCandidateWindow.swift" \
       -framework Cocoa \
       -framework InputMethodKit \
       2>&1 || {
    echo "✗ Swift compilation failed!"
    echo "Error: Could not compile Swift source files"
    exit 1
}

BUILT_APP="$APP_BUNDLE"
echo "✓ Built app bundle at: $BUILT_APP"

# Step 2: Copy app to package root
echo ""
echo "Step 2: Preparing package contents..."
cp -R "$BUILT_APP" "$PKG_ROOT/Applications/"
echo "✓ Copied $APP_NAME.app to package root"

# Step 3: Make postinstall script executable
chmod +x "$SCRIPT_DIR/scripts/postinstall"
echo "✓ Set permissions on postinstall script"

# Step 4: Create Welcome.html for installer
cat > "$RESOURCES_DIR/Welcome.html" <<EOF
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; padding: 20px; }
        h1 { color: #1d1d1f; font-size: 32px; font-weight: 600; margin-bottom: 10px; }
        p { color: #1d1d1f; font-size: 14px; line-height: 1.6; }
        .feature { margin: 10px 0; padding-left: 20px; }
        .version { color: #86868b; font-size: 12px; }
    </style>
</head>
<body>
    <h1>Welcome to Onusshar Bengali Keyboard</h1>
    <p class="version">Version $VERSION</p>

    <p>Onusshar is a modern, fast Bengali phonetic keyboard for macOS. Type Bengali naturally using familiar Roman letters.</p>

    <p><strong>Example:</strong> Type "ami bangla likchi" → "আমি বাঙলা লিকছি"</p>

    <div class="feature">
        <p>✨ <strong>Features:</strong></p>
        <ul>
            <li>Native macOS Input Method integration</li>
            <li>Smart dictionary with 1550+ Bengali words</li>
            <li>Context-aware suggestions as you type</li>
            <li>Works in all macOS applications</li>
            <li>Frequency-based word ranking</li>
        </ul>
    </div>

    <p><strong>After installation:</strong></p>
    <ol>
        <li>Go to System Settings → Keyboard → Input Sources</li>
        <li>Click the '+' button</li>
        <li>Search for "Bengali" and select "Onusshar"</li>
        <li>Press Control+Space to switch between input methods</li>
    </ol>

    <p>Click Continue to install Onusshar.</p>
</body>
</html>
EOF

# Step 5: Create ReadMe.html
cat > "$RESOURCES_DIR/ReadMe.html" <<EOF
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; padding: 20px; }
        h2 { color: #1d1d1f; font-size: 24px; font-weight: 600; margin-top: 30px; }
        p { color: #1d1d1f; font-size: 14px; line-height: 1.6; }
        code { background: #f5f5f7; padding: 2px 6px; border-radius: 4px; font-family: 'SF Mono', Monaco, monospace; }
    </style>
</head>
<body>
    <h2>System Requirements</h2>
    <ul>
        <li>macOS Monterey (12.0) or later</li>
        <li>Intel or Apple Silicon processor</li>
        <li>50 MB of available disk space</li>
    </ul>

    <h2>Quick Start</h2>
    <p>After installation, activate Onusshar in System Settings:</p>
    <ol>
        <li>Open <strong>System Settings</strong></li>
        <li>Navigate to <strong>Keyboard</strong> → <strong>Input Sources</strong></li>
        <li>Click the <strong>+</strong> button</li>
        <li>Search for <strong>Bengali</strong></li>
        <li>Select <strong>Onusshar</strong> from the list</li>
    </ol>

    <h2>Switching Input Methods</h2>
    <p>Press <strong>Control+Space</strong> (or your configured shortcut) to cycle through input methods.</p>

    <h2>Phonetic Typing Examples</h2>
    <ul>
        <li><code>ami</code> → আমি (I)</li>
        <li><code>tumi</code> → তুমি (you)</li>
        <li><code>bangla</code> → বাঙলা (Bengali)</li>
        <li><code>bhalo</code> → ভালো (good)</li>
    </ul>

    <h2>Support</h2>
    <p>For help, issues, or feature requests:</p>
    <ul>
        <li>GitHub: <a href="https://github.com/onusshar/onusshar">github.com/onusshar/onusshar</a></li>
        <li>Documentation: <a href="https://github.com/onusshar/onusshar#readme">README.md</a></li>
    </ul>

    <h2>Uninstallation</h2>
    <p>To uninstall Onusshar:</p>
    <ol>
        <li>Remove Onusshar from Input Sources in System Settings</li>
        <li>Delete <code>/Library/Input Methods/Onusshar.app</code></li>
        <li>Restart your Mac or logout and login again</li>
    </ol>
</body>
</html>
EOF

echo "✓ Created installer resources"

# Step 6: Build the package
echo ""
echo "Step 3: Building .pkg installer..."
PKG_PATH="$BUILD_DIR/${APP_NAME}-${VERSION}.pkg"

pkgbuild --root "$PKG_ROOT" \
         --identifier "$BUNDLE_ID" \
         --version "$VERSION" \
         --scripts "$SCRIPT_DIR/scripts" \
         --install-location "/" \
         "$PKG_PATH"

if [ ! -f "$PKG_PATH" ]; then
    echo "✗ Error: Failed to create .pkg"
    exit 1
fi

echo "✓ Created package: $(basename "$PKG_PATH")"

# Step 7: Create product package with resources
echo ""
echo "Step 4: Creating installer with resources..."
PRODUCT_PKG="$BUILD_DIR/${APP_NAME}Installer-${VERSION}.pkg"

productbuild --package "$PKG_PATH" \
             --resources "$RESOURCES_DIR" \
             "$PRODUCT_PKG"

if [ ! -f "$PRODUCT_PKG" ]; then
    echo "✗ Error: Failed to create product package"
    exit 1
fi

echo "✓ Created installer package: $(basename "$PRODUCT_PKG")"

# Step 8: Copy installer to DMG staging directory
cp "$PRODUCT_PKG" "$DMG_DIR/${APP_NAME}Installer.pkg"

# Create ReadMe.txt for DMG
cat > "$DMG_DIR/ReadMe.txt" <<EOF
Onusshar Bengali Keyboard v${VERSION}
====================================

Installation Instructions:
1. Double-click "OnussharInstaller.pkg"
2. Follow the installation wizard
3. Enter your administrator password when prompted
4. Open System Settings > Keyboard > Input Sources
5. Click '+' and add Onusshar from Bengali section
6. Press Control+Space to switch input methods

System Requirements:
- macOS Monterey (12.0) or later
- Intel or Apple Silicon Mac

For support and documentation:
https://github.com/onusshar/onusshar

Thank you for using Onusshar!
EOF

# Step 9: Create DMG
echo ""
echo "Step 5: Creating .dmg disk image..."
DMG_PATH="$DIST_DIR/${APP_NAME}-${VERSION}.dmg"

hdiutil create -volname "$PRODUCT_NAME" \
               -srcfolder "$DMG_DIR" \
               -ov \
               -format UDZO \
               "$DMG_PATH"

if [ ! -f "$DMG_PATH" ]; then
    echo "✗ Error: Failed to create .dmg"
    exit 1
fi

# Get file size
DMG_SIZE=$(du -h "$DMG_PATH" | cut -f1)

echo ""
echo "=========================================="
echo "✓ Build Complete!"
echo "=========================================="
echo ""
echo "Installer created: $DMG_PATH"
echo "Size: $DMG_SIZE"
echo ""
echo "To distribute:"
echo "1. Test the installer on a clean macOS system"
echo "2. Upload to GitHub Releases"
echo ""
echo "Installation test:"
echo "  1. Mount the DMG: open \"$DMG_PATH\""
echo "  2. Run OnussharInstaller.pkg"
echo "  3. Add Onusshar in System Settings > Input Sources"
echo ""
