# Onusshar Architecture

This document describes the architectural design of Onusshar, a modern Bengali phonetic keyboard system.

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Core Components](#core-components)
4. [Data Flow](#data-flow)
5. [Platform Integration](#platform-integration)
6. [Future Architecture (Native IME)](#future-architecture-native-ime)
7. [Design Decisions](#design-decisions)

---

## Overview

Onusshar is designed with a **layered architecture** that separates:

1. **Core Logic** (platform-agnostic phonetic engine)
2. **Application Layer** (Electron-based desktop app)
3. **Platform Layer** (Windows/macOS-specific integrations)

This design allows:
- **Code reuse** across platforms
- **Easy testing** of core transliteration logic
- **Future extensibility** to native IME implementations
- **Maintainability** through clear separation of concerns

---

## System Architecture

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        User Applications                      │
│              (Text Editors, Browsers, etc.)                   │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         │ Clipboard / Manual Paste
                         │
┌────────────────────────▼─────────────────────────────────────┐
│                    Onusshar Desktop App                       │
│                      (Electron)                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Renderer Process (UI)                     │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  │  │
│  │  │ Typing Box   │  │  Settings    │  │   About     │  │  │
│  │  │              │  │   Panel      │  │             │  │  │
│  │  │ [Input]      │  │              │  │             │  │  │
│  │  │   ↓          │  │ - Phonetic   │  │ - Version   │  │  │
│  │  │ [Preview]    │  │ - Digits     │  │ - License   │  │  │
│  │  │   ↓          │  │ - Hotkeys    │  │ - Links     │  │  │
│  │  │ [Copy]       │  │              │  │             │  │  │
│  │  └──────────────┘  └──────────────┘  └─────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
│                              │                                │
│                              │ IPC (contextBridge)            │
│                              ▼                                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Main Process                              │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  │  │
│  │  │ System Tray  │  │  Global      │  │  Settings   │  │  │
│  │  │              │  │  Hotkeys     │  │  Storage    │  │  │
│  │  │ - Mode       │  │              │  │             │  │  │
│  │  │ - Menu       │  │ Ctrl+Alt+B   │  │ electron-   │  │  │
│  │  │ - Click      │  │   (toggle)   │  │ store       │  │  │
│  │  └──────────────┘  └──────────────┘  └─────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
└───────────────────────────┬──────────────────────────────────┘
                            │
                            │ Import
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                    @onusshar/core                             │
│                  (Pure TypeScript)                            │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Transliterator Engine                     │  │
│  │                                                        │  │
│  │  Input: "bangla"                                       │  │
│  │    ↓                                                   │  │
│  │  Pattern Matcher ─→ Find longest match                │  │
│  │    ↓                                                   │  │
│  │  Context Analyzer ─→ Check preceding/following chars  │  │
│  │    ↓                                                   │  │
│  │  Smart Converter ─→ Apply vowel sign / conjunct rules │  │
│  │    ↓                                                   │  │
│  │  Output: "বাঙলা"                                       │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │          Phonetic Mapping Configuration                │  │
│  │                                                        │  │
│  │  vowels: [ {pattern: "a", output: "আ"}, ... ]         │  │
│  │  consonants: [ {pattern: "k", output: "ক"}, ... ]     │  │
│  │  vowelSigns: [ {pattern: "a", output: "া"}, ... ]     │  │
│  │  specialChars: [ {pattern: "~", output: "ঁ"}, ... ]   │  │
│  │  numbers: [ {pattern: "0", output: "০"}, ... ]        │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Configuration Manager                     │  │
│  │                                                        │  │
│  │  - Validate settings                                   │  │
│  │  - Import/Export JSON                                  │  │
│  │  - Merge user preferences                              │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## Core Components

### 1. Core Engine (`@onusshar/core`)

**Location**: `core/`

**Responsibilities**:
- Transliterate Latin text to Bengali
- Manage phonetic mapping rules
- Handle configuration and settings

**Key Classes**:

#### `Transliterator`

```typescript
class Transliterator {
  convert(input: string): ConversionResult
  updateConfig(config: Partial<EngineConfig>): void
  getConfig(): EngineConfig
  getMapping(): PhoneticMapping
}
```

**Algorithm**:
1. Iterate through input string character by character
2. For each position, find the longest matching phonetic rule
3. Apply context-aware conversion (vowel signs vs independent vowels)
4. Handle escape sequences (backslash for raw Latin)
5. Output converted Bengali text

#### `ConfigManager`

```typescript
class ConfigManager {
  static getDefaultSettings(): UserSettings
  static validateSettings(settings: Partial<UserSettings>): UserSettings
  static exportSettings(settings: UserSettings): string
  static importSettings(json: string): UserSettings
}
```

**Storage Format** (JSON):
```json
{
  "mode": "smart",
  "digitFormat": "bangla",
  "enableHotkey": true,
  "hotkeyModifiers": ["Control", "Alt"],
  "hotkeyKey": "B"
}
```

---

### 2. Desktop Application (`app/`)

**Technology**: Electron (Chromium + Node.js)

#### Main Process

**File**: `app/src/main/index.ts`

**Responsibilities**:
- Window management
- System tray icon and menu
- Global shortcut registration
- IPC communication with renderer
- Persistent settings storage

**Key Functions**:

```typescript
createWindow()       // Create main window
createTray()         // Setup system tray icon
updateTrayMenu()     // Update tray menu based on mode
switchMode()         // Toggle Bangla/English mode
registerHotkey()     // Register global shortcut
```

**IPC Handlers**:
- `get-settings`: Retrieve user settings
- `update-settings`: Save settings changes
- `get-current-mode`: Get active mode (bangla/english)
- `switch-mode`: Toggle typing mode
- `export-settings`: Export to JSON
- `import-settings`: Import from JSON

#### Renderer Process

**File**: `app/src/renderer/index.ts`

**Responsibilities**:
- User interface rendering
- Real-time transliteration preview
- Settings UI management
- Clipboard integration

**UI Components**:

1. **Typing Tab**
   - Input textarea (Roman)
   - Output preview (Bengali)
   - Copy/Clear buttons
   - Quick help

2. **Settings Tab**
   - Phonetic mode selector
   - Digit format selector
   - Hotkey configuration
   - Import/Export buttons

3. **About Tab**
   - Version info
   - Feature list
   - Links

#### Preload Script

**File**: `app/src/main/preload.ts`

**Purpose**: Safely expose IPC methods to renderer via `contextBridge`

**Exposed API**:
```typescript
window.electronAPI = {
  getSettings()
  updateSettings(settings)
  getCurrentMode()
  switchMode(mode)
  exportSettings()
  importSettings(json)
  onModeChanged(callback)
  onNavigateToSettings(callback)
  onNavigateToAbout(callback)
}
```

---

## Data Flow

### Typing Flow

```
User types "bangla" in input box
         │
         ▼
┌────────────────────┐
│  Renderer Process  │
│  (index.ts)        │
│                    │
│  inputBox.onInput  │
└────────┬───────────┘
         │
         │ 1. Get input value
         │
         ▼
┌────────────────────────┐
│  Transliterator.       │
│  convert("bangla")     │
│                        │
│  Core Engine:          │
│  1. Match "b" → "ব"    │
│  2. Match "a" → "া"    │
│     (vowel sign after  │
│      consonant)        │
│  3. Match "ng" → "ঙ"   │
│  4. Match "l" → "ল"    │
│  5. Match "a" → "া"    │
│                        │
│  Return: "বাঙলা"       │
└────────┬───────────────┘
         │
         │ 2. Get result
         │
         ▼
┌────────────────────┐
│  Renderer Process  │
│                    │
│  outputBox.text    │
│  = result.text     │
│                    │
│  Display: বাঙলা    │
└────────────────────┘
```

### Settings Flow

```
User changes digit format to "Western"
         │
         ▼
┌─────────────────┐
│ Renderer        │
│ digitSelect.    │
│ onChange        │
└────────┬────────┘
         │
         │ IPC: update-settings
         ▼
┌─────────────────────────┐
│ Main Process            │
│                         │
│ 1. Receive settings     │
│ 2. Merge with existing  │
│ 3. Save to store        │
│ 4. Return updated       │
└────────┬────────────────┘
         │
         │ Return settings
         ▼
┌─────────────────────────┐
│ Renderer                │
│                         │
│ 1. Apply to engine      │
│    transliterator.      │
│    updateConfig({       │
│      digitFormat:       │
│      'western'          │
│    })                   │
│ 2. Update UI            │
└─────────────────────────┘
```

### Hotkey Flow

```
User presses Ctrl+Alt+B
         │
         ▼
┌──────────────────────┐
│ OS Global Shortcut   │
│ System               │
└──────────┬───────────┘
           │
           │ Electron globalShortcut
           ▼
┌──────────────────────┐
│ Main Process         │
│ switchMode()         │
│                      │
│ Current: bangla      │
│   ↓                  │
│ Toggle               │
│   ↓                  │
│ New: english         │
│                      │
│ updateTrayMenu()     │
└──────────┬───────────┘
           │
           │ IPC: mode-changed
           ▼
┌──────────────────────┐
│ Renderer             │
│ onModeChanged        │
│                      │
│ Update mode display  │
│ "English"            │
│                      │
│ Disable input box    │
└──────────────────────┘
```

---

## Platform Integration

### Windows

**Current (MVP)**:
- Electron app with system tray
- Global shortcut via `globalShortcut` API
- No system-level IME integration

**Future (Phase 2)**:
- Text Services Framework (TSF) integration
- System IME that works in all applications
- Inline candidate window
- See [Future Architecture](#future-architecture-native-ime)

### macOS

**Current (MVP)**:
- Electron app with menu bar icon
- Global shortcut via `globalShortcut` API
- No system-level Input Method integration

**Future (Phase 2)**:
- Input Method Kit framework
- System-wide input source
- Native candidate window
- See [Future Architecture](#future-architecture-native-ime)

---

## Future Architecture (Native IME)

### Phase 2: Native IME Integration

**Goal**: Type Bengali directly in any application without a typing box.

#### Windows (TSF-based IME)

```
┌──────────────────────────────────────┐
│        User Application              │
│     (Notepad, Word, Browser)         │
└────────────┬─────────────────────────┘
             │
             │ TSF (Text Services Framework)
             ▼
┌──────────────────────────────────────┐
│      Onusshar IME Module (C++/C#)    │
│                                      │
│  ITfTextInputProcessor               │
│  ├─ OnSetFocus()                     │
│  ├─ OnTestKeyDown()                  │
│  ├─ OnKeyDown() ──┐                  │
│  └─ OnComposition() │                │
│                     │                │
│      ┌──────────────▼──────────┐     │
│      │ Call Core Engine        │     │
│      │ via Node Addon or WASM  │     │
│      └─────────────────────────┘     │
│                                      │
│  Candidate Window (C++)              │
│  └─ Show suggestions                 │
└──────────────────────────────────────┘
             │
             │
             ▼
┌──────────────────────────────────────┐
│    @onusshar/core (shared)           │
│    Transliteration Engine            │
└──────────────────────────────────────┘
```

**Implementation**:
- C++ or C# IME module using TSF
- Embed core engine via:
  - **Option 1**: Node.js native addon (N-API)
  - **Option 2**: Compile TypeScript to WebAssembly
  - **Option 3**: Rewrite core in C++ (less ideal)
- Register as system IME
- Handle keyboard events at OS level

#### macOS (Input Method Kit)

```
┌──────────────────────────────────────┐
│        User Application              │
│     (TextEdit, Safari, etc.)         │
└────────────┬─────────────────────────┘
             │
             │ Text Input API
             ▼
┌──────────────────────────────────────┐
│  Onusshar Input Method (Swift/ObjC)  │
│                                      │
│  IMKInputController                  │
│  ├─ inputText()                      │
│  ├─ handleEvent() ──┐                │
│  └─ candidates()     │               │
│                      │               │
│      ┌───────────────▼──────────┐    │
│      │ Call Core Engine         │    │
│      │ via JavaScriptCore or    │    │
│      │ WebAssembly              │    │
│      └──────────────────────────┘    │
│                                      │
│  IMKCandidates                       │
│  └─ Show candidate window            │
└──────────────────────────────────────┘
             │
             │
             ▼
┌──────────────────────────────────────┐
│    @onusshar/core (shared)           │
│    Transliteration Engine            │
└──────────────────────────────────────┘
```

**Implementation**:
- Swift/Objective-C Input Method app
- Embed core engine via:
  - **Option 1**: JavaScriptCore bridge
  - **Option 2**: WebAssembly
  - **Option 3**: Rewrite in Swift (less ideal)
- Register as Input Source
- Handle text input at system level

---

## Design Decisions

### Why TypeScript for Core?

**Pros**:
- Cross-platform without recompilation
- Easy to test and debug
- JSON configuration is native
- Large ecosystem and tooling
- Can be embedded in Electron, Node, Web, or compiled to WASM

**Cons**:
- Slightly slower than native C/C++
- Requires runtime (Node.js or browser)

**Decision**: Use TypeScript for MVP. Performance is not a bottleneck for phonetic conversion (microseconds per keystroke). Can compile to WASM later if needed.

### Why Electron for Desktop App?

**Pros**:
- Write once, run on Windows/macOS/Linux
- Rich UI capabilities (HTML/CSS/JS)
- Easy to integrate with TypeScript core
- Fast development and iteration

**Cons**:
- Larger app size (~150 MB)
- Higher memory usage (~100 MB)
- Not a "native" system IME (MVP limitation)

**Decision**: Use Electron for MVP to ship quickly. Plan native IME integration in Phase 2.

### Why Separate Core from App?

**Architecture**: Monorepo with workspaces

```
onusshar/
├── core/          # @onusshar/core - Pure engine
└── app/           # @onusshar/app - Electron app
```

**Benefits**:
1. **Testability**: Core can be tested independently
2. **Reusability**: Core can be used in:
   - Desktop app (Electron)
   - Web app (browser)
   - Native IME (via WASM or Node addon)
   - Mobile apps (React Native)
3. **Maintainability**: Changes to UI don't affect core logic
4. **Future-proof**: Easy to migrate to native IME

### Configuration as JSON

**Why JSON for phonetic mappings?**

- Human-readable and editable
- Easy to version control
- Users can customize without code changes
- Can be validated with JSON Schema
- Native TypeScript/JavaScript support

**Example**:
```json
{
  "pattern": "kh",
  "output": "খ",
  "priority": 2
}
```

Users can add custom rules:
```json
{
  "pattern": "xyz",
  "output": "☺",
  "priority": 10
}
```

---

## Performance Considerations

### Pattern Matching

**Current**: Linear search through sorted rules (O(n))

**Optimization**: Rules are sorted by:
1. Priority (descending)
2. Pattern length (descending)

This ensures longest matches are found first.

**Future**: Trie data structure for O(m) lookup where m = pattern length.

### Memory Usage

**Core Engine**: ~1 MB
- Mapping rules: ~500 rules × ~100 bytes = 50 KB
- Code: ~100 KB
- Total: < 200 KB

**Electron App**: ~100-150 MB
- Chromium runtime: ~90 MB
- Node.js: ~30 MB
- App code: ~5 MB

**Future Native IME**: ~5-10 MB (no Electron overhead)

### Latency

**Transliteration**: < 1 ms per keystroke (measured on mid-range CPU)
- Pattern matching: ~0.1 ms
- Context analysis: ~0.2 ms
- Smart conversion: ~0.1 ms

**UI Update**: < 16 ms (60 FPS)
- Input event → Conversion → DOM update

No noticeable lag in real-world usage.

---

## Security Considerations

### Electron Security

**Context Isolation**: ✅ Enabled
- Renderer has no direct access to Node.js APIs

**Node Integration**: ❌ Disabled
- Prevents XSS attacks from accessing system

**Preload Script**: ✅ Sandboxed
- Only exposes specific, safe IPC methods

**Content Security Policy**: ✅ Set
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'">
```

### Settings Storage

**Location**: OS-specific secure storage
- Windows: `%APPDATA%\Onusshar\`
- macOS: `~/Library/Application Support/Onusshar/`

**Permissions**: User-only access (0600)

**No sensitive data**: Settings contain only UI preferences

---

## Testing Strategy

### Unit Tests

**Core Engine** (`core/src/**/*.test.ts`):
- Transliteration correctness
- Configuration validation
- Edge cases (empty input, special chars)
- Performance benchmarks

**Coverage Target**: > 80%

**Run**:
```bash
cd core
npm test
```

### Integration Tests

**Electron App**:
- Main process IPC handlers
- Renderer UI interactions
- Settings persistence

**Tools**: Spectron (Electron testing framework)

### Manual Testing

**Platforms**:
- Windows 10, 11
- macOS Monterey, Ventura, Sonoma

**Scenarios**:
- First launch experience
- Hotkey toggle
- Settings import/export
- Long text conversion (performance)
- Edge cases (emojis, mixed scripts)

---

## Deployment

### Build Pipeline

```
1. Code commit → GitHub
2. CI (GitHub Actions):
   a. Run tests (npm test)
   b. Build core (npm run build)
   c. Build app (npm run build)
   d. Package installers:
      - Windows: .exe (NSIS)
      - macOS: .dmg, .zip
3. Upload to GitHub Releases
4. (Optional) Code sign and notarize
```

### Release Checklist

- [ ] Version bump in package.json
- [ ] Update CHANGELOG.md
- [ ] Run tests (npm test)
- [ ] Build for all platforms
- [ ] Test installers on clean VMs
- [ ] Create GitHub release
- [ ] Upload installers
- [ ] Update download links in README

---

## Conclusion

Onusshar's architecture is designed for:
- **Modularity**: Core engine is reusable
- **Extensibility**: Easy to add features
- **Future-proofing**: Clear path to native IME
- **Developer experience**: Simple to build and test

The current MVP (Electron app) is a stepping stone to a full native IME implementation, with the core engine remaining unchanged.
