import { Transliterator, PhoneticMode, DigitFormat, ConversionResult } from '@onusshar/core';
import { createDefaultEngine, SuggestionEngine, Suggestion } from '@onusshar/dictionary';

/**
 * Bridge interface for native IME integration
 * This TypeScript module wraps the core engine for native addon access
 */

export interface IMEBridge {
  convert(input: string): string;
  getSuggestions(input: string, limit: number): string[];
  updateConfig(mode: PhoneticMode, digitFormat: DigitFormat): void;
}

/**
 * Singleton bridge instance for native IME
 * Now with comprehensive dictionary support (1550+ words)
 */
class OnussharIMEBridge implements IMEBridge {
  private transliterator: Transliterator;
  private suggestionEngine: SuggestionEngine;
  private suggestionCache: Map<string, string[]>;

  constructor() {
    this.transliterator = new Transliterator({
      mode: PhoneticMode.SMART,
      digitFormat: DigitFormat.BANGLA,
    });

    // Initialize suggestion engine with comprehensive dictionary
    this.suggestionEngine = createDefaultEngine({
      maxSuggestions: 9,  // Match Windows IME candidate limit
      enableAutocorrect: true,
      enableUserLearning: true,
      minWordLength: 1,
      phoneticWeight: 0.4,
      dictionaryWeight: 0.4,
      userHistoryWeight: 0.2,
    });

    this.suggestionCache = new Map();
  }

  /**
   * Convert Latin input to Bengali
   */
  convert(input: string): string {
    try {
      const result = this.transliterator.convert(input);
      return result.text;
    } catch (error) {
      console.error('Conversion error:', error);
      return input; // Fallback to original input
    }
  }

  /**
   * Get suggestions for partial input
   * Phase 3.1: Now with comprehensive dictionary (1550+ words)
   */
  getSuggestions(input: string, limit: number = 9): string[] {
    if (!input || input.trim().length === 0) {
      return [];
    }

    // Check cache first
    const cacheKey = `${input}:${limit}`;
    if (this.suggestionCache.has(cacheKey)) {
      return this.suggestionCache.get(cacheKey)!;
    }

    try {
      // Get smart suggestions from dictionary engine
      const suggestions: Suggestion[] = this.suggestionEngine.getSuggestions(input);

      // Extract words and limit to requested count
      const words = suggestions
        .slice(0, limit)
        .map(s => s.word);

      // If no dictionary suggestions, fall back to phonetic conversion
      if (words.length === 0) {
        const converted = this.convert(input);
        if (converted && converted !== input) {
          words.push(converted);
        }
      }

      // Cache the result
      this.suggestionCache.set(cacheKey, words);

      return words;
    } catch (error) {
      console.error('Suggestion error:', error);

      // Fallback to simple phonetic conversion
      const converted = this.convert(input);
      return converted && converted !== input ? [converted] : [];
    }
  }

  /**
   * Update engine configuration
   */
  updateConfig(mode: PhoneticMode, digitFormat: DigitFormat): void {
    this.transliterator.updateConfig({ mode, digitFormat });
    // Clear cache when config changes
    this.suggestionCache.clear();
  }

  /**
   * Clear suggestion cache
   */
  clearCache(): void {
    this.suggestionCache.clear();
  }

  /**
   * Learn a word from user typing
   */
  learnWord(word: string): void {
    try {
      this.suggestionEngine.learnWord(word);
    } catch (error) {
      console.error('Learn word error:', error);
    }
  }

  /**
   * Get dictionary statistics
   */
  getStats() {
    return {
      cacheSize: this.suggestionCache.size,
      // Could expose more stats from suggestionEngine if needed
    };
  }
}

// Export singleton instance
export const imeBridge = new OnussharIMEBridge();

// Export for native addon
export function createBridge(): IMEBridge {
  return new OnussharIMEBridge();
}
