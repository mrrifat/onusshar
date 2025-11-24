/**
 * Word entry in the dictionary
 */
export interface DictionaryWord {
  word: string;           // Bengali word
  frequency: number;      // Usage frequency (higher = more common)
  category?: WordCategory;
  phonetic?: string;      // Phonetic spelling (Latin)
  meanings?: string[];    // English meanings (optional)
}

/**
 * Word categories for better organization
 */
export enum WordCategory {
  COMMON = 'common',           // Very common words (আমি, তুমি, etc.)
  NOUN = 'noun',
  VERB = 'verb',
  ADJECTIVE = 'adjective',
  ADVERB = 'adverb',
  PRONOUN = 'pronoun',
  PREPOSITION = 'preposition',
  CONJUNCTION = 'conjunction',
  INTERJECTION = 'interjection',
  NUMBER = 'number',
  TECHNICAL = 'technical',     // Technical/computer terms
  NAME = 'name',               // Person names
  PLACE = 'place',             // Place names
}

/**
 * Suggestion result with metadata
 */
export interface Suggestion {
  word: string;
  score: number;          // Relevance score (0-1)
  source: SuggestionSource;
  metadata?: {
    frequency?: number;
    category?: WordCategory;
    userCount?: number;   // How many times user typed this
  };
}

/**
 * Source of suggestion
 */
export enum SuggestionSource {
  DICTIONARY = 'dictionary',   // From word list
  PHONETIC = 'phonetic',       // Phonetic conversion
  USER_HISTORY = 'user',       // User's typing history
  AUTOCORRECT = 'autocorrect', // Corrected typo
}

/**
 * Autocorrect rule
 */
export interface AutocorrectRule {
  pattern: string;      // Wrong pattern (regex)
  correction: string;   // Correct replacement
  confidence: number;   // Confidence level (0-1)
}

/**
 * User learning data
 */
export interface UserLearningData {
  wordFrequency: Map<string, number>;  // User's word usage count
  customWords: Set<string>;             // User-added words
  corrections: Map<string, string>;     // User's autocorrect preferences
  lastUpdated: Date;
}

/**
 * Dictionary configuration
 */
export interface DictionaryConfig {
  maxSuggestions: number;         // Max suggestions to return
  enableAutocorrect: boolean;
  enableUserLearning: boolean;
  minWordLength: number;          // Min length for suggestions
  phoneticWeight: number;         // Weight for phonetic suggestions (0-1)
  dictionaryWeight: number;       // Weight for dictionary matches (0-1)
  userHistoryWeight: number;      // Weight for user history (0-1)
}
