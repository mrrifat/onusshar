# Onusshar

**A modern, fast, open-source Bengali phonetic keyboard for Windows & macOS.**

![Version](https://img.shields.io/badge/version-0.2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS-lightgrey.svg)

Onusshar (অনুস্বর) lets you type Bengali naturally using familiar Roman/Latin letters with intelligent phonetic conversion. Type "ami bangla likchi" and get "আমি বাঙলা লিকছি" instantly.

---

## ✨ Features

### Phase 1 (v0.1.0) - Desktop App ✅
- 🚀 **Fast & Lightweight** - Minimal resource usage, instant conversion
- 🧠 **Smart Phonetic Engine** - Context-aware vowel signs and conjunct formation
- ⌨️ **Global Hotkey** - Toggle Bengali/English mode from anywhere
- 🎨 **System Tray Integration** - Runs quietly in the background
- ⚙️ **Highly Configurable** - Customize mappings, hotkeys, and behavior
- 📦 **Open Source** - MIT licensed, community-driven

### Phase 2 (v0.2.0) - Native IME ✅ NEW!
- 🎯 **System-Wide Typing** - Type Bengali in any application (Word, Chrome, VS Code, etc.)
- ⚡ **Windows TSF IME** - Native Text Services Framework implementation
- 🍎 **macOS Input Method** - Native Input Method Kit integration
- 💡 **Candidate Window** - Shows suggestions as you type
- 🔄 **Inline Composition** - See Bengali text form in real-time
- 🚫 **No Copy-Paste** - Direct Bengali input, just like any other language

---

## 📥 Installation

### Option 1: Desktop App (Phase 1)

#### Windows

1. Download `OnussharSetup-0.1.0-win64.exe` from [Releases](#)
2. Run the installer
3. Follow the setup wizard
4. Onusshar will appear in your system tray

**Requirements**: Windows 10 (1809+) or Windows 11, x64

#### macOS

1. Download `Onusshar-0.1.0.dmg` from [Releases](#)
2. Open the DMG file
3. Drag **Onusshar.app** to **Applications** folder
4. Launch from Applications or Spotlight

**Requirements**: macOS Monterey (12.0) or later, Universal Binary (Intel + Apple Silicon)

### Option 2: Native IME (Phase 2) ⭐ RECOMMENDED

#### Windows TSF IME

1. Download `OnussharIME-0.2.0-win64.zip` from [Releases](#)
2. Extract to `C:\Program Files\Onusshar\`
3. Run as Administrator:
   ```cmd
   regsvr32 "C:\Program Files\Onusshar\OnussharIME.dll"
   ```
4. Go to **Settings** > **Time & Language** > **Language** > **Bengali** > **Options**
5. Add **Onusshar** keyboard
6. Press **Win+Space** to switch input methods

**Requirements**: Windows 10 (1809+) or Windows 11, x64, Administrator access

#### macOS Input Method

1. Download `OnussharInputMethod-0.2.0.dmg` from [Releases](#)
2. Copy **Onusshar.app** to `/Library/Input Methods/`:
   ```bash
   sudo cp -R Onusshar.app /Library/Input\ Methods/
   ```
3. Restart Input Method system:
   ```bash
   killall IMKServer
   ```
4. Go to **System Settings** > **Keyboard** > **Input Sources**
5. Click **+**, select **Bengali** > **Onusshar**
6. Press **Control+Space** to switch input methods

**Requirements**: macOS Monterey (12.0) or later, Administrator access

### From Source

```bash
# Clone the repository
git clone https://github.com/onusshar/onusshar.git
cd onusshar

# Install dependencies
npm install

# Build core engine
cd core && npm run build && cd ..

# Build and run app
cd app
npm run build
npm start
```

See [Build Instructions](#building-from-source) for details.

---

## 🎯 Quick Start

### Basic Usage

1. **Launch Onusshar** - Look for the icon in system tray/menu bar
2. **Open typing window** - Click tray icon or use hotkey
3. **Type in Roman letters**:
   ```
   Input:  ami tomake bhalobashi
   Output: আমি তোমাকে ভালোবাষি
   ```
4. **Copy to clipboard** - Click "Copy" button
5. **Paste anywhere** - Use in any application

### Hotkey Toggle

- **Windows**: `Ctrl+Alt+B`
- **macOS**: `⌥⌘B` (Option+Command+B)

Press the hotkey to switch between:
- 🟢 **বাংলা (Bangla)** - Phonetic conversion enabled
- 🔵 **English** - Direct Latin input

### System Tray Menu

Right-click the tray icon for:
- Switch mode (Bangla ↔ English)
- Open typing window
- Settings
- About
- Quit

---

## ⌨️ Phonetic Layout

### Vowels

| Type | Get | Example |
|------|-----|---------|
| `a` | আ | `ami` → আমি |
| `i` | ই | `ki` → কি |
| `ii` / `ee` | ঈ | `dii` → দী |
| `u` | উ | `tumi` → তুমি |
| `uu` / `oo` | ঊ | `bhuu` → ভূ |
| `e` | এ | `ek` → এক |
| `o` | ও | `lok` → লোক |
| `oi` | ঐ | `oikko` → ঐক্য |
| `ou` / `au` | ঔ | `aushod` → ঔষধ |

### Consonants

| Type | Get | Example |
|------|-----|---------|
| `k` | ক | `kal` → কাল |
| `kh` | খ | `khub` → খুব |
| `g` | গ | `gan` → গান |
| `gh` | ঘ | `ghor` → ঘোর |
| `ng` | ঙ | `angul` → আঙুল |
| `c` / `ch` | চ | `chol` → চল |
| `j` | জ | `jol` → জল |
| `t` | ত | `tumi` → তুমি |
| `th` | থ | `theke` → থেকে |
| `d` | দ | `din` → দিন |
| `dh` | ধ | `dhan` → ধান |
| `n` | ন | `nam` → নাম |
| `p` | প | `pakhi` → পাখি |
| `b` | ব | `boi` → বই |
| `bh` | ভ | `bhalo` → ভালো |
| `m` | ম | `ma` → মা |
| `sh` | শ | `shuru` → শুরু |
| `Sh` | ষ | `Shash` → ষাষ |
| `s` | স | `sat` → সাত |
| `h` | হ | `hat` → হাত |

### Retroflexes

| Type | Get | Example |
|------|-----|---------|
| `T` | ট | `TaTka` → টাটকা |
| `Th` | ঠ | `Thanda` → ঠান্ডা |
| `D` | ড | `Dab` → ডাব |
| `Dh` | ঢ | `Dhol` → ঢোল |
| `R` | ড় | `baRi` → বাড়ি |
| `Rh` | ঢ় | `gaRh` → গাড়্ |
| `N` | ণ | `puroNo` → পুরোণো |

### Special Characters

| Type | Get | Description |
|------|-----|-------------|
| `~` | ঁ | Chandrabindu |
| `Ng` | ং | Anusvara |
| `H` | ঃ | Visarga |
| `^` | ্ | Explicit hasanta/virama |
| `..` | । | Dari (Bengali full stop) |

### Numbers

Default: Bengali digits (০-৯)

| Type | Bangla | Western (configurable) |
|------|--------|------------------------|
| `0-9` | ০-৯ | 0-9 |

Example: `2025` → `২০২৫`

### Escape to Latin

Use backslash `\` to escape:

```
Input:  ami \John er bondhu
Output: আমি John এর বন্ধু
```

---

## 🔧 Settings

### Phonetic Mode

- **Smart** (Recommended): Full mapping with context-aware heuristics
- **Basic**: Minimal mapping, fewer auto-corrections

### Digit Format

- **Bengali** (০-৯): Default, traditional Bengali numerals
- **Western** (0-9): Latin digits

### Global Hotkey

- Enable/disable global hotkey
- Customize key combination (Windows: Ctrl+Alt+Key, macOS: Option+Command+Key)

### Import/Export

- **Export Settings**: Save your configuration as JSON
- **Import Settings**: Restore from JSON file

---

## 📖 Examples

### Simple Words

```
bangla    → বাঙলা
bhasha    → ভাষা
shundor   → শুন্দোর
probhat   → প্রভাত
shokal    → সকাল
```

### Sentences

```
ami bangla shikhchi        → আমি বাঙলা শিখছি
tumi kemon acho?           → তুমি কেমোন আছো?
apni ki bangla bolte paren → আপনি কি বাঙলা বোলতে পারেন
```

### With Escapes

```
\Hello, ami \Rahim       → Hello, আমি Rahim
\John bole, "ami ready"  → John বোলে, "আমি ready"
```

### Numbers

```
ami 25 bochhor boyeshi   → আমি ২৫ বোছোর বয়েসি
2025 sale                → ২০২৫ সালে
```

---

## 🏗️ Architecture

Onusshar is designed with a clean, modular architecture:

```
┌─────────────────────────────────────┐
│         Desktop App (Electron)       │
│  ┌─────────────────────────────────┐│
│  │  UI Layer (Renderer Process)    ││
│  │  - Typing Box                   ││
│  │  - Settings Panel               ││
│  │  - Real-time Preview            ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │  Main Process                   ││
│  │  - System Tray                  ││
│  │  - Global Hotkeys               ││
│  │  - Settings Storage             ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│   @onusshar/core (Pure TypeScript)  │
│  ┌─────────────────────────────────┐│
│  │  Transliterator Engine          ││
│  │  - Pattern Matching             ││
│  │  - Context Analysis             ││
│  │  - Smart Vowel/Consonant Logic  ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │  Configuration Manager          ││
│  │  - Mapping Rules (JSON)         ││
│  │  - User Settings                ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

**Core Design Principles:**

1. **Separation of Concerns**: Core engine is platform-agnostic
2. **Extensibility**: Easy to add new mappings or rules
3. **Testability**: Comprehensive unit tests for transliteration logic
4. **Performance**: Optimized pattern matching, minimal overhead

For detailed architecture, see [docs/architecture.md](docs/architecture.md).

---

## 🛠️ Building from Source

### Prerequisites

- Node.js 18+ and npm
- Git

**Platform-specific:**
- **Windows**: Visual Studio Build Tools (for native modules)
- **macOS**: Xcode Command Line Tools

### Build Steps

```bash
# 1. Clone repository
git clone https://github.com/onusshar/onusshar.git
cd onusshar

# 2. Install dependencies
npm install

# 3. Build core engine
cd core
npm run build
npm test  # Run tests
cd ..

# 4. Build desktop app
cd app
npm run build

# 5. Package for your platform
npm run package:win   # Windows
npm run package:mac   # macOS
```

**Output:**
- Windows: `app/dist-installers/Onusshar Setup 0.1.0.exe`
- macOS: `app/dist-installers/Onusshar-0.1.0.dmg`

### Platform-Specific Instructions

- **Windows**: See [windows/README_WINDOWS.md](windows/README_WINDOWS.md)
- **macOS**: See [macos/README_MACOS.md](macos/README_MACOS.md)

---

## 📚 Documentation

- [Architecture Overview](docs/architecture.md) - System design and components
- [Phonetic Layout](docs/phonetic-layout.md) - Complete mapping tables
- [Roadmap](docs/roadmap.md) - Future features and phases
- [Core API Reference](core/README.md) - Engine API documentation

---

## 🗺️ Roadmap

### Phase 1: MVP ✅ COMPLETE

✅ Core phonetic engine
✅ Desktop app with typing box
✅ System tray integration
✅ Global hotkey support
✅ Windows & macOS support

### Phase 2: Native IME ✅ COMPLETE (v0.2.0)

✅ Windows TSF IME (type in Word, Chrome, VS Code, etc.)
✅ macOS Input Method integration (type in Pages, Safari, TextEdit, etc.)
✅ System-wide typing (no copy-paste needed)
✅ Candidate window with suggestions
✅ Inline composition with real-time conversion

### Phase 3: Enhanced Features (v0.3.0) - NEXT

- Linux support (IBus/Fcitx5)
- Dictionary-based autocorrect (50,000+ words)
- User-defined custom mappings UI
- Word frequency learning
- Cloud sync for settings

### Phase 4: Mobile & Web (v1.0.0)

- Android keyboard app
- iOS keyboard extension
- Web-based typing tool
- Browser extensions

See [docs/roadmap.md](docs/roadmap.md) for detailed timeline.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Issues

- [Open an issue](https://github.com/onusshar/onusshar/issues) for bugs or feature requests
- Include OS version, app version, and steps to reproduce

### Code Contributions

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Run tests: `npm test`
6. Commit: `git commit -m 'Add amazing feature'`
7. Push: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Improving Phonetic Mappings

The phonetic mappings are in `core/src/config/default-mappings.ts`. To suggest improvements:

1. Edit the mapping file
2. Add tests in `core/src/engine/transliterator.test.ts`
3. Run tests to verify
4. Submit a PR with explanation

### Documentation

Help improve docs by:
- Fixing typos or clarifications
- Adding examples
- Translating to other languages

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

**TL;DR**: You can use, modify, and distribute Onusshar freely, including for commercial purposes.

---

## 🙏 Acknowledgments

Onusshar is inspired by:
- **Avro Keyboard** - Pioneer of Bengali phonetic typing
- **OpenBangla Keyboard** - Modern Linux Bengali keyboard
- The Bengali language community

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/onusshar/onusshar/issues)
- **Discussions**: [GitHub Discussions](https://github.com/onusshar/onusshar/discussions)
- **Documentation**: [docs/](docs/)

---

## ⭐ Show Your Support

If you find Onusshar useful, please:
- ⭐ Star this repository
- 🐦 Share on social media
- 🐛 Report bugs and suggest features
- 💻 Contribute code or documentation

---

**Made with ❤️ for the Bengali-speaking community**
