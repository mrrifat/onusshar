# Onusshar Windows TSF IME

Native Windows Input Method Editor using Text Services Framework (TSF).

## Overview

This is the Windows implementation of Onusshar using TSF (Text Services Framework), which enables system-wide Bengali typing in any application.

## Architecture

```
┌─────────────────────────────────┐
│   Any Windows Application       │
│   (Word, Chrome, VS Code, etc.) │
└────────────┬────────────────────┘
             │ TSF
             ▼
┌─────────────────────────────────┐
│  OnussharIME.dll (TSF IME)      │
│  ┌──────────────────────────┐   │
│  │ TextService              │   │
│  │ - ITfTextInputProcessor  │   │
│  ├──────────────────────────┤   │
│  │ KeyHandler               │   │
│  │ - ITfKeyEventSink        │   │
│  ├──────────────────────────┤   │
│  │ CompositionManager       │   │
│  │ - Manages composition    │   │
│  ├──────────────────────────┤   │
│  │ CandidateWindow          │   │
│  │ - Shows suggestions      │   │
│  ├──────────────────────────┤   │
│  │ EngineProxy              │   │
│  │ - Calls core engine      │   │
│  └──────────────────────────┘   │
└────────────┬────────────────────┘
             │ Node.js addon
             ▼
┌─────────────────────────────────┐
│   @onusshar/core                │
│   (TypeScript Engine)           │
└─────────────────────────────────┘
```

## Components

### 1. TextService
- Main TSF text service implementation
- Implements `ITfTextInputProcessor`
- Manages IME lifecycle (Activate/Deactivate)

### 2. KeyHandler
- Handles keyboard events
- Implements `ITfKeyEventSink`
- Routes keys to composition or control handlers

### 3. CompositionManager
- Manages composition string and range
- Updates text in real-time as user types
- Commits/cancels composition

### 4. CandidateWindow
- Displays suggestion candidates
- Supports selection with number keys (1-9)
- Highlights selected candidate

### 5. EngineProxy
- Bridge to @onusshar/core engine
- Calls TypeScript transliterator via Node.js addon
- Caches results for performance

## Building

### Prerequisites

- Windows 10 SDK or later
- Visual Studio 2019+ with C++ tools
- CMake 3.15+
- Node.js (for building the engine bridge)

### Build Steps

```cmd
# Create build directory
mkdir build
cd build

# Configure with CMake
cmake ..

# Build
cmake --build . --config Release

# Output: build\bin\Release\OnussharIME.dll
```

## Installation

### Register IME

```cmd
# Run as Administrator
regsvr32 OnussharIME.dll
```

This registers the DLL as a COM server and adds it to Windows IME list.

### Unregister IME

```cmd
# Run as Administrator
regsvr32 /u OnussharIME.dll
```

## Usage

### Enabling Onusshar IME

1. Open **Settings** > **Time & Language** > **Language**
2. Under **Preferred languages**, select **Bengali**
3. Click **Options**
4. Under **Keyboards**, click **Add a keyboard**
5. Select **Onusshar**
6. Close settings

### Switching to Onusshar

- Press **Win + Space** to cycle through input methods
- Or click the language indicator in the taskbar

### Typing

1. Switch to Onusshar IME
2. Type phonetically in any application:
   ```
   bangla → বাঙলা
   ami    → আমি
   ```
3. Candidate window shows suggestions
4. Press **Enter** to commit or **1-9** to select candidate
5. Press **Esc** to cancel

### Hotkeys

- **Enter** - Commit composition
- **Esc** - Cancel composition
- **Backspace** - Delete last character
- **Space** - Commit and insert space
- **1-9** - Select candidate from list
- **Arrow keys** - Navigate candidates (future)

## Integration with Core Engine

The IME uses `EngineProxy` to call the @onusshar/core TypeScript engine:

```cpp
// In EngineProxy.cpp
std::wstring EngineProxy::Convert(const std::string& input)
{
    // Calls @onusshar/ime-bridge Node.js addon
    // Which calls @onusshar/core TypeScript transliterator
    std::wstring result = bridge->Convert(input);
    return result;
}
```

The bridge is implemented in `ime-bridge/` directory.

## Debugging

### Enable TSF Logging

```cmd
# Set environment variable
set TSF_DEBUG=1

# Run your application
notepad.exe
```

### Debug with Visual Studio

1. Build in Debug configuration
2. Register debug DLL: `regsvr32 OnussharIME.dll`
3. Attach debugger to target process (e.g., notepad.exe)
4. Set breakpoints in `KeyHandler::OnKeyDown`
5. Type in the application

## Troubleshooting

### IME not appearing in language settings

- Ensure DLL is registered: `regsvr32 /i OnussharIME.dll`
- Check registry: `HKEY_CLASSES_ROOT\CLSID\{8F9A2B3C-4D5E-6F7A-8B9C-0D1E2F3A4B5C}`
- Run as Administrator

### IME not converting text

- Check if engine bridge is loaded
- Verify @onusshar/core is installed
- Check Windows Event Viewer for errors

### Candidate window not showing

- Ensure window creation succeeds in `CandidateWindow::Create()`
- Check if Z-order is correct (HWND_TOPMOST)

## Known Limitations (Phase 2 MVP)

- ⚠️ Engine integration is stub (Phase 2.1 will add full bridge)
- ⚠️ No dictionary-based suggestions (coming in Phase 3)
- ⚠️ Candidate navigation with arrows not implemented
- ⚠️ No settings UI (uses defaults)

## Future Enhancements (Phase 2.1+)

- [ ] Full Node.js addon integration
- [ ] Dictionary-based word suggestions
- [ ] Candidate window navigation
- [ ] Settings dialog
- [ ] Learn from user input
- [ ] Predictive text
- [ ] Multi-monitor support

## License

MIT License - see [LICENSE](../../LICENSE)

## References

- [TSF Documentation](https://docs.microsoft.com/en-us/windows/win32/tsf/text-services-framework)
- [TSF Sample](https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/Win7Samples/winui/input/tsf)
