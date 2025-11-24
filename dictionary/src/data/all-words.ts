/**
 * Comprehensive Bengali Dictionary
 * Aggregates all word categories into a single searchable collection
 */

import { DictionaryWord } from '../types';
import { coreVocabulary } from './core-vocabulary';
import { verbs } from './verbs';
import { nouns } from './nouns';
import { numbersAndTime } from './numbers-time';
import { adjectivesAndAdverbs } from './adjectives-adverbs';
import { modernTech } from './modern-tech';

/**
 * All Bengali words from all categories
 * Total: 1500+ words
 */
export const allWords: DictionaryWord[] = [
  ...coreVocabulary,
  ...verbs,
  ...nouns,
  ...numbersAndTime,
  ...adjectivesAndAdverbs,
  ...modernTech,
];

/**
 * Word lookup map by Bengali word for O(1) access
 */
export const wordMap = new Map<string, DictionaryWord>();
allWords.forEach(word => {
  wordMap.set(word.word, word);
});

/**
 * Phonetic lookup map by Latin spelling for O(1) access
 */
export const phoneticMap = new Map<string, DictionaryWord[]>();
allWords.forEach(word => {
  if (word.phonetic) {
    const key = word.phonetic.toLowerCase();
    if (!phoneticMap.has(key)) {
      phoneticMap.set(key, []);
    }
    phoneticMap.get(key)!.push(word);
  }
});

/**
 * Words sorted by frequency (highest first)
 */
export const wordsByFrequency = [...allWords].sort((a, b) => b.frequency - a.frequency);

/**
 * Get words by category
 */
export function getWordsByCategory(category: string): DictionaryWord[] {
  return allWords.filter(w => w.category === category);
}

/**
 * Search words by prefix (for autocomplete)
 */
export function searchByPhoneticPrefix(prefix: string): DictionaryWord[] {
  const lowerPrefix = prefix.toLowerCase();
  const results: DictionaryWord[] = [];
  const seen = new Set<string>();

  for (const word of allWords) {
    if (word.phonetic && word.phonetic.toLowerCase().startsWith(lowerPrefix)) {
      if (!seen.has(word.word)) {
        results.push(word);
        seen.add(word.word);
      }
    }
  }

  // Sort by frequency
  return results.sort((a, b) => b.frequency - a.frequency);
}

/**
 * Search words by Bengali prefix
 */
export function searchByBengaliPrefix(prefix: string): DictionaryWord[] {
  const results: DictionaryWord[] = [];

  for (const word of allWords) {
    if (word.word.startsWith(prefix)) {
      results.push(word);
    }
  }

  // Sort by frequency
  return results.sort((a, b) => b.frequency - a.frequency);
}

/**
 * Dictionary statistics
 */
export const dictionaryStats = {
  totalWords: allWords.length,
  categories: {
    core: coreVocabulary.length,
    verbs: verbs.length,
    nouns: nouns.length,
    numbers: numbersAndTime.length,
    adjectives: adjectivesAndAdverbs.length,
    tech: modernTech.length,
  },
  avgFrequency: allWords.reduce((sum, w) => sum + w.frequency, 0) / allWords.length,
  highFrequency: allWords.filter(w => w.frequency >= 9000).length,
  mediumFrequency: allWords.filter(w => w.frequency >= 7000 && w.frequency < 9000).length,
  lowFrequency: allWords.filter(w => w.frequency < 7000).length,
};
