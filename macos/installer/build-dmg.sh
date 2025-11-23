#!/bin/bash

# Build script for creating Onusshar macOS .dmg installer
# Requires: create-dmg (npm install -g create-dmg or brew install create-dmg)

set -e  # Exit on error

# Configuration
APP_NAME="Onusshar"
VERSION="0.1.0"
ICON_FILE="../../app/assets/icon.icns"
DMG_BACKGROUND="./background.png"
DMG_OUTPUT="./output"
APP_PATH="../../app/dist-installers/mac/Onusshar.app"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Building Onusshar macOS Installer${NC}"
echo "Version: $VERSION"
echo ""

# Check if app exists
if [ ! -d "$APP_PATH" ]; then
    echo -e "${RED}Error: App not found at $APP_PATH${NC}"
    echo "Please run 'npm run package:mac' from the app directory first."
    exit 1
fi

# Create output directory
mkdir -p "$DMG_OUTPUT"

# Check for create-dmg
if ! command -v create-dmg &> /dev/null; then
    echo -e "${YELLOW}Warning: create-dmg not found${NC}"
    echo "Using electron-builder's default DMG creation..."
    echo "For custom DMG, install: npm install -g create-dmg"
    echo ""

    # electron-builder should have already created a DMG
    # Just copy it to our output directory
    if [ -f "../../app/dist-installers/Onusshar-$VERSION.dmg" ]; then
        cp "../../app/dist-installers/Onusshar-$VERSION.dmg" "$DMG_OUTPUT/"
        echo -e "${GREEN}DMG copied to $DMG_OUTPUT/${NC}"
        exit 0
    else
        echo -e "${RED}Error: DMG not found. Please run 'npm run package:mac' from app directory.${NC}"
        exit 1
    fi
fi

# Create custom DMG with create-dmg
echo "Creating custom DMG..."

create-dmg \
    --volname "$APP_NAME" \
    --volicon "$ICON_FILE" \
    --window-pos 200 120 \
    --window-size 600 400 \
    --icon-size 100 \
    --icon "$APP_NAME.app" 175 120 \
    --hide-extension "$APP_NAME.app" \
    --app-drop-link 425 120 \
    "$DMG_OUTPUT/$APP_NAME-$VERSION.dmg" \
    "$APP_PATH"

echo ""
echo -e "${GREEN}DMG created successfully!${NC}"
echo "Location: $DMG_OUTPUT/$APP_NAME-$VERSION.dmg"
echo ""
echo "Next steps:"
echo "1. Test the DMG on a clean macOS system"
echo "2. Notarize the app for distribution (production only)"
echo "3. Upload to GitHub releases or your distribution server"
