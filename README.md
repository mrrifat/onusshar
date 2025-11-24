# Onusshar

**A modern Bengali phonetic keyboard for Windows, macOS, Linux & Web.**

![Version](https://img.shields.io/badge/version-0.4.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux%20%7C%20Web-lightgrey.svg)

Onusshar (অনুস্বর) lets you type Bengali naturally using Roman letters. Type "ami bangla likhchi" and get "আমি বাংলা লিখছি" instantly.

## 🌐 Try Online - No Installation!

**[Type Bengali Now](https://onusshar.github.io/onusshar)** - Works on any device, any browser!

---

## ✨ Features

- 🎯 **System-Wide Typing** - Type Bengali in any application (desktop apps)
- 🌐 **Web Version** - Type online without installing anything
- 📖 **1550+ Word Dictionary** - Smart suggestions as you type
- 🧠 **Intelligent Autocomplete** - Learns from your typing patterns
- ⚡ **Fast & Lightweight** - Instant conversion, minimal resources
- 🌍 **Cross-Platform** - Windows, macOS, Linux, and web browsers
- 📱 **Mobile-Friendly** - Works great on phones and tablets (web version)
- 🆓 **Open Source** - MIT licensed, free forever

---

## 📥 Installation

### 🌐 Web Version (Easiest!)

No installation needed! Just visit **[onusshar.github.io/onusshar](https://onusshar.github.io/onusshar)**

- Works on any device
- No downloads required
- Start typing immediately
- Mobile-friendly interface

### Windows

1. Download `OnussharSetup-0.3.1-win64.exe` from [Releases](https://github.com/onusshar/onusshar/releases)
2. Double-click the installer and follow the wizard
3. In Language Settings, click "Add a keyboard" under Bengali
4. Select **Onusshar**
5. Press **Win+Space** to switch keyboards

**Requirements:** Windows 10 (1809+) or Windows 11

### macOS

1. Download `Onusshar-0.3.1.dmg` from [Releases](https://github.com/onusshar/onusshar/releases)
2. Double-click the DMG and run `OnussharInstaller.pkg`
3. Follow the wizard and enter your password
4. Go to **System Settings** > **Keyboard** > **Input Sources**
5. Click **+**, select **Bengali** > **Onusshar**
6. Press **Control+Space** to switch input methods

**Requirements:** macOS Monterey (12.0) or later

### Linux

1. Download `ibus-onusshar-0.3.1.tar.gz` from [Releases](https://github.com/onusshar/onusshar/releases)
2. Extract and install:
   ```bash
   tar -xzf ibus-onusshar-0.3.1.tar.gz
   cd ibus-onusshar
   sudo python3 setup.py install
   ibus restart
   ```
3. Go to **Settings** > **Region & Language** > **Input Sources**
4. Click **+**, select **Bengali** > **Onusshar**
5. Press **Super+Space** to switch input methods

**Requirements:** IBus, Python 3.8+, pygobject

---

## ⌨️ How to Type

### Basic Examples

```
ami          → আমি          (I/me)
tumi         → তুমি         (you)
bangla       → বাংলা        (Bengali)
bhalobashi   → ভালোবাসি    (I love)
sundor       → সুন্দর       (beautiful)
```

### Sentences

```
ami bangla likhchi              → আমি বাংলা লিখছি
tumi kemon acho?                → তুমি কেমন আছো?
apni ki bangla bolte paren?     → আপনি কি বাংলা বলতে পারেন?
```

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

### Common Consonants

| Type | Get | Example |
|------|-----|---------|
| `k` | ক | `kal` → কাল |
| `kh` | খ | `khub` → খুব |
| `g` | গ | `gan` → গান |
| `ch` | চ | `chol` → চল |
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
| `r` | র | `rong` → রং |
| `l` | ল | `lal` → লাল |
| `sh` | শ | `shuru` → শুরু |
| `s` | স | `sat` → সাত |
| `h` | হ | `hat` → হাত |

### Retroflexes (Capital Letters)

| Type | Get | Example |
|------|-----|---------|
| `T` | ট | `TaTka` → টাটকা |
| `Th` | ঠ | `Thanda` → ঠান্ডা |
| `D` | ড | `Dab` → ডাব |
| `Dh` | ঢ | `Dhol` → ঢোল |
| `R` | ড় | `baRi` → বাড়ি |
| `N` | ণ | `puroNo` → পুরোণো |

### Special Characters

| Type | Get | Name |
|------|-----|------|
| `~` | ঁ | Chandrabindu |
| `Ng` | ং | Anusvara |
| `H` | ঃ | Visarga |
| `^` | ্ | Hasanta |
| `..` | । | Dari |

### Numbers

Bengali digits by default: `2025` → `২০২৫`

### Mix English & Bengali

Use backslash `\` before English words:

```
ami \John er bondhu    → আমি John এর বন্ধু
\Hello, tumi kemon acho? → Hello, তুমি কেমন আছো?
```

---

## 🔧 Building from Source

See [INSTALLERS.md](INSTALLERS.md) for building installers.

### Quick Build

```bash
git clone https://github.com/onusshar/onusshar.git
cd onusshar
npm install

# Build core
cd core && npm run build && cd ..

# Build for your platform
cd windows-ime && build-installer.bat     # Windows
cd macos-ime && ./build-installer.sh      # macOS
cd linux-ibus && python3 setup.py sdist   # Linux
```

**Documentation:**
- Windows: [windows-ime/BUILD.md](windows-ime/BUILD.md)
- macOS: [macos-ime/BUILD.md](macos-ime/BUILD.md)
- Installers: [INSTALLERS.md](INSTALLERS.md)

---

## 🗺️ Roadmap

### ✅ Completed

- **v0.1.0** - Desktop app with phonetic engine
- **v0.2.0** - Native IME for Windows & macOS
- **v0.3.0** - Linux support, dictionary, smart suggestions
- **v0.3.1** - 1550+ word dictionary, easy installers
- **v0.4.0** - Web-based typing tool, mobile-friendly

### 🚀 Upcoming

- **v0.5.0** - Browser extensions (Chrome, Firefox, Edge)
- **v1.0.0** - Mobile keyboards (Android, iOS)

---

## 🤝 Contributing

Contributions welcome!

- **Report bugs:** [GitHub Issues](https://github.com/onusshar/onusshar/issues)
- **Improve mappings:** Edit `core/src/config/default-mappings.ts`
- **Add words:** Edit dictionary files in `dictionary/src/data/`
- **Submit PRs:** Fork, make changes, test, and submit

---

## 📄 License

MIT License - Free to use, modify, and distribute.

See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

Inspired by **Avro Keyboard** and **OpenBangla Keyboard**.

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/onusshar/onusshar/issues)
- **Discussions:** [GitHub Discussions](https://github.com/onusshar/onusshar/discussions)

---

**Made with ❤️ for the Bengali-speaking community**
