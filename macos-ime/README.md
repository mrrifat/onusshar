# Onusshar macOS Input Method

Native macOS Input Method using Input Method Kit (IMK).

## Overview

This is the macOS implementation of Onusshar using IMK (Input Method Kit), which enables system-wide Bengali typing in any macOS application.

## Architecture

```
┌─────────────────────────────────┐
│   Any macOS Application         │
│   (Pages, Safari, TextEdit)     │
└────────────┬────────────────────┘
             │ Text Input API
             ▼
┌─────────────────────────────────┐
│  Onusshar.app (Input Method)    │
│  ┌──────────────────────────┐   │
│  │ OnussharInputController  │   │
│  │ - IMKInputController     │   │
│  ├──────────────────────────┤   │
│  │ Input Event Handling     │   │
│  │ - handle(_:client:)      │   │
│  │ - inputText(_:client:)   │   │
│  ├──────────────────────────┤   │
│  │ Composition Management   │   │
│  │ - updateComposition      │   │
│  │ - commitComposition      │   │
│  ├──────────────────────────┤   │
│  │ OnussharCandidateWindow  │   │
│  │ - NSWindow + NSTableView │   │
│  ├──────────────────────────┤   │
│  │ OnussharEngineBridge     │   │
│  │ - JavaScriptCore bridge  │   │
│  └──────────────────────────┘   │
└────────────┬────────────────────┘
             │ JavaScriptCore
             ▼
┌─────────────────────────────────┐
│   @onusshar/core                │
│   (TypeScript → JavaScript)     │
└─────────────────────────────────┘
```

## Components

### 1. OnussharInputController
- Main input method controller
- Inherits from `IMKInputController`
- Handles keyboard events and manages composition
- Coordinates between engine bridge and candidate window

### 2. OnussharEngineBridge
- Bridge to @onusshar/core engine
- Uses JavaScriptCore to execute JavaScript
- Provides `convert()` and `getSuggestions()` methods
- Contains inline phonetic mappings for Phase 2

### 3. OnussharCandidateWindow
- Custom NSWindow showing suggestions
- NSTableView with candidate list
- Supports selection with number keys (1-9)
- Highlights selected candidate

## Building

### Prerequisites

- macOS Monterey (12.0) or later
- Xcode 14+ with Swift 5.7+
- Command Line Tools: `xcode-select --install`

### Build Steps

```bash
# Open in Xcode
open OnussharInputMethod.xcodeproj

# Or build from command line
xcodebuild -project OnussharInputMethod.xcodeproj \
           -scheme OnussharInputMethod \
           -configuration Release \
           build

# Output: build/Release/Onusshar.app
```

## Installation

### Install Input Method

```bash
# Copy to Input Methods directory
sudo cp -R build/Release/Onusshar.app /Library/Input\ Methods/

# Or for current user only
cp -R build/Release/Onusshar.app ~/Library/Input\ Methods/
```

### Register Input Method

```bash
# Restart Input Method system
killall -9 IMKServer

# Or restart completely
sudo reboot
```

### Enable in System Settings

1. Open **System Settings** > **Keyboard** > **Input Sources**
2. Click **+** button
3. Select **Bengali** in left panel
4. Find and select **Onusshar** in right panel
5. Click **Add**

## Usage

### Switching to Onusshar

- Press **Control + Space** (or **Control + Option + Space**) to cycle through input methods
- Or click the input menu in the menu bar (flag icon)
- Select **Onusshar**

### Typing

1. Switch to Onusshar Input Method
2. Type phonetically in any application:
   ```
   bangla → বাঙলা
   ami    → আমি
   tumi   → তুমি
   ```
3. Candidate window shows suggestions below cursor
4. Press **Return** to commit or **1-9** to select candidate
5. Press **Esc** to cancel

### Hotkeys

- **Return** - Commit composition
- **Esc** - Cancel composition
- **Backspace** - Delete last character
- **Space** - Commit and insert space
- **1-9** - Select candidate from list

## Integration with Core Engine

The Input Method uses `OnussharEngineBridge` to call the core engine:

```swift
// In OnussharEngineBridge.swift
func convert(_ input: String) -> String? {
    // Uses JavaScriptCore to execute @onusshar/core
    let result = transliterator?.call(withArguments: [input])
    return result?.toString()
}
```

Currently uses inline JavaScript implementation. Phase 2.1 will load bundled JavaScript from @onusshar/core.

## Debugging

### Enable Debug Logging

```swift
// In OnussharInputController.swift
override func inputText(_ string: String!, client sender: Any!) -> Bool {
    print("DEBUG: Input text: \(string ?? "<nil>")")
    // ... rest of code
}
```

### Debug with Xcode

1. Build in Debug configuration
2. Install debug build: `cp -R ... ~/Library/Input Methods/`
3. Restart: `killall IMKServer`
4. In Xcode: **Debug** > **Attach to Process**
5. Select your application (e.g., TextEdit)
6. Type in the application

### Check Logs

```bash
# View Input Method logs
log show --predicate 'subsystem == "com.apple.inputmethod"' --last 5m

# Or Console.app > Search: "Onusshar"
```

## Troubleshooting

### Input Method not appearing in Input Sources

- Ensure .app is in `/Library/Input Methods/` or `~/Library/Input Methods/`
- Check `Info.plist` has correct keys:
  - `InputMethodConnectionName`
  - `InputMethodServerControllerClass`
  - `TISIntendedLanguage`
- Restart: `killall IMKServer`

### Input Method not converting text

- Check JavaScriptCore context is initialized
- Verify `OnussharEngineBridge.convert()` returns valid output
- Check Console.app for JavaScript errors

### Candidate window not showing

- Ensure `OnussharCandidateWindow` is created
- Check cursor position is valid
- Verify window level is `.floating`

### Permissions

If macOS blocks the Input Method:

1. **System Settings** > **Privacy & Security**
2. Scroll to **Input Monitoring**
3. Enable checkbox for **Onusshar**
4. Restart: `killall IMKServer`

## Known Limitations (Phase 2 MVP)

- ⚠️ Engine is inline JavaScript (Phase 2.1 will load bundled @onusshar/core)
- ⚠️ No dictionary-based suggestions (coming in Phase 3)
- ⚠️ Candidate navigation with arrows not implemented
- ⚠️ No settings UI (uses defaults)
- ⚠️ Limited phonetic mappings (demo subset)

## Future Enhancements (Phase 2.1+)

- [ ] Load bundled @onusshar/core JavaScript
- [ ] Full phonetic mapping support
- [ ] Dictionary-based word suggestions
- [ ] Candidate window arrow navigation
- [ ] Settings menu in input menu
- [ ] Learn from user input
- [ ] Multi-monitor support
- [ ] Dark mode support

## Files Structure

```
macos-ime/
├── OnussharInputMethod.xcodeproj/  # Xcode project
├── OnussharInputMethod/
│   ├── OnussharInputController.swift      # Main controller
│   ├── OnussharEngineBridge.swift         # Engine bridge (JSCore)
│   ├── OnussharCandidateWindow.swift      # Candidate window
│   ├── Info.plist                         # Bundle config
│   └── Assets.xcassets/                   # Icons
├── build/                                  # Build output
└── README.md                              # This file
```

## Code Signing (Required for Distribution)

```bash
# Sign the application
codesign --force --deep --sign "Developer ID Application: Your Name" \
         Onusshar.app

# Verify signature
codesign --verify --deep --verbose=2 Onusshar.app

# Check if it will run
spctl --assess --type execute Onusshar.app
```

## License

MIT License - see [LICENSE](../../LICENSE)

## References

- [Input Method Kit Framework](https://developer.apple.com/documentation/inputmethodkit)
- [IMKInputController](https://developer.apple.com/documentation/inputmethodkit/imkinputcontroller)
- [JavaScriptCore Framework](https://developer.apple.com/documentation/javascriptcore)
- [Apple Input Method Sample](https://developer.apple.com/library/archive/samplecode/NumberInput_IMKit_Sample/)
