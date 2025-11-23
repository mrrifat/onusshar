# Onusshar Roadmap

Strategic plan for evolving Onusshar from MVP to a comprehensive Bengali input ecosystem.

## Table of Contents

1. [Vision](#vision)
2. [Phase 1: MVP (v0.1.0) - CURRENT](#phase-1-mvp-v010---current)
3. [Phase 2: Native IME (v0.2.0)](#phase-2-native-ime-v020)
4. [Phase 3: Enhanced Features (v0.3.0)](#phase-3-enhanced-features-v030)
5. [Phase 4: Cross-Platform Expansion (v0.4.0)](#phase-4-cross-platform-expansion-v040)
6. [Phase 5: Cloud & Mobile (v1.0.0)](#phase-5-cloud--mobile-v100)
7. [Long-Term Vision](#long-term-vision)
8. [Community & Governance](#community--governance)

---

## Vision

**Mission**: Make Bengali typing effortless, fast, and accessible on every platform.

**Goal**: Create the most modern, developer-friendly, open-source Bengali input ecosystem, with:
- **Ease of use**: Type as you speak
- **Speed**: Instant, lag-free conversion
- **Accessibility**: Available on all platforms (Windows, macOS, Linux, Android, iOS, Web)
- **Extensibility**: Easy to customize and extend
- **Community-driven**: Open source with active contributor community

---

## Phase 1: MVP (v0.1.0) - CURRENT

**Status**: ✅ **Completed**

**Timeline**: Q4 2024 - Q1 2025

**Goal**: Ship a working Bengali phonetic keyboard for Windows and macOS.

### Delivered Features

✅ **Core Phonetic Engine**
- TypeScript-based transliteration engine
- Comprehensive Bengali phonetic mapping (Avro-style)
- Smart vowel sign and conjunct handling
- Context-aware conversion
- JSON-based configuration
- Escape sequences for Latin text

✅ **Desktop Application (Electron)**
- Cross-platform app (Windows + macOS)
- System tray/menu bar integration
- Typing box with real-time conversion
- Copy to clipboard functionality
- Bengali/English mode toggle

✅ **Global Hotkey Support**
- Default: `Ctrl+Alt+B` (Windows) / `⌥⌘B` (macOS)
- Toggle between Bangla and English modes
- Customizable hotkey combinations

✅ **Settings Panel**
- Phonetic mode: Smart / Basic
- Digit format: Bengali (০-৯) / Western (0-9)
- Enable/disable global hotkey
- Import/Export settings as JSON

✅ **Build & Distribution**
- Windows installer (.exe via Inno Setup + NSIS)
- macOS installer (.dmg + .zip)
- Build scripts for both platforms
- Developer documentation

✅ **Documentation**
- Comprehensive README
- Architecture documentation
- Phonetic layout reference
- Platform-specific build guides

✅ **Testing**
- Unit tests for core engine (>80% coverage)
- Test cases for all phonetic rules
- Manual testing on Windows 10/11 and macOS

### Known Limitations (MVP)

❌ **Not a system-level IME**
- Typing works only in Onusshar window
- Must copy-paste to other apps
- No inline typing in Word, Chrome, etc.

❌ **No autocomplete/suggestions**
- Basic phonetic conversion only
- No predictive text or word completion

❌ **Limited platform support**
- Only Windows and macOS
- No Linux, Android, iOS support yet

---

## Phase 2: Native IME (v0.2.0)

**Status**: 📋 **Planned**

**Timeline**: Q2-Q3 2025 (6 months)

**Goal**: Implement true system-level Input Method Editors (IMEs) for Windows and macOS, enabling typing Bengali directly in any application.

### Objectives

🎯 **System-Wide Bengali Input**
- Type Bengali in Word, Chrome, VS Code, Slack, etc.
- No need for separate typing box
- Inline composition and candidate window

🎯 **Native IME Integration**
- Windows: Text Services Framework (TSF) IME
- macOS: Input Method Kit (IMK) integration
- Seamless OS integration

### Technical Approach

#### Windows TSF IME

**Implementation**:
1. **Language**: C++ or C# (.NET)
2. **Framework**: Text Services Framework (TSF)
3. **Components**:
   - `ITfTextInputProcessor` - Core IME interface
   - `ITfCompartmentEventSink` - Handle keyboard events
   - Candidate window (C++/WPF)
   - Engine integration via WASM or Node addon

**Architecture**:
```
┌─────────────────────────────────┐
│   Any Windows Application       │
│   (Word, Chrome, Notepad, etc.) │
└────────────┬────────────────────┘
             │ TSF
             ▼
┌─────────────────────────────────┐
│   Onusshar TSF IME (C++)        │
│   - ITfTextInputProcessor       │
│   - Keyboard event handler      │
│   - Candidate window            │
└────────────┬────────────────────┘
             │ Call via WASM/Node
             ▼
┌─────────────────────────────────┐
│   @onusshar/core                │
│   (Shared TypeScript Engine)    │
└─────────────────────────────────┘
```

**Work Items**:
- [ ] TSF IME skeleton in C++
- [ ] Register as system IME
- [ ] Handle keyboard events (OnKeyDown, OnComposition)
- [ ] Integrate core engine (via WebAssembly or N-API)
- [ ] Implement candidate window
- [ ] Installer integration (register IME in registry)
- [ ] Testing on Windows 10/11

#### macOS Input Method

**Implementation**:
1. **Language**: Swift or Objective-C
2. **Framework**: Input Method Kit (IMK)
3. **Components**:
   - `IMKInputController` - Core input method
   - `IMKCandidates` - Candidate window
   - Engine integration via JavaScriptCore

**Architecture**:
```
┌─────────────────────────────────┐
│   Any macOS Application         │
│   (Pages, Safari, TextEdit)     │
└────────────┬────────────────────┘
             │ Text Input API
             ▼
┌─────────────────────────────────┐
│   Onusshar Input Method (Swift) │
│   - IMKInputController          │
│   - IMKServer                   │
│   - Candidate window            │
└────────────┬────────────────────┘
             │ Call via JSCore
             ▼
┌─────────────────────────────────┐
│   @onusshar/core                │
│   (Shared TypeScript Engine)    │
└─────────────────────────────────┘
```

**Work Items**:
- [ ] Input Method app skeleton in Swift
- [ ] Register as Input Source
- [ ] Handle text input events
- [ ] Integrate core engine (via JavaScriptCore bridge)
- [ ] Implement candidate window
- [ ] .pkg installer
- [ ] Code signing and notarization
- [ ] Testing on macOS Monterey+

### Features

✨ **Inline Typing**
- Type Bengali directly in any app
- No copy-paste needed

✨ **Candidate Window**
- Show multiple suggestions as you type
- Arrow keys to select
- Enter to confirm

✨ **Smart Autocomplete** (Optional)
- Suggest word completions based on frequency
- Dictionary-based suggestions

✨ **Mode Indicator**
- System-level indicator (EN/BN)
- Status bar icon

### Risks & Challenges

⚠️ **Platform Complexity**
- TSF/IMK are complex APIs
- Steep learning curve
- Platform-specific quirks

⚠️ **Performance**
- Must be ultra-low latency (< 10ms per keystroke)
- Careful optimization needed

⚠️ **Compatibility**
- Test across all major apps (Office, browsers, IDEs)
- Handle edge cases (secure inputs, password fields)

### Success Criteria

✅ Type Bengali in Word, Chrome, Notepad++, VS Code
✅ Latency < 10ms per keystroke
✅ Candidate window shows suggestions correctly
✅ Hotkey toggle works system-wide
✅ No crashes or freezes in real-world usage

---

## Phase 3: Enhanced Features (v0.3.0)

**Status**: 📋 **Planned**

**Timeline**: Q4 2025 (3 months)

**Goal**: Add intelligent features to make typing faster and more accurate.

### Features

#### 1. Dictionary & Autocorrect

✨ **Word Dictionary**
- 50,000+ common Bengali words
- Frequency-based ranking
- User-added custom words

✨ **Autocorrect**
- Fix common typos automatically
- `amra` → `আমরা` (not `আম্রা`)
- Configurable rules

✨ **Suggestions**
- Show top 5 suggestions as you type
- Based on:
  - Phonetic match
  - Word frequency
  - User history

**Example**:
```
Type: "bha"
Suggestions:
1. ভাত (rice)
2. ভালো (good)
3. ভাষা (language)
4. ভাই (brother)
5. ভাগ (share)
```

#### 2. Linux Support

✨ **IBus Integration**
- IBus engine for Linux
- Support for both X11 and Wayland
- Works on Ubuntu, Fedora, Arch, etc.

✨ **Fcitx5 Support** (Alternative)
- Fcitx5 addon
- More lightweight than IBus

**Work Items**:
- [ ] IBus engine in C++ or Python
- [ ] Integrate @onusshar/core
- [ ] Package for major distros (.deb, .rpm, AUR)
- [ ] Testing on Ubuntu, Fedora, Arch

#### 3. User Customization

✨ **Custom Mappings**
- Add/edit phonetic rules via UI
- Per-user mapping overrides
- Example: Map `xyz` → `☺`

✨ **Themes** (UI)
- Light/Dark mode
- Custom color schemes
- Accessibility options (high contrast)

✨ **Shortcuts**
- Customizable hotkeys for:
  - Mode toggle
  - Show/hide typing window
  - Quick emoji picker

#### 4. Word Frequency Learning

✨ **Adaptive Engine**
- Learn from user's typing patterns
- Rank suggestions based on user's history
- Example: If you type "ami" 100 times, it ranks higher

✨ **Personal Dictionary**
- Auto-add frequently used words
- Sync across devices (optional)

### Success Criteria

✅ Autocorrect fixes 90% of common typos
✅ Suggestions appear < 50ms after typing
✅ Linux IME works on Ubuntu, Fedora, Arch
✅ Users can add custom mappings via UI
✅ Word frequency learning improves over time

---

## Phase 4: Cross-Platform Expansion (v0.4.0)

**Status**: 💡 **Future**

**Timeline**: Q1-Q2 2026 (6 months)

**Goal**: Bring Onusshar to mobile and web platforms.

### Platforms

#### 1. Android Keyboard

✨ **System Keyboard**
- IME service for Android
- Material Design UI
- Supports Android 8+

**Features**:
- Phonetic typing
- Suggestions row
- Swipe typing (optional)
- Themes (light/dark)
- Emoji picker

**Technology**:
- Kotlin or Java
- Android IME API
- Core engine via React Native or WASM

**Work Items**:
- [ ] Android IME service
- [ ] Integrate core engine
- [ ] UI design (Material 3)
- [ ] Publish on Google Play
- [ ] Testing on various devices

#### 2. iOS Keyboard Extension

✨ **Custom Keyboard**
- Keyboard extension for iOS
- Native Swift UI
- Supports iOS 14+

**Features**:
- Phonetic typing
- Suggestion bar
- Dark mode support
- Haptic feedback

**Technology**:
- Swift + SwiftUI
- iOS Keyboard Extension API
- Core engine via JavaScriptCore or WASM

**Work Items**:
- [ ] iOS keyboard extension
- [ ] Integrate core engine
- [ ] UI design (iOS Human Interface Guidelines)
- [ ] Publish on App Store
- [ ] Testing on iPhone/iPad

#### 3. Web Application

✨ **Browser-Based Typing Tool**
- Progressive Web App (PWA)
- Works offline
- No installation required

**Features**:
- Online typing box
- Export to Google Docs, Twitter, etc.
- Bookmarklet for in-page typing
- Chrome/Firefox extension for system-wide typing

**Technology**:
- React or Svelte
- @onusshar/core (runs in browser)
- Service Worker for offline support

**URL**: `https://onusshar.app`

**Work Items**:
- [ ] Web app (React + Vite)
- [ ] PWA manifest
- [ ] Browser extension (Chrome/Firefox)
- [ ] Integration APIs (Google Docs, Twitter)
- [ ] Deploy to Vercel/Netlify

### Success Criteria

✅ Android keyboard on Google Play with 10k+ downloads
✅ iOS keyboard on App Store with 5k+ downloads
✅ Web app accessible at onusshar.app
✅ Browser extension for Chrome & Firefox
✅ Cross-platform feature parity (same mappings, settings)

---

## Phase 5: Cloud & Mobile (v1.0.0)

**Status**: 💡 **Future**

**Timeline**: Q3-Q4 2026 (6 months)

**Goal**: Add cloud sync, collaboration, and advanced AI features.

### Features

#### 1. Cloud Sync

✨ **Settings Sync**
- Sync settings across all devices
- Custom mappings
- Personal dictionary
- Typing history

**Implementation**:
- Backend: Supabase or Firebase
- Authentication: Google, Apple, GitHub
- End-to-end encryption for privacy

#### 2. Collaborative Typing

✨ **Real-Time Collaboration**
- Multiple users type in same document
- Operational Transform (OT) or CRDTs
- Example: Bengali Google Docs alternative

#### 3. AI-Powered Features

✨ **Smart Suggestions**
- Next-word prediction using ML
- Grammar correction
- Sentence completion

**Example**:
```
Type: "ami tomake"
AI suggests: "bhalobashi" (I love you)
```

✨ **Translation**
- Bengali ↔ English translation
- Inline translation hints

✨ **Voice Typing**
- Speech-to-Bengali text
- Using Web Speech API or native APIs

#### 4. Developer API

✨ **Public API**
- REST API for transliteration
- NPM package for developers
- Embed Onusshar in apps

**Example**:
```typescript
import { transliterate } from '@onusshar/api';

const result = transliterate('bangla');
console.log(result); // "বাঙলা"
```

### Success Criteria

✅ 100k+ active users across all platforms
✅ Cloud sync works seamlessly
✅ AI suggestions improve typing speed by 20%
✅ Developer API used by 50+ third-party apps
✅ App featured in major tech publications

---

## Long-Term Vision

### 2027 and Beyond

🌟 **Comprehensive Bengali Ecosystem**
- **Input**: Onusshar (phonetic keyboard)
- **Voice**: Speech-to-text for Bengali
- **OCR**: Image-to-Bengali text recognition
- **Translation**: Real-time Bengali ↔ 100+ languages
- **Education**: Learn Bengali typing (gamified)

🌟 **Community Platform**
- User forums and discussions
- Contribution marketplace (themes, mappings)
- Bounties for features
- Annual Onusshar conference

🌟 **Enterprise Features**
- SSO for organizations
- Admin dashboard
- Custom branding
- SLA and support

🌟 **Research & Innovation**
- Partner with linguistics departments
- Publish research on Bengali NLP
- Open dataset of Bengali typing patterns
- Contribute to Unicode Consortium

---

## Community & Governance

### Open Source Model

**License**: MIT (permissive, business-friendly)

**Governance**:
- Core team of 3-5 maintainers
- Community voting on major decisions
- Transparent roadmap and issue tracking

### Contribution Areas

1. **Code**: Core engine, platform implementations, UI
2. **Design**: UI/UX, icons, themes
3. **Linguistics**: Phonetic mappings, dictionary
4. **Documentation**: Guides, tutorials, translations
5. **Testing**: Bug reports, QA, platform testing
6. **Marketing**: Blog posts, social media, talks

### Funding

**Sustainability**:
- GitHub Sponsors
- OpenCollective
- Optional premium features (cloud sync, AI)
- Enterprise support contracts

**Transparency**: All funding and expenses public

---

## Release Schedule

### Planned Releases

| Version | Target Date | Focus |
|---------|-------------|-------|
| v0.1.0 | Q1 2025 | ✅ MVP (Desktop app) |
| v0.2.0 | Q3 2025 | Native IME (Windows, macOS) |
| v0.3.0 | Q4 2025 | Enhanced features (autocorrect, Linux) |
| v0.4.0 | Q2 2026 | Mobile & Web (Android, iOS) |
| v1.0.0 | Q4 2026 | Cloud & AI features |
| v2.0.0 | 2027+ | Next-gen innovations |

### Versioning

**Semantic Versioning** (semver):
- **Major** (v1.0.0): Breaking changes
- **Minor** (v0.2.0): New features, backward-compatible
- **Patch** (v0.1.1): Bug fixes only

---

## How to Contribute to Roadmap

We welcome community input on the roadmap!

**Ways to contribute**:

1. **Vote on features**: React to GitHub issues with 👍/👎
2. **Propose features**: Open a GitHub Discussion
3. **Sponsor development**: Fund specific features via bounties
4. **Join core team**: Become a maintainer (after consistent contributions)

**Feature Requests**:
- Open issue with `[Feature Request]` tag
- Describe use case and benefit
- Community discussion
- Core team review
- Add to roadmap if approved

---

## Success Metrics

### Key Performance Indicators (KPIs)

| Metric | v0.1.0 | v0.2.0 | v1.0.0 |
|--------|--------|--------|--------|
| Active Users | 1k | 10k | 100k |
| GitHub Stars | 100 | 500 | 2000 |
| Contributors | 5 | 20 | 50 |
| Platforms | 2 | 4 | 7 |
| App Rating | 4.0 | 4.5 | 4.8 |

### User Satisfaction

- **NPS Score**: > 50 (promoters - detractors)
- **App Store Rating**: > 4.5 stars
- **Community Sentiment**: Positive on social media, forums

---

## Conclusion

Onusshar's roadmap is ambitious but achievable. By starting with a solid MVP and iterating based on user feedback, we aim to build the **best Bengali input system ever created**.

**Join us on this journey!**

- ⭐ **Star** on GitHub
- 💬 **Discuss** features
- 🛠️ **Contribute** code
- 📣 **Share** with friends

**Together, we'll make Bengali typing effortless for millions.**

---

**Last Updated**: January 2025
