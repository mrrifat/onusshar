import { PhoneticMapping, PhoneticRule } from '../types';

/**
 * Default phonetic mapping rules for Bengali
 * Based on Avro-style phonetic layout with modern enhancements
 */

// Vowels (independent forms)
export const vowels: PhoneticRule[] = [
  { pattern: 'oo', output: 'উ', priority: 2 },
  { pattern: 'uu', output: 'ঊ', priority: 2 },
  { pattern: 'ou', output: 'ঔ', priority: 2 },
  { pattern: 'au', output: 'ঔ', priority: 2 },
  { pattern: 'ee', output: 'ঈ', priority: 2 },
  { pattern: 'ii', output: 'ঈ', priority: 2 },
  { pattern: 'oi', output: 'ঐ', priority: 2 },
  { pattern: 'O', output: 'ও', priority: 1 },
  { pattern: 'a', output: 'আ', priority: 1 },
  { pattern: 'A', output: 'অ্যা', priority: 1 },
  { pattern: 'i', output: 'ই', priority: 1 },
  { pattern: 'I', output: 'ঈ', priority: 1 },
  { pattern: 'u', output: 'উ', priority: 1 },
  { pattern: 'U', output: 'ঊ', priority: 1 },
  { pattern: 'e', output: 'এ', priority: 1 },
  { pattern: 'E', output: 'ঐ', priority: 1 },
  { pattern: 'o', output: 'ও', priority: 1 },
];

// Vowel signs (dependent forms - kars)
export const vowelSigns: PhoneticRule[] = [
  { pattern: 'oo', output: 'ু', priority: 2 },
  { pattern: 'uu', output: 'ূ', priority: 2 },
  { pattern: 'ou', output: 'ৌ', priority: 2 },
  { pattern: 'au', output: 'ৌ', priority: 2 },
  { pattern: 'ee', output: 'ী', priority: 2 },
  { pattern: 'ii', output: 'ী', priority: 2 },
  { pattern: 'oi', output: 'ৈ', priority: 2 },
  { pattern: 'a', output: 'া', priority: 1 },
  { pattern: 'A', output: '্যা', priority: 1 },
  { pattern: 'i', output: 'ি', priority: 1 },
  { pattern: 'I', output: 'ী', priority: 1 },
  { pattern: 'u', output: 'ু', priority: 1 },
  { pattern: 'U', output: 'ূ', priority: 1 },
  { pattern: 'e', output: 'ে', priority: 1 },
  { pattern: 'E', output: 'ৈ', priority: 1 },
  { pattern: 'o', output: 'ো', priority: 1 },
  { pattern: 'O', output: 'ো', priority: 1 },
];

// Consonants
export const consonants: PhoneticRule[] = [
  // Velar
  { pattern: 'kh', output: 'খ', priority: 2 },
  { pattern: 'gh', output: 'ঘ', priority: 2 },
  { pattern: 'ng', output: 'ঙ', priority: 2 },
  { pattern: 'k', output: 'ক', priority: 1 },
  { pattern: 'g', output: 'গ', priority: 1 },
  { pattern: 'K', output: 'খ', priority: 1 },
  { pattern: 'G', output: 'ঘ', priority: 1 },

  // Palatal
  { pattern: 'ch', output: 'চ', priority: 2 },
  { pattern: 'chh', output: 'ছ', priority: 3 },
  { pattern: 'Ch', output: 'ছ', priority: 2 },
  { pattern: 'jh', output: 'ঝ', priority: 2 },
  { pattern: 'ng', output: 'ঞ', priority: 2, context: { preceding: '[জঝ]' } },
  { pattern: 'c', output: 'চ', priority: 1 },
  { pattern: 'j', output: 'জ', priority: 1 },
  { pattern: 'J', output: 'ঝ', priority: 1 },

  // Retroflex
  { pattern: 'Th', output: 'ঠ', priority: 2 },
  { pattern: 'Dh', output: 'ঢ', priority: 2 },
  { pattern: 'Rh', output: 'ঢ়', priority: 2 },
  { pattern: 'T', output: 'ট', priority: 1 },
  { pattern: 'D', output: 'ড', priority: 1 },
  { pattern: 'R', output: 'ড়', priority: 1 },
  { pattern: 'N', output: 'ণ', priority: 1 },

  // Dental
  { pattern: 'th', output: 'থ', priority: 2 },
  { pattern: 'dh', output: 'ধ', priority: 2 },
  { pattern: 't', output: 'ত', priority: 1 },
  { pattern: 'd', output: 'দ', priority: 1 },
  { pattern: 'n', output: 'ন', priority: 1 },

  // Labial
  { pattern: 'ph', output: 'ফ', priority: 2 },
  { pattern: 'bh', output: 'ভ', priority: 2 },
  { pattern: 'f', output: 'ফ', priority: 1 },
  { pattern: 'p', output: 'প', priority: 1 },
  { pattern: 'b', output: 'ব', priority: 1 },
  { pattern: 'v', output: 'ভ', priority: 1 },
  { pattern: 'm', output: 'ম', priority: 1 },

  // Semi-vowels and others
  { pattern: 'z', output: 'য', priority: 1 },
  { pattern: 'r', output: 'র', priority: 1 },
  { pattern: 'l', output: 'ল', priority: 1 },
  { pattern: 'sh', output: 'শ', priority: 2 },
  { pattern: 'Sh', output: 'ষ', priority: 2 },
  { pattern: 's', output: 'স', priority: 1 },
  { pattern: 'S', output: 'ষ', priority: 1 },
  { pattern: 'h', output: 'হ', priority: 1 },
  { pattern: 'y', output: 'য়', priority: 1 },
  { pattern: 'Y', output: 'য', priority: 1 },
  { pattern: 'w', output: 'ও', priority: 1 },

  // Conjuncts and special
  { pattern: 'rri', output: 'ঋ', priority: 2 },
  { pattern: 'Ng', output: 'ং', priority: 2 },
  { pattern: 'nga', output: 'ঙ্গ', priority: 3 },
  { pattern: 'ngo', output: 'ঙ্গো', priority: 3 },
  { pattern: 'kSh', output: 'ক্ষ', priority: 3 },
  { pattern: 'kkh', output: 'ক্খ', priority: 3 },
];

// Special characters
export const specialChars: PhoneticRule[] = [
  { pattern: 'ng', output: 'ং', priority: 1, context: { following: '[\\s।]|$' } }, // Anusvara
  { pattern: 'NG', output: 'ং', priority: 2 },
  { pattern: 'Ng', output: 'ং', priority: 2 },
  { pattern: 'H', output: 'ঃ', priority: 1 }, // Visarga
  { pattern: '~', output: 'ঁ', priority: 1 }, // Chandrabindu
  { pattern: '^', output: '্', priority: 1 }, // Explicit hasanta/virama
  { pattern: '..', output: '।', priority: 2 }, // Dari
  { pattern: '.', output: '.', priority: 1 }, // Period (passthrough)
];

// Numbers
export const numbers: PhoneticRule[] = [
  { pattern: '0', output: '০', priority: 1 },
  { pattern: '1', output: '১', priority: 1 },
  { pattern: '2', output: '২', priority: 1 },
  { pattern: '3', output: '৩', priority: 1 },
  { pattern: '4', output: '৪', priority: 1 },
  { pattern: '5', output: '৫', priority: 1 },
  { pattern: '6', output: '৬', priority: 1 },
  { pattern: '7', output: '৭', priority: 1 },
  { pattern: '8', output: '৮', priority: 1 },
  { pattern: '9', output: '৯', priority: 1 },
];

// Punctuation (mostly passthrough)
export const punctuation: PhoneticRule[] = [
  { pattern: ',', output: ',', priority: 1 },
  { pattern: ';', output: ';', priority: 1 },
  { pattern: ':', output: ':', priority: 1 },
  { pattern: '!', output: '!', priority: 1 },
  { pattern: '?', output: '?', priority: 1 },
  { pattern: '-', output: '-', priority: 1 },
  { pattern: '(', output: '(', priority: 1 },
  { pattern: ')', output: ')', priority: 1 },
  { pattern: '"', output: '"', priority: 1 },
  { pattern: "'", output: "'", priority: 1 },
  { pattern: ' ', output: ' ', priority: 1 },
];

export const defaultMapping: PhoneticMapping = {
  vowels,
  consonants,
  vowelSigns,
  specialChars,
  numbers,
  punctuation,
};
