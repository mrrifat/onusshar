/**
 * Typing mode configuration
 */
export enum TypingMode {
  ENGLISH = 'english',
  BANGLA = 'bangla',
}

/**
 * Digit format configuration
 */
export enum DigitFormat {
  WESTERN = 'western', // 0-9
  BANGLA = 'bangla',   // ০-৯
}

/**
 * Phonetic parsing mode
 */
export enum PhoneticMode {
  SMART = 'smart',     // Full mapping with heuristics and smart conjuncts
  BASIC = 'basic',     // Minimal mapping, fewer auto-corrections
}

/**
 * Phonetic mapping rules for a single character or sequence
 */
export interface PhoneticRule {
  pattern: string;      // Input pattern (Latin)
  output: string;       // Output character(s) (Bangla)
  priority?: number;    // Higher priority rules match first (default: 0)
  context?: {
    preceding?: string; // Regex pattern for preceding context
    following?: string; // Regex pattern for following context
  };
}

/**
 * Complete phonetic mapping configuration
 */
export interface PhoneticMapping {
  vowels: PhoneticRule[];
  consonants: PhoneticRule[];
  vowelSigns: PhoneticRule[];
  specialChars: PhoneticRule[];
  numbers: PhoneticRule[];
  punctuation: PhoneticRule[];
}

/**
 * Engine configuration options
 */
export interface EngineConfig {
  mode: PhoneticMode;
  digitFormat: DigitFormat;
  escapeChar: string;           // Default: '\' for escaping to raw Latin
  viranaChar: string;           // Default: '^' to insert explicit halant (◌্)
  customMappings?: Partial<PhoneticMapping>;
}

/**
 * Conversion result with metadata
 */
export interface ConversionResult {
  text: string;           // Converted Bangla text
  cursorPosition?: number; // Suggested cursor position
  suggestions?: string[]; // Alternative suggestions (for future autocomplete)
}

/**
 * Settings that can be persisted/imported/exported
 */
export interface UserSettings {
  mode: PhoneticMode;
  digitFormat: DigitFormat;
  enableHotkey: boolean;
  hotkeyModifiers: string[];
  hotkeyKey: string;
}
