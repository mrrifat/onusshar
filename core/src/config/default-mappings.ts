import { PhoneticMapping, PhoneticRule } from '../types';

/**
 * Improved phonetic mapping rules for Bengali
 * Based on Avro Phonetic with enhancements for accuracy and ease of use
 */

// Vowels (independent forms)
export const vowels: PhoneticRule[] = [
  // Double vowels (higher priority)
  { pattern: 'oo', output: 'উ', priority: 2 },
  { pattern: 'uu', output: 'ঊ', priority: 2 },
  { pattern: 'ou', output: 'ঔ', priority: 2 },
  { pattern: 'au', output: 'ঔ', priority: 2 },
  { pattern: 'ee', output: 'ঈ', priority: 2 },
  { pattern: 'ii', output: 'ঈ', priority: 2 },
  { pattern: 'oi', output: 'ঐ', priority: 2 },
  { pattern: 'OI', output: 'ঐ', priority: 2 },

  // Single vowels
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
  // Double vowel signs
  { pattern: 'oo', output: 'ু', priority: 2 },
  { pattern: 'uu', output: 'ূ', priority: 2 },
  { pattern: 'ou', output: 'ৌ', priority: 2 },
  { pattern: 'au', output: 'ৌ', priority: 2 },
  { pattern: 'ee', output: 'ী', priority: 2 },
  { pattern: 'ii', output: 'ী', priority: 2 },
  { pattern: 'oi', output: 'ৈ', priority: 2 },
  { pattern: 'OI', output: 'ৈ', priority: 2 },

  // Single vowel signs
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
  // Common conjuncts (highest priority - 4 chars)
  { pattern: 'kkhno', output: 'ক্ষ্ণো', priority: 5 },
  { pattern: 'kShNo', output: 'ক্ষ্ণো', priority: 5 },
  { pattern: 'Shch', output: 'ষ্চ', priority: 4 },
  { pattern: 'ShTh', output: 'ষ্ঠ', priority: 4 },
  { pattern: 'shch', output: 'শ্চ', priority: 4 },
  { pattern: 'shTh', output: 'শ্ঠ', priority: 4 },

  // Common conjuncts (3 chars)
  { pattern: 'kkhon', output: 'ক্ষ্ণ', priority: 4 },
  { pattern: 'kShN', output: 'ক্ষ্ণ', priority: 4 },
  { pattern: 'kSh', output: 'ক্ষ', priority: 4 },
  { pattern: 'ksh', output: 'ক্ষ', priority: 4 },
  { pattern: 'kkh', output: 'ক্খ', priority: 4 },
  { pattern: 'chh', output: 'ছ', priority: 4 },
  { pattern: 'nga', output: 'ঙ্গা', priority: 4 },
  { pattern: 'ngo', output: 'ঙ্গো', priority: 4 },
  { pattern: 'ngi', output: 'ঙ্গি', priority: 4 },
  { pattern: 'ngg', output: 'ঙ্গ', priority: 4 },
  { pattern: 'nTh', output: 'ন্ঠ', priority: 3 },
  { pattern: 'mph', output: 'ম্ফ', priority: 3 },
  { pattern: 'sht', output: 'ষ্ট', priority: 3 },
  { pattern: 'ShT', output: 'ষ্ট', priority: 3 },
  { pattern: 'rri', output: 'ঋ', priority: 3 },

  // Two-letter conjuncts
  { pattern: 'nj', output: 'ঞ্জ', priority: 3 },
  { pattern: 'nc', output: 'ঞ্চ', priority: 3 },
  { pattern: 'nt', output: 'ন্ত', priority: 3 },
  { pattern: 'nd', output: 'ন্দ', priority: 3 },
  { pattern: 'nD', output: 'ন্ড', priority: 3 },
  { pattern: 'mp', output: 'ম্প', priority: 3 },
  { pattern: 'mb', output: 'ম্ব', priority: 3 },
  { pattern: 'mf', output: 'ম্ফ', priority: 3 },
  { pattern: 'ld', output: 'ল্দ', priority: 3 },
  { pattern: 'lp', output: 'ল্প', priority: 3 },
  { pattern: 'lb', output: 'ল্ব', priority: 3 },
  { pattern: 'lm', output: 'ল্ম', priority: 3 },
  { pattern: 'rR', output: 'ঋ', priority: 3 },
  { pattern: 'RR', output: 'ঋ', priority: 3 },

  // Aspirated consonants (2 chars - high priority)
  { pattern: 'kh', output: 'খ', priority: 2 },
  { pattern: 'gh', output: 'ঘ', priority: 2 },
  { pattern: 'ch', output: 'চ', priority: 2 },
  { pattern: 'Ch', output: 'ছ', priority: 2 },
  { pattern: 'jh', output: 'ঝ', priority: 2 },
  { pattern: 'Th', output: 'ঠ', priority: 2 },
  { pattern: 'Dh', output: 'ঢ', priority: 2 },
  { pattern: 'th', output: 'থ', priority: 2 },
  { pattern: 'dh', output: 'ধ', priority: 2 },
  { pattern: 'ph', output: 'ফ', priority: 2 },
  { pattern: 'bh', output: 'ভ', priority: 2 },
  { pattern: 'Rh', output: 'ঢ়', priority: 2 },
  { pattern: 'sh', output: 'শ', priority: 2 },
  { pattern: 'Sh', output: 'ষ', priority: 2 },
  { pattern: 'ng', output: 'ঙ', priority: 2 },

  // Single consonants (1 char)
  // Velar
  { pattern: 'q', output: 'ক', priority: 1 },
  { pattern: 'k', output: 'ক', priority: 1 },
  { pattern: 'g', output: 'গ', priority: 1 },
  { pattern: 'K', output: 'খ', priority: 1 },
  { pattern: 'G', output: 'ঘ', priority: 1 },
  { pattern: 'Q', output: 'ক', priority: 1 },

  // Palatal
  { pattern: 'c', output: 'চ', priority: 1 },
  { pattern: 'j', output: 'জ', priority: 1 },
  { pattern: 'z', output: 'জ', priority: 1 },
  { pattern: 'J', output: 'ঝ', priority: 1 },
  { pattern: 'Z', output: 'য', priority: 1 },

  // Retroflex
  { pattern: 'T', output: 'ট', priority: 1 },
  { pattern: 'D', output: 'ড', priority: 1 },
  { pattern: 'R', output: 'ড়', priority: 1 },
  { pattern: 'N', output: 'ণ', priority: 1 },

  // Dental
  { pattern: 't', output: 'ত', priority: 1 },
  { pattern: 'd', output: 'দ', priority: 1 },
  { pattern: 'n', output: 'ন', priority: 1 },

  // Labial
  { pattern: 'f', output: 'ফ', priority: 1 },
  { pattern: 'p', output: 'প', priority: 1 },
  { pattern: 'b', output: 'ব', priority: 1 },
  { pattern: 'v', output: 'ভ', priority: 1 },
  { pattern: 'w', output: 'ও', priority: 1 },
  { pattern: 'm', output: 'ম', priority: 1 },

  // Semi-vowels and sibilants
  { pattern: 'x', output: 'ক্স', priority: 1 },
  { pattern: 'X', output: 'ক্ষ', priority: 1 },
  { pattern: 'r', output: 'র', priority: 1 },
  { pattern: 'l', output: 'ল', priority: 1 },
  { pattern: 's', output: 'স', priority: 1 },
  { pattern: 'S', output: 'ষ', priority: 1 },
  { pattern: 'h', output: 'হ', priority: 1 },
  { pattern: 'y', output: 'য়', priority: 1 },
  { pattern: 'Y', output: 'য', priority: 1 },
];

// Special characters
export const specialChars: PhoneticRule[] = [
  { pattern: 'NG', output: 'ং', priority: 3 }, // Anusvara
  { pattern: 'Ng', output: 'ং', priority: 3 },
  { pattern: 'ng', output: 'ং', priority: 2, context: { following: '[\\s।,!?;:]|$' } },
  { pattern: 'H', output: 'ঃ', priority: 2 }, // Visarga
  { pattern: '~', output: 'ঁ', priority: 2 }, // Chandrabindu
  { pattern: '^', output: '্', priority: 2 }, // Explicit hasanta/virama
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
  { pattern: '[', output: '[', priority: 1 },
  { pattern: ']', output: ']', priority: 1 },
  { pattern: '{', output: '{', priority: 1 },
  { pattern: '}', output: '}', priority: 1 },
  { pattern: '"', output: '"', priority: 1 },
  { pattern: "'", output: "'", priority: 1 },
  { pattern: '/', output: '/', priority: 1 },
  { pattern: '\\', output: '\\', priority: 1 },
  { pattern: '|', output: '|', priority: 1 },
  { pattern: '@', output: '@', priority: 1 },
  { pattern: '#', output: '#', priority: 1 },
  { pattern: '$', output: '$', priority: 1 },
  { pattern: '%', output: '%', priority: 1 },
  { pattern: '&', output: '&', priority: 1 },
  { pattern: '*', output: '*', priority: 1 },
  { pattern: '+', output: '+', priority: 1 },
  { pattern: '=', output: '=', priority: 1 },
  { pattern: '<', output: '<', priority: 1 },
  { pattern: '>', output: '>', priority: 1 },
  { pattern: ' ', output: ' ', priority: 1 },
  { pattern: '\n', output: '\n', priority: 1 },
  { pattern: '\t', output: '\t', priority: 1 },
];

export const defaultMapping: PhoneticMapping = {
  vowels,
  consonants,
  vowelSigns,
  specialChars,
  numbers,
  punctuation,
};
