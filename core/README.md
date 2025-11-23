# @onusshar/core

Core phonetic engine for Onusshar Bengali keyboard. This package provides the transliteration logic that converts Roman/Latin text to Bengali script using phonetic mappings.

## Features

- **Pure TypeScript**: Platform-agnostic transliteration engine
- **Smart Phonetic Conversion**: Context-aware vowel and consonant handling
- **Configurable**: Customizable mappings and behavior
- **Well-tested**: Comprehensive unit test coverage
- **Zero Dependencies**: Lightweight and fast

## Installation

```bash
npm install @onusshar/core
```

## Quick Start

```typescript
import { Transliterator } from '@onusshar/core';

const engine = new Transliterator();
const result = engine.convert('bangla');
console.log(result.text); // Output: বাঙলা
```

## Usage Examples

### Basic Conversion

```typescript
const engine = new Transliterator();

// Simple words
engine.convert('ami').text;          // আমি
engine.convert('tumi').text;         // তুমি
engine.convert('bhalo').text;        // ভালো

// Sentences
engine.convert('ami tomake bhalobashi').text;
// আমি তোমাকে ভালোবাষি
```

### Configuration

```typescript
import { Transliterator, PhoneticMode, DigitFormat } from '@onusshar/core';

const engine = new Transliterator({
  mode: PhoneticMode.SMART,
  digitFormat: DigitFormat.WESTERN, // Use 0-9 instead of ০-৯
  escapeChar: '\\',
  viranaChar: '^',
});
```

### Escaping to Latin

```typescript
const engine = new Transliterator();

// Use backslash to escape
engine.convert('\\hello ami').text;  // hello আমি
engine.convert('\\John bole').text;  // John বোলে
```

### Numbers

```typescript
// Bengali digits (default)
const bnEngine = new Transliterator({ digitFormat: DigitFormat.BANGLA });
bnEngine.convert('2025').text;  // ২০২৫

// Western digits
const enEngine = new Transliterator({ digitFormat: DigitFormat.WESTERN });
enEngine.convert('2025').text;  // 2025
```

### Settings Management

```typescript
import { ConfigManager } from '@onusshar/core';

// Get defaults
const settings = ConfigManager.getDefaultSettings();

// Export to JSON
const json = ConfigManager.exportSettings(settings);

// Import from JSON
const imported = ConfigManager.importSettings(json);

// Merge updates
const updated = ConfigManager.mergeSettings(settings, {
  mode: PhoneticMode.BASIC,
  digitFormat: DigitFormat.WESTERN,
});
```

## API Reference

### `Transliterator`

#### Constructor

```typescript
new Transliterator(config?: Partial<EngineConfig>)
```

#### Methods

- `convert(input: string): ConversionResult` - Convert Latin to Bengali
- `updateConfig(config: Partial<EngineConfig>): void` - Update configuration
- `getConfig(): EngineConfig` - Get current configuration
- `getMapping(): PhoneticMapping` - Get current phonetic mappings

### `ConfigManager`

Static utility class for managing user settings.

#### Methods

- `getDefaultSettings(): UserSettings` - Get default settings
- `validateSettings(settings: Partial<UserSettings>): UserSettings` - Validate settings
- `exportSettings(settings: UserSettings): string` - Export to JSON
- `importSettings(json: string): UserSettings` - Import from JSON
- `mergeSettings(existing: UserSettings, updates: Partial<UserSettings>): UserSettings` - Merge settings

## Phonetic Mapping

See the [main documentation](../docs/phonetic-layout.md) for complete mapping tables.

Quick examples:

| Input | Output | Note |
|-------|--------|------|
| `a` | আ | Independent vowel |
| `ka` | কা | Consonant + vowel sign |
| `kh` | খ | Aspirated consonant |
| `ng` | ঙ | Nasal |
| `T` | ট | Retroflex |
| `sh` | শ | Sibilant |
| `^` | ্ | Explicit hasanta |
| `~` | ঁ | Chandrabindu |

## Testing

```bash
npm test                # Run tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

## Building

```bash
npm run build
```

## License

MIT
