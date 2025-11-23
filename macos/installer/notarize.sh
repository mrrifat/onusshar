#!/bin/bash

# Script to notarize Onusshar for macOS distribution
# Requires: Apple Developer account, app-specific password, Xcode command line tools

set -e

# Configuration
APP_PATH="../../app/dist-installers/mac/Onusshar.app"
DMG_PATH="./output/Onusshar-0.1.0.dmg"
BUNDLE_ID="com.onusshar.keyboard"

# Apple Developer credentials (set these as environment variables)
APPLE_ID="${APPLE_ID:-your-apple-id@example.com}"
TEAM_ID="${TEAM_ID:-YOUR_TEAM_ID}"
APP_PASSWORD="${APP_PASSWORD:-your-app-specific-password}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}Onusshar macOS Notarization Script${NC}"
echo ""

# Check if credentials are set
if [ "$APPLE_ID" = "your-apple-id@example.com" ] || [ "$TEAM_ID" = "YOUR_TEAM_ID" ]; then
    echo -e "${YELLOW}Please set the following environment variables:${NC}"
    echo "  APPLE_ID=your-apple-id@example.com"
    echo "  TEAM_ID=YOUR_TEAM_ID"
    echo "  APP_PASSWORD=your-app-specific-password"
    echo ""
    echo "Get app-specific password from: https://appleid.apple.com"
    exit 1
fi

echo "Step 1: Code Signing"
echo "Signing app with Developer ID..."
codesign --deep --force --verify --verbose \
    --sign "Developer ID Application: $TEAM_ID" \
    --options runtime \
    "$APP_PATH"

echo -e "${GREEN}✓ Code signing complete${NC}"
echo ""

echo "Step 2: Create DMG (if not exists)"
if [ ! -f "$DMG_PATH" ]; then
    ./build-dmg.sh
fi

echo "Step 3: Notarization"
echo "Uploading to Apple for notarization..."
xcrun notarytool submit "$DMG_PATH" \
    --apple-id "$APPLE_ID" \
    --team-id "$TEAM_ID" \
    --password "$APP_PASSWORD" \
    --wait

echo -e "${GREEN}✓ Notarization complete${NC}"
echo ""

echo "Step 4: Stapling"
echo "Stapling notarization ticket to DMG..."
xcrun stapler staple "$DMG_PATH"

echo -e "${GREEN}✓ Stapling complete${NC}"
echo ""

echo "Step 5: Verification"
echo "Verifying notarization..."
spctl -a -t open --context context:primary-signature -v "$DMG_PATH"

echo ""
echo -e "${GREEN}🎉 Notarization successful!${NC}"
echo "Your app is ready for distribution."
echo ""
echo "DMG location: $DMG_PATH"
