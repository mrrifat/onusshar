import { Transliterator } from '@onusshar/core';
import {
  DictionaryWord,
  Suggestion,
  SuggestionSource,
  DictionaryConfig,
  UserLearningData,
} from './types';

/**
 * Smart suggestion engine with dictionary, phonetic, and learning
 */
export class SuggestionEngine {
  private transliterator: Transliterator;
  private dictionary: Map<string, DictionaryWord>;
  private phoneticIndex: Map<string, string[]>; // phonetic -> bengali words
  private userLearning: UserLearningData;
  private config: DictionaryConfig;

  constructor(
    words: DictionaryWord[],
    config: Partial<DictionaryConfig> = {},
    userLearning?: UserLearningData
  ) {
    this.transliterator = new Transliterator();

    this.config = {
      maxSuggestions: 9,
      enableAutocorrect: true,
      enableUserLearning: true,
      minWordLength: 1,
      phoneticWeight: 0.4,
      dictionaryWeight: 0.4,
      userHistoryWeight: 0.2,
      ...config,
    };

    // Build dictionary index
    this.dictionary = new Map();
    this.phoneticIndex = new Map();

    for (const word of words) {
      this.dictionary.set(word.word, word);

      // Build phonetic index
      if (word.phonetic) {
        const key = word.phonetic.toLowerCase();
        if (!this.phoneticIndex.has(key)) {
          this.phoneticIndex.set(key, []);
        }
        this.phoneticIndex.get(key)!.push(word.word);
      }
    }

    // Initialize user learning
    this.userLearning = userLearning || {
      wordFrequency: new Map(),
      customWords: new Set(),
      corrections: new Map(),
      lastUpdated: new Date(),
    };
  }

  /**
   * Get suggestions for input text
   */
  getSuggestions(input: string): Suggestion[] {
    if (!input || input.length < this.config.minWordLength) {
      return [];
    }

    const suggestions: Suggestion[] = [];

    // 1. Phonetic conversion (always include)
    const phonetic = this.getPhoneticSuggestion(input);
    if (phonetic) {
      suggestions.push(phonetic);
    }

    // 2. Dictionary matches
    const dictionaryMatches = this.getDictionaryMatches(input);
    suggestions.push(...dictionaryMatches);

    // 3. User history matches
    if (this.config.enableUserLearning) {
      const userMatches = this.getUserHistoryMatches(input);
      suggestions.push(...userMatches);
    }

    // 4. Autocorrect suggestions
    if (this.config.enableAutocorrect) {
      const autocorrectSuggestions = this.getAutocorrectSuggestions(input);
      suggestions.push(...autocorrectSuggestions);
    }

    // Remove duplicates and sort by score
    const uniqueSuggestions = this.deduplicateAndRank(suggestions);

    // Return top N suggestions
    return uniqueSuggestions.slice(0, this.config.maxSuggestions);
  }

  /**
   * Get phonetic conversion suggestion
   */
  private getPhoneticSuggestion(input: string): Suggestion | null {
    const converted = this.transliterator.convert(input).text;
    if (!converted || converted === input) {
      return null;
    }

    // Calculate score based on configuration
    const score = this.config.phoneticWeight;

    return {
      word: converted,
      score,
      source: SuggestionSource.PHONETIC,
    };
  }

  /**
   * Get dictionary matches
   */
  private getDictionaryMatches(input: string): Suggestion[] {
    const suggestions: Suggestion[] = [];
    const inputLower = input.toLowerCase();

    // Exact phonetic match
    if (this.phoneticIndex.has(inputLower)) {
      const words = this.phoneticIndex.get(inputLower)!;
      for (const word of words) {
        const dictWord = this.dictionary.get(word);
        if (dictWord) {
          suggestions.push({
            word: dictWord.word,
            score: this.config.dictionaryWeight * (dictWord.frequency / 10000),
            source: SuggestionSource.DICTIONARY,
            metadata: {
              frequency: dictWord.frequency,
              category: dictWord.category,
            },
          });
        }
      }
    }

    // Prefix matches (for autocomplete)
    for (const [phonetic, words] of this.phoneticIndex.entries()) {
      if (phonetic.startsWith(inputLower) && phonetic !== inputLower) {
        for (const word of words) {
          const dictWord = this.dictionary.get(word);
          if (dictWord) {
            // Lower score for prefix matches
            const prefixBonus = 1 - (phonetic.length - inputLower.length) / 10;
            suggestions.push({
              word: dictWord.word,
              score: this.config.dictionaryWeight * (dictWord.frequency / 10000) * prefixBonus * 0.7,
              source: SuggestionSource.DICTIONARY,
              metadata: {
                frequency: dictWord.frequency,
                category: dictWord.category,
              },
            });
          }
        }
      }
    }

    return suggestions;
  }

  /**
   * Get user history matches
   */
  private getUserHistoryMatches(input: string): Suggestion[] {
    const suggestions: Suggestion[] = [];
    const converted = this.transliterator.convert(input).text;

    // Check if user has typed this word before
    const userCount = this.userLearning.wordFrequency.get(converted) || 0;
    if (userCount > 0) {
      // Boost score based on user frequency
      const userScore = Math.min(userCount / 100, 1); // Normalize to 0-1
      suggestions.push({
        word: converted,
        score: this.config.userHistoryWeight * userScore,
        source: SuggestionSource.USER_HISTORY,
        metadata: {
          userCount,
        },
      });
    }

    // Check custom words
    for (const customWord of this.userLearning.customWords) {
      if (customWord.startsWith(converted)) {
        suggestions.push({
          word: customWord,
          score: this.config.userHistoryWeight * 0.8,
          source: SuggestionSource.USER_HISTORY,
        });
      }
    }

    return suggestions;
  }

  /**
   * Get autocorrect suggestions
   */
  private getAutocorrectSuggestions(input: string): Suggestion[] {
    const suggestions: Suggestion[] = [];

    // Common typing mistakes in phonetic Bengali
    const corrections: Record<string, string> = {
      // Double consonants
      'shh': 'sh',
      'chh': 'ch',

      // Common typos
      'oa': 'o',
      'ao': 'o',
      'ie': 'i',
      'ei': 'i',

      // Case mistakes
      'rr': 'r',
      'tt': 't',
      'dd': 'd',
    };

    let corrected = input.toLowerCase();
    let wasCorrected = false;

    for (const [wrong, right] of Object.entries(corrections)) {
      if (corrected.includes(wrong)) {
        corrected = corrected.replace(new RegExp(wrong, 'g'), right);
        wasCorrected = true;
      }
    }

    if (wasCorrected) {
      const converted = this.transliterator.convert(corrected).text;
      suggestions.push({
        word: converted,
        score: 0.6, // Moderate confidence for autocorrect
        source: SuggestionSource.AUTOCORRECT,
      });
    }

    return suggestions;
  }

  /**
   * Remove duplicates and rank by score
   */
  private deduplicateAndRank(suggestions: Suggestion[]): Suggestion[] {
    // Group by word
    const wordMap = new Map<string, Suggestion>();

    for (const suggestion of suggestions) {
      const existing = wordMap.get(suggestion.word);
      if (!existing || suggestion.score > existing.score) {
        wordMap.set(suggestion.word, suggestion);
      } else if (existing) {
        // Combine scores from different sources
        existing.score = Math.max(existing.score, suggestion.score);
      }
    }

    // Convert back to array and sort
    const unique = Array.from(wordMap.values());
    unique.sort((a, b) => b.score - a.score);

    return unique;
  }

  /**
   * Learn from user input (called when user commits a word)
   */
  learnWord(word: string): void {
    if (!this.config.enableUserLearning) {
      return;
    }

    const count = this.userLearning.wordFrequency.get(word) || 0;
    this.userLearning.wordFrequency.set(word, count + 1);
    this.userLearning.lastUpdated = new Date();
  }

  /**
   * Add custom word
   */
  addCustomWord(bengaliWord: string, phoneticSpelling?: string): void {
    this.userLearning.customWords.add(bengaliWord);

    if (phoneticSpelling) {
      const key = phoneticSpelling.toLowerCase();
      if (!this.phoneticIndex.has(key)) {
        this.phoneticIndex.set(key, []);
      }
      this.phoneticIndex.get(key)!.push(bengaliWord);
    }
  }

  /**
   * Get user learning data (for persistence)
   */
  getUserLearningData(): UserLearningData {
    return {
      ...this.userLearning,
      wordFrequency: new Map(this.userLearning.wordFrequency),
      customWords: new Set(this.userLearning.customWords),
      corrections: new Map(this.userLearning.corrections),
    };
  }

  /**
   * Clear user learning data
   */
  clearUserLearning(): void {
    this.userLearning.wordFrequency.clear();
    this.userLearning.customWords.clear();
    this.userLearning.corrections.clear();
    this.userLearning.lastUpdated = new Date();
  }
}
