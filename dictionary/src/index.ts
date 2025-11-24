/**
 * @onusshar/dictionary - Bengali word dictionary with smart suggestions
 *
 * Main entry point
 */

export { SuggestionEngine } from './suggestion-engine';
export { commonWords } from './data/common-words';

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
import { commonWords } from './data/common-words';
import { DictionaryConfig } from './types';

/**
 * Create a default suggestion engine with common words
 */
export function createDefaultEngine(config?: Partial<DictionaryConfig>): SuggestionEngine {
  return new SuggestionEngine(commonWords, config);
}
