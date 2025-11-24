/**
 * @onusshar/dictionary - Bengali word dictionary with smart suggestions
 *
 * Main entry point
 */

export { SuggestionEngine } from './suggestion-engine';
export { commonWords } from './data/common-words';

// Export comprehensive dictionary (1500+ words)
export {
  allWords,
  wordMap,
  phoneticMap,
  wordsByFrequency,
  getWordsByCategory,
  searchByPhoneticPrefix,
  searchByBengaliPrefix,
  dictionaryStats
} from './data/all-words';

// Export individual category modules
export { coreVocabulary } from './data/core-vocabulary';
export { verbs } from './data/verbs';
export { nouns } from './data/nouns';
export { numbersAndTime } from './data/numbers-time';
export { adjectivesAndAdverbs } from './data/adjectives-adverbs';
export { modernTech } from './data/modern-tech';

export {
  DictionaryWord,
  WordCategory,
  Suggestion,
  SuggestionSource,
  AutocorrectRule,
  UserLearningData,
  DictionaryConfig,
} from './types';

// Re-export convenience function
import { SuggestionEngine } from './suggestion-engine';
import { allWords } from './data/all-words';
import { DictionaryConfig } from './types';

/**
 * Create a default suggestion engine with comprehensive dictionary (1500+ words)
 */
export function createDefaultEngine(config?: Partial<DictionaryConfig>): SuggestionEngine {
  return new SuggestionEngine(allWords, config);
}

/**
 * Create a suggestion engine with specific words
 */
export function createCustomEngine(
  words: import('./types').DictionaryWord[],
  config?: Partial<DictionaryConfig>
): SuggestionEngine {
  return new SuggestionEngine(words, config);
}
