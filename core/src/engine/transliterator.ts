import {
  PhoneticMapping,
  PhoneticRule,
  EngineConfig,
  ConversionResult,
  PhoneticMode,
  DigitFormat,
} from '../types';
import { defaultMapping } from '../config/default-mappings';

/**
 * Core transliteration engine for converting Latin input to Bengali
 */
export class Transliterator {
  private config: EngineConfig;
  private mapping: PhoneticMapping;

  // Bengali Unicode ranges
  private readonly BANGLA_CONSONANTS = /[ক-হড়ঢ়য়]/;
  private readonly BANGLA_VOWEL_SIGNS = /[া-ৌ]/;
  private readonly BANGLA_VOWELS = /[অ-ঔ]/;
  private readonly HASANTA = '্';

  constructor(config?: Partial<EngineConfig>) {
    this.config = {
      mode: PhoneticMode.SMART,
      digitFormat: DigitFormat.BANGLA,
      escapeChar: '\\',
      viranaChar: '^',
      ...config,
    };

    // Merge custom mappings with defaults
    this.mapping = {
      vowels: [...defaultMapping.vowels, ...(config?.customMappings?.vowels || [])],
      consonants: [...defaultMapping.consonants, ...(config?.customMappings?.consonants || [])],
      vowelSigns: [...defaultMapping.vowelSigns, ...(config?.customMappings?.vowelSigns || [])],
      specialChars: [
        ...defaultMapping.specialChars,
        ...(config?.customMappings?.specialChars || []),
      ],
      numbers: [...defaultMapping.numbers, ...(config?.customMappings?.numbers || [])],
      punctuation: [
        ...defaultMapping.punctuation,
        ...(config?.customMappings?.punctuation || []),
      ],
    };

    // Sort rules by priority (higher first)
    this.sortRulesByPriority();
  }

  /**
   * Convert Latin text to Bengali
   */
  convert(input: string): ConversionResult {
    if (!input) {
      return { text: '' };
    }

    let result = '';
    let i = 0;
    let escaped = false;
    let escapeBuffer = '';

    while (i < input.length) {
      const char = input[i];

      // Handle escape sequences
      if (char === this.config.escapeChar && !escaped) {
        // Flush any escape buffer
        if (escapeBuffer) {
          result += escapeBuffer;
          escapeBuffer = '';
        }
        escaped = true;
        i++;
        continue;
      }

      if (escaped) {
        // In escape mode, output raw Latin
        if (char === ' ' || char === '\n') {
          // Space or newline ends escape mode
          result += escapeBuffer + char;
          escapeBuffer = '';
          escaped = false;
        } else {
          escapeBuffer += char;
        }
        i++;
        continue;
      }

      // Try to match phonetic rules
      const match = this.findLongestMatch(input, i);

      if (match) {
        // Check if we need to add hasanta before vowel sign
        const converted = this.smartConvert(result, match.output, match.pattern);
        result += converted;
        i += match.pattern.length;
      } else {
        // No match, output character as-is
        result += char;
        i++;
      }
    }

    // Flush remaining escape buffer
    if (escapeBuffer) {
      result += escapeBuffer;
    }

    return { text: result };
  }

  /**
   * Find the longest matching phonetic rule at current position
   */
  private findLongestMatch(input: string, position: number): PhoneticRule | null {
    let longestMatch: PhoneticRule | null = null;
    let longestLength = 0;

    // Check all rule categories
    const allRules = [
      ...this.mapping.specialChars,
      ...this.mapping.consonants,
      ...this.mapping.vowels,
      ...this.mapping.vowelSigns,
      ...(this.config.digitFormat === DigitFormat.BANGLA ? this.mapping.numbers : []),
      ...this.mapping.punctuation,
    ];

    for (const rule of allRules) {
      const pattern = rule.pattern;
      const slice = input.slice(position, position + pattern.length);

      if (slice.toLowerCase() === pattern.toLowerCase()) {
        // Check context if specified
        if (rule.context) {
          const preceding = input.slice(0, position);
          const following = input.slice(position + pattern.length);

          if (rule.context.preceding) {
            const regex = new RegExp(rule.context.preceding + '$');
            if (!regex.test(preceding)) continue;
          }

          if (rule.context.following) {
            const regex = new RegExp('^' + rule.context.following);
            if (!regex.test(following)) continue;
          }
        }

        // Keep longest match (with priority tiebreaker)
        if (
          pattern.length > longestLength ||
          (pattern.length === longestLength &&
            (rule.priority || 0) > (longestMatch?.priority || 0))
        ) {
          longestMatch = rule;
          longestLength = pattern.length;
        }
      }
    }

    return longestMatch;
  }

  /**
   * Smart conversion with context awareness
   * Handles vowel sign placement and conjunct formation
   */
  private smartConvert(
    precedingText: string,
    output: string,
    pattern: string
  ): string {
    if (this.config.mode === PhoneticMode.BASIC) {
      return output;
    }

    // Get the last character of preceding text
    const lastChar = precedingText[precedingText.length - 1];
    const secondLastChar = precedingText[precedingText.length - 2];

    // If output is a vowel sign (kar), check if we should convert it
    if (this.isVowelSign(output)) {
      // If last char is consonant (optionally with hasanta), replace vowel with vowel sign
      if (this.BANGLA_CONSONANTS.test(lastChar)) {
        return output;
      } else if (lastChar === this.HASANTA && this.BANGLA_CONSONANTS.test(secondLastChar)) {
        // After hasanta, we need to keep the vowel sign
        return output;
      } else {
        // Convert vowel sign to independent vowel
        return this.vowelSignToVowel(output);
      }
    }

    // If output is independent vowel at start or after space/punctuation
    if (this.BANGLA_VOWELS.test(output)) {
      // If preceded by consonant, convert to vowel sign
      if (this.BANGLA_CONSONANTS.test(lastChar)) {
        return this.vowelToVowelSign(output);
      } else if (lastChar === this.HASANTA && this.BANGLA_CONSONANTS.test(secondLastChar)) {
        // After explicit hasanta, use vowel sign
        return this.vowelToVowelSign(output);
      }
    }

    return output;
  }

  /**
   * Check if character is a Bengali vowel sign
   */
  private isVowelSign(char: string): boolean {
    return this.BANGLA_VOWEL_SIGNS.test(char) || char === 'ি' || char === 'ী';
  }

  /**
   * Convert vowel sign to independent vowel
   */
  private vowelSignToVowel(sign: string): string {
    const mapping: Record<string, string> = {
      'া': 'আ',
      'ি': 'ই',
      'ী': 'ঈ',
      'ু': 'উ',
      'ূ': 'ঊ',
      'ৃ': 'ঋ',
      'ে': 'এ',
      'ৈ': 'ঐ',
      'ো': 'ও',
      'ৌ': 'ঔ',
    };
    return mapping[sign] || sign;
  }

  /**
   * Convert independent vowel to vowel sign
   */
  private vowelToVowelSign(vowel: string): string {
    const mapping: Record<string, string> = {
      'আ': 'া',
      'ই': 'ি',
      'ঈ': 'ী',
      'উ': 'ু',
      'ঊ': 'ূ',
      'ঋ': 'ৃ',
      'এ': 'ে',
      'ঐ': 'ৈ',
      'ও': 'ো',
      'ঔ': 'ৌ',
      'অ': '', // No sign for inherent 'a'
    };
    return mapping[vowel] || vowel;
  }

  /**
   * Sort all rules by priority (descending) and pattern length (descending)
   */
  private sortRulesByPriority(): void {
    const sorter = (a: PhoneticRule, b: PhoneticRule) => {
      const priorityDiff = (b.priority || 0) - (a.priority || 0);
      if (priorityDiff !== 0) return priorityDiff;
      return b.pattern.length - a.pattern.length;
    };

    this.mapping.vowels.sort(sorter);
    this.mapping.consonants.sort(sorter);
    this.mapping.vowelSigns.sort(sorter);
    this.mapping.specialChars.sort(sorter);
    this.mapping.numbers.sort(sorter);
    this.mapping.punctuation.sort(sorter);
  }

  /**
   * Update engine configuration
   */
  updateConfig(config: Partial<EngineConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current configuration
   */
  getConfig(): EngineConfig {
    return { ...this.config };
  }

  /**
   * Get current mapping
   */
  getMapping(): PhoneticMapping {
    return this.mapping;
  }
}
