import { PhoneticMapping, PhoneticRule } from '../types';

/**
 * Improved phonetic mapping rules for Bengali
 * Based on Avro Phonetic with enhancements for accuracy and ease of use
 */

// Vowels (independent forms)
export const vowels: PhoneticRule[] = [
  // Triple vowels (highest priority)
  { pattern: 'ooo', output: 'ুঅ', priority: 3 }, // Special case
  { pattern: 'OOO', output: 'ৌঅ', priority: 3 }, // Special case

  // Double vowels (higher priority)
  { pattern: 'oo', output: 'উ', priority: 2 },
  { pattern: 'uu', output: 'ঊ', priority: 2 },
  { pattern: 'ou', output: 'ঔ', priority: 2 },
  { pattern: 'au', output: 'ঔ', priority: 2 },
  { pattern: 'ee', output: 'ঈ', priority: 2 },
  { pattern: 'ii', output: 'ঈ', priority: 2 },
  { pattern: 'oi', output: 'ঐ', priority: 2 },
  { pattern: 'OI', output: 'ঐ', priority: 2 },
  { pattern: 'OU', output: 'ঔ', priority: 2 },

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
  { pattern: 'OU', output: 'ৌ', priority: 2 },
  { pattern: 'ee', output: 'ী', priority: 2 },
  { pattern: 'ii', output: 'ী', priority: 2 },
  { pattern: 'oi', output: 'ৈ', priority: 2 },
  { pattern: 'OI', output: 'ৈ', priority: 2 },

  // Special vowel signs
  { pattern: 'rri', output: 'ৃ', priority: 2 }, // Ri-kar (vocalic r)
  { pattern: 'rree', output: 'ৄ', priority: 2 }, // Rii-kar (long vocalic r)

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

  // Common conjuncts (3+ chars)
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
  { pattern: 'gY', output: 'জ্ঞ', priority: 3 }, // Gyan/Jnan
  { pattern: 'gy', output: 'জ্ঞ', priority: 3 }, // Gyan/Jnan (alternative)
  { pattern: 'jNG', output: 'জ্ঞ', priority: 3 }, // Gyan/Jnan (alternative)
  { pattern: 'jny', output: 'জ্ঞ', priority: 3 }, // Gyan/Jnan (alternative)
  { pattern: 'NgO', output: 'ঙ্গো', priority: 3 }, // Ngo

  // Two-letter conjuncts
  { pattern: 'nj', output: 'ঞ্জ', priority: 3 },
  { pattern: 'nc', output: 'ঞ্চ', priority: 3 },
  { pattern: 'nt', output: 'ন্ত', priority: 3 },
  { pattern: 'nd', output: 'ন্দ', priority: 3 },
  { pattern: 'nD', output: 'ন্ড', priority: 3 },
  { pattern: 'nm', output: 'ন্ম', priority: 3 },
  { pattern: 'nn', output: 'ন্ন', priority: 3 },
  { pattern: 'mp', output: 'ম্প', priority: 3 },
  { pattern: 'mb', output: 'ম্ব', priority: 3 },
  { pattern: 'mf', output: 'ম্ফ', priority: 3 },
  { pattern: 'mm', output: 'ম্ম', priority: 3 },
  { pattern: 'mn', output: 'ম্ন', priority: 3 },
  { pattern: 'ld', output: 'ল্দ', priority: 3 },
  { pattern: 'lp', output: 'ল্প', priority: 3 },
  { pattern: 'lb', output: 'ল্ব', priority: 3 },
  { pattern: 'lm', output: 'ল্ম', priority: 3 },
  { pattern: 'll', output: 'ল্ল', priority: 3 },
  { pattern: 'lk', output: 'ল্ক', priority: 3 },
  { pattern: 'lg', output: 'ল্গ', priority: 3 },
  { pattern: 'sk', output: 'স্ক', priority: 3 },
  { pattern: 'st', output: 'স্ত', priority: 3 },
  { pattern: 'sth', output: 'স্থ', priority: 3 },
  { pattern: 'sp', output: 'স্প', priority: 3 },
  { pattern: 'sm', output: 'স্ম', priority: 3 },
  { pattern: 'sn', output: 'স্ন', priority: 3 },
  { pattern: 'Tk', output: 'ট্ক', priority: 3 },
  { pattern: 'Tm', output: 'ট্ম', priority: 3 },
  { pattern: 'TT', output: 'ট্ট', priority: 3 },
  { pattern: 'Dp', output: 'ড্প', priority: 3 },
  { pattern: 'DD', output: 'ড্ড', priority: 3 },
  { pattern: 'rR', output: 'ঋ', priority: 3 },
  { pattern: 'RR', output: 'ঋ', priority: 3 },

  // Palatal nasal (highest priority for NG patterns)
  { pattern: 'NG', output: 'ঞ', priority: 3 }, // Palatal nasal (taalabya na)
  { pattern: 'nya', output: 'ঞ', priority: 3 }, // Palatal nasal (alternative)

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
  { pattern: 'Ng', output: 'ঙ', priority: 2 }, // Velar nasal (N + g)
  { pattern: 'ng', output: 'ঙ', priority: 2 }, // Velar nasal (default)

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
  { pattern: 'J', output: 'য', priority: 1 }, // Ja-phala (antastha ja)
  { pattern: 'Z', output: 'য', priority: 1 }, // Ja-phala (alternative)

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
  // Anusvara (ং) - only when 'ng' appears at end of word or before punctuation
  { pattern: 'ng', output: 'ং', priority: 3, context: { following: '[\\s।,!?;:]|$' } },
  { pattern: 'ngh', output: 'ংহ', priority: 3 }, // ng + h = anusvara + ha
  { pattern: 'ngkh', output: 'ংখ', priority: 3 }, // ng + kh = anusvara + kha
  { pattern: 'ngk', output: 'ংক', priority: 3 }, // ng + k = anusvara + ka
  { pattern: 'ngch', output: 'ংচ', priority: 3 }, // ng + ch = anusvara + cha
  { pattern: 'ngc', output: 'ংচ', priority: 3 }, // ng + c = anusvara + cha

  // Visarga (ঃ)
  { pattern: 'H', output: 'ঃ', priority: 2 }, // Visarga
  { pattern: '::', output: 'ঃ', priority: 2 }, // Visarga (alternative)

  // Chandrabindu (ঁ)
  { pattern: '~', output: 'ঁ', priority: 2 }, // Chandrabindu
  { pattern: 'M', output: 'ঁ', priority: 1 }, // Chandrabindu (alternative)

  // Hasanta (্)
  { pattern: '^', output: '্', priority: 2 }, // Explicit hasanta/virama

  // Dari (।)
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
