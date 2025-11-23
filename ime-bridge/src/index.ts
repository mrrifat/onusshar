import { Transliterator, PhoneticMode, DigitFormat, ConversionResult } from '@onusshar/core';

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
 */
class OnussharIMEBridge implements IMEBridge {
  private transliterator: Transliterator;
  private suggestionCache: Map<string, string[]>;

  constructor() {
    this.transliterator = new Transliterator({
      mode: PhoneticMode.SMART,
      digitFormat: DigitFormat.BANGLA,
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
   * For Phase 2, returns single conversion (dictionary comes in Phase 3)
   */
  getSuggestions(input: string, limit: number = 5): string[] {
    // Check cache first
    const cacheKey = `${input}:${limit}`;
    if (this.suggestionCache.has(cacheKey)) {
      return this.suggestionCache.get(cacheKey)!;
    }

    // For now, return the converted text as the only suggestion
    // Phase 3 will add dictionary-based suggestions
    const converted = this.convert(input);
    const suggestions = converted ? [converted] : [];

    // Cache the result
    this.suggestionCache.set(cacheKey, suggestions);

    return suggestions;
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
}

// Export singleton instance
export const imeBridge = new OnussharIMEBridge();

// Export for native addon
export function createBridge(): IMEBridge {
  return new OnussharIMEBridge();
}
