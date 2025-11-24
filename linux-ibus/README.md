# Onusshar for IBus (Linux)

IBus (Intelligent Input Bus) engine for Onusshar Bengali Phonetic Keyboard.

## Overview

This is the Linux implementation of Onusshar using IBus, the most popular input method framework on Linux. It enables system-wide Bengali phonetic typing on Ubuntu, Fedora, Debian, Arch, and other Linux distributions.

## Features

- ✅ System-wide Bengali input in any application
- ✅ Smart phonetic conversion
- ✅ Word suggestions in lookup table
- ✅ Candidate selection with number keys (1-9)
- ✅ Arrow key navigation in lookup table
- ✅ Works with GTK, Qt, and other toolkits

## Architecture

```
┌─────────────────────────────────┐
│   Any Linux Application         │
│   (Firefox, LibreOffice, etc.)  │
└────────────┬────────────────────┘
             │ IBus Protocol
             ▼
┌─────────────────────────────────┐
│   IBus Daemon                   │
│   (ibus-daemon)                 │
└────────────┬────────────────────┘
             │ D-Bus
             ▼
┌─────────────────────────────────┐
│   Onusshar IBus Engine          │
│   (ibus-engine-onusshar)        │
│  ┌──────────────────────────┐   │
│  │ OnussharEngine           │   │
│  │ - Process key events     │   │
│  │ - Manage composition     │   │
│  │ - Update lookup table    │   │
│  ├──────────────────────────┤   │
│  │ PhoneticTransliterator   │   │
│  │ - Convert Latin to BN    │   │
│  ├──────────────────────────┤   │
│  │ SuggestionProvider       │   │
│  │ - Dictionary lookup      │   │
│  │ - Autocomplete           │   │
│  └──────────────────────────┘   │
└─────────────────────────────────┘
```

## Requirements

### Runtime Dependencies

- Python 3.8+
- python3-gi (PyGObject)
- IBus 1.5.0+
- typelib-1_0-IBus-1_0 (GObject introspection)

### Build Dependencies

- python3-setuptools
- python3-pip (optional, for pip install)

## Installation

### From Source

```bash
# 1. Install dependencies
# Ubuntu/Debian:
sudo apt install python3-gi ibus libibus-1.0-dev

# Fedora:
sudo dnf install python3-gobject ibus ibus-devel

# Arch:
sudo pacman -S python-gobject ibus

# 2. Build and install
cd linux-ibus
sudo python3 setup.py install

# 3. Restart IBus
ibus restart

# 4. Register engine
ibus-daemon -drx
```

### Using pip (Alternative)

```bash
cd linux-ibus
sudo pip3 install .
ibus restart
```

## Configuration

### Enable Onusshar in IBus

#### GUI Method

1. Open **IBus Preferences**:
   ```bash
   ibus-setup
   ```

2. Go to **Input Method** tab

3. Click **Add** button

4. Select **Bengali** language

5. Find and select **Onusshar**

6. Click **Add**

#### Command Line Method

```bash
# Add Onusshar to IBus
gsettings set org.freedesktop.ibus.general preload-engines "['onusshar']"

# Set as default for Bengali
gsettings set org.freedesktop.ibus.general engines-order "['onusshar']"
```

### Switching Input Methods

- **Super + Space** (default IBus hotkey)
- Or click IBus tray icon in system tray

## Usage

### Basic Typing

1. Switch to Onusshar (Super + Space)
2. Type phonetically:
   ```
   bangla → বাংলা
   ami    → আমি
   tumi   → তুমি
   ```
3. Press **Enter** to commit
4. Press **Esc** to cancel

### Candidate Selection

When suggestions appear:

- **Press 1-9**: Select candidate by number
- **Arrow keys**: Navigate candidates
- **Page Up/Down**: Navigate pages
- **Enter**: Commit highlighted candidate
- **Esc**: Cancel and clear suggestions

### Example

```
Type: bha
Suggestions appear:
  1. ভা
  2. ভালো
  3. ভাই
  4. ভাষা

Press 2 → commits "ভালো"
```

## Testing

```bash
# Test the engine manually
/usr/libexec/ibus-engine-onusshar --ibus

# In another terminal, restart IBus
ibus restart

# Open a text editor and test typing
gedit
```

## Debugging

### Enable Debug Logging

```bash
# Run engine with debug output
IBUS_ONUSSHAR_DEBUG=1 /usr/libexec/ibus-engine-onusshar --ibus

# View IBus logs
journalctl -f | grep ibus
```

### Common Issues

#### Engine not showing in IBus preferences

- Check if XML file is installed:
  ```bash
  ls /usr/share/ibus/component/onusshar.xml
  ```
- Restart IBus:
  ```bash
  ibus restart
  ```

#### Typing not working

- Verify engine is running:
  ```bash
  ps aux | grep ibus-engine-onusshar
  ```
- Check IBus connection:
  ```bash
  ibus list-engine | grep onusshar
  ```

#### No suggestions appearing

- Check Python module import:
  ```bash
  python3 -c "from onusshar_ibus.engine import OnussharEngine"
  ```

## File Structure

```
linux-ibus/
├── bin/
│   └── ibus-engine-onusshar          # Engine executable
├── data/
│   ├── onusshar.xml                  # IBus component descriptor
│   └── onusshar.svg                  # Engine icon
├── onusshar_ibus/
│   ├── __init__.py                   # Package init
│   ├── engine.py                     # Main IBus engine
│   ├── transliterator.py             # Phonetic conversion
│   └── suggestions.py                # Dictionary & suggestions
├── setup.py                          # Installation script
└── README.md                         # This file
```

## Integration with @onusshar/dictionary

Phase 3.1 will integrate the full @onusshar/dictionary package:

```python
# Future integration
from onusshar_dictionary import SuggestionEngine, commonWords

class SuggestionProvider:
    def __init__(self):
        # Load full 50,000+ word dictionary
        self.engine = SuggestionEngine(commonWords)

    def get_suggestions(self, input):
        suggestions = self.engine.getSuggestions(input)
        return [s.word for s in suggestions]
```

## Uninstallation

```bash
# Remove installed files
sudo pip3 uninstall ibus-onusshar

# Or if installed with setup.py
sudo rm -f /usr/libexec/ibus-engine-onusshar
sudo rm -f /usr/share/ibus/component/onusshar.xml
sudo rm -f /usr/share/icons/onusshar.svg

# Restart IBus
ibus restart
```

## Distribution Packages

### Debian/Ubuntu (.deb)

Coming soon: `onusshar-ibus_0.3.0_all.deb`

```bash
sudo dpkg -i onusshar-ibus_0.3.0_all.deb
sudo apt-get install -f  # Install dependencies
```

### Fedora/RHEL (.rpm)

Coming soon: `onusshar-ibus-0.3.0-1.noarch.rpm`

```bash
sudo dnf install onusshar-ibus-0.3.0-1.noarch.rpm
```

### Arch Linux (AUR)

Coming soon: `onusshar-ibus` in AUR

```bash
yay -S onusshar-ibus
```

## Platform Support

| Distribution | Version | Status |
|--------------|---------|--------|
| Ubuntu | 20.04+ | ✅ Tested |
| Debian | 11+ | ✅ Tested |
| Fedora | 35+ | ✅ Tested |
| Arch Linux | Rolling | ✅ Tested |
| openSUSE | Leap 15.3+ | ⚠️ Not tested |
| Linux Mint | 20+ | ✅ Compatible (Ubuntu-based) |

## License

MIT License - see [LICENSE](../../LICENSE)

## References

- [IBus Documentation](https://github.com/ibus/ibus/wiki)
- [IBus Python Tutorial](https://github.com/ibus/ibus/wiki/DevHowtoWriteEngineInPython)
- [PyGObject API](https://pygobject.readthedocs.io/)
