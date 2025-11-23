/**
 * Onusshar Core - Bengali Phonetic Keyboard Engine
 *
 * Main entry point for the core transliteration engine.
 * This module exports all necessary types, classes, and utilities
 * for building Bengali phonetic input applications.
 */

export { Transliterator } from './engine/transliterator';
export { ConfigManager } from './engine/config-manager';
export { defaultMapping } from './config/default-mappings';

export {
  TypingMode,
  DigitFormat,
  PhoneticMode,
  type PhoneticRule,
  type PhoneticMapping,
  type EngineConfig,
  type ConversionResult,
  type UserSettings,
} from './types';
