import { DictionaryWord, WordCategory } from '../types';

/**
 * Common Bengali words with frequency data
 *
 * Frequency scale: 1-10,000
 * - 9000+: Extremely common (আমি, তুমি, এই, etc.)
 * - 5000-9000: Very common
 * - 1000-5000: Common
 * - 100-1000: Moderate
 * - 1-100: Rare
 */

export const commonWords: DictionaryWord[] = [
  // Pronouns (highest frequency)
  { word: 'আমি', frequency: 10000, category: WordCategory.PRONOUN, phonetic: 'ami', meanings: ['I', 'me'] },
  { word: 'তুমি', frequency: 9800, category: WordCategory.PRONOUN, phonetic: 'tumi', meanings: ['you'] },
  { word: 'তোমার', frequency: 9500, category: WordCategory.PRONOUN, phonetic: 'tomar', meanings: ['your', 'yours'] },
  { word: 'আমার', frequency: 9700, category: WordCategory.PRONOUN, phonetic: 'amar', meanings: ['my', 'mine'] },
  { word: 'সে', frequency: 9000, category: WordCategory.PRONOUN, phonetic: 'se', meanings: ['he', 'she', 'it'] },
  { word: 'তারা', frequency: 8500, category: WordCategory.PRONOUN, phonetic: 'tara', meanings: ['they', 'them'] },
  { word: 'আমরা', frequency: 8800, category: WordCategory.PRONOUN, phonetic: 'amra', meanings: ['we', 'us'] },
  { word: 'তোমরা', frequency: 8000, category: WordCategory.PRONOUN, phonetic: 'tomra', meanings: ['you all'] },
  { word: 'আপনি', frequency: 9300, category: WordCategory.PRONOUN, phonetic: 'apni', meanings: ['you (formal)'] },
  { word: 'কে', frequency: 9000, category: WordCategory.PRONOUN, phonetic: 'ke', meanings: ['who'] },
  { word: 'কী', frequency: 9100, category: WordCategory.PRONOUN, phonetic: 'ki', meanings: ['what'] },
  { word: 'কোথায়', frequency: 8200, category: WordCategory.PRONOUN, phonetic: 'kothay', meanings: ['where'] },

  // Common verbs
  { word: 'করা', frequency: 9500, category: WordCategory.VERB, phonetic: 'kora', meanings: ['to do', 'to make'] },
  { word: 'হওয়া', frequency: 9400, category: WordCategory.VERB, phonetic: 'howa', meanings: ['to be', 'to become'] },
  { word: 'যাওয়া', frequency: 9000, category: WordCategory.VERB, phonetic: 'jaowa', meanings: ['to go'] },
  { word: 'আসা', frequency: 8900, category: WordCategory.VERB, phonetic: 'asa', meanings: ['to come'] },
  { word: 'বলা', frequency: 8800, category: WordCategory.VERB, phonetic: 'bola', meanings: ['to say', 'to tell'] },
  { word: 'দেখা', frequency: 8700, category: WordCategory.VERB, phonetic: 'dekha', meanings: ['to see'] },
  { word: 'চাওয়া', frequency: 8300, category: WordCategory.VERB, phonetic: 'chaowa', meanings: ['to want'] },
  { word: 'পারা', frequency: 8600, category: WordCategory.VERB, phonetic: 'para', meanings: ['to be able', 'can'] },
  { word: 'দেওয়া', frequency: 8500, category: WordCategory.VERB, phonetic: 'deowa', meanings: ['to give'] },
  { word: 'নেওয়া', frequency: 8200, category: WordCategory.VERB, phonetic: 'neowa', meanings: ['to take'] },
  { word: 'খাওয়া', frequency: 8000, category: WordCategory.VERB, phonetic: 'khaowa', meanings: ['to eat'] },
  { word: 'পড়া', frequency: 7900, category: WordCategory.VERB, phonetic: 'pora', meanings: ['to read', 'to study'] },
  { word: 'লেখা', frequency: 7800, category: WordCategory.VERB, phonetic: 'lekha', meanings: ['to write'] },
  { word: 'বসা', frequency: 7500, category: WordCategory.VERB, phonetic: 'bosa', meanings: ['to sit'] },
  { word: 'শোনা', frequency: 7400, category: WordCategory.VERB, phonetic: 'shona', meanings: ['to hear', 'to listen'] },
  { word: 'জানা', frequency: 7600, category: WordCategory.VERB, phonetic: 'jana', meanings: ['to know'] },

  // Common nouns
  { word: 'মানুষ', frequency: 8500, category: WordCategory.NOUN, phonetic: 'manush', meanings: ['person', 'human'] },
  { word: 'বই', frequency: 7500, category: WordCategory.NOUN, phonetic: 'boi', meanings: ['book'] },
  { word: 'ঘর', frequency: 7800, category: WordCategory.NOUN, phonetic: 'ghor', meanings: ['house', 'room'] },
  { word: 'নাম', frequency: 8000, category: WordCategory.NOUN, phonetic: 'nam', meanings: ['name'] },
  { word: 'দিন', frequency: 8200, category: WordCategory.NOUN, phonetic: 'din', meanings: ['day'] },
  { word: 'রাত', frequency: 7700, category: WordCategory.NOUN, phonetic: 'rat', meanings: ['night'] },
  { word: 'সময়', frequency: 8100, category: WordCategory.NOUN, phonetic: 'shomoy', meanings: ['time'] },
  { word: 'কাজ', frequency: 8300, category: WordCategory.NOUN, phonetic: 'kaj', meanings: ['work', 'job'] },
  { word: 'স্থান', frequency: 7400, category: WordCategory.NOUN, phonetic: 'sthan', meanings: ['place'] },
  { word: 'জল', frequency: 7600, category: WordCategory.NOUN, phonetic: 'jol', meanings: ['water'] },
  { word: 'খাবার', frequency: 7500, category: WordCategory.NOUN, phonetic: 'khabar', meanings: ['food'] },
  { word: 'ভাষা', frequency: 7300, category: WordCategory.NOUN, phonetic: 'bhasha', meanings: ['language'] },
  { word: 'বাংলা', frequency: 8500, category: WordCategory.NOUN, phonetic: 'bangla', meanings: ['Bengali', 'Bengal'] },
  { word: 'দেশ', frequency: 8000, category: WordCategory.NOUN, phonetic: 'desh', meanings: ['country'] },
  { word: 'বাড়ি', frequency: 7900, category: WordCategory.NOUN, phonetic: 'bari', meanings: ['home', 'house'] },
  { word: 'পথ', frequency: 7200, category: WordCategory.NOUN, phonetic: 'poth', meanings: ['path', 'road'] },
  { word: 'হাত', frequency: 7700, category: WordCategory.NOUN, phonetic: 'hat', meanings: ['hand'] },
  { word: 'মাথা', frequency: 7300, category: WordCategory.NOUN, phonetic: 'matha', meanings: ['head'] },
  { word: 'চোখ', frequency: 7400, category: WordCategory.NOUN, phonetic: 'chokh', meanings: ['eye'] },
  { word: 'মুখ', frequency: 7200, category: WordCategory.NOUN, phonetic: 'mukh', meanings: ['face', 'mouth'] },

  // Common adjectives
  { word: 'ভালো', frequency: 8700, category: WordCategory.ADJECTIVE, phonetic: 'bhalo', meanings: ['good'] },
  { word: 'খারাপ', frequency: 7800, category: WordCategory.ADJECTIVE, phonetic: 'kharap', meanings: ['bad'] },
  { word: 'বড়', frequency: 7600, category: WordCategory.ADJECTIVE, phonetic: 'boro', meanings: ['big', 'large'] },
  { word: 'ছোট', frequency: 7500, category: WordCategory.ADJECTIVE, phonetic: 'chhoto', meanings: ['small'] },
  { word: 'সুন্দর', frequency: 7900, category: WordCategory.ADJECTIVE, phonetic: 'shundor', meanings: ['beautiful'] },
  { word: 'নতুন', frequency: 7400, category: WordCategory.ADJECTIVE, phonetic: 'notun', meanings: ['new'] },
  { word: 'পুরানো', frequency: 6800, category: WordCategory.ADJECTIVE, phonetic: 'purano', meanings: ['old'] },
  { word: 'লাল', frequency: 6500, category: WordCategory.ADJECTIVE, phonetic: 'lal', meanings: ['red'] },
  { word: 'সাদা', frequency: 6400, category: WordCategory.ADJECTIVE, phonetic: 'shada', meanings: ['white'] },
  { word: 'কালো', frequency: 6300, category: WordCategory.ADJECTIVE, phonetic: 'kalo', meanings: ['black'] },

  // Common adverbs and other words
  { word: 'এখন', frequency: 8500, category: WordCategory.ADVERB, phonetic: 'ekhon', meanings: ['now'] },
  { word: 'তখন', frequency: 7800, category: WordCategory.ADVERB, phonetic: 'tokhon', meanings: ['then'] },
  { word: 'আজ', frequency: 8200, category: WordCategory.ADVERB, phonetic: 'aj', meanings: ['today'] },
  { word: 'কাল', frequency: 7900, category: WordCategory.ADVERB, phonetic: 'kal', meanings: ['yesterday', 'tomorrow'] },
  { word: 'সবসময়', frequency: 7300, category: WordCategory.ADVERB, phonetic: 'shobshomoy', meanings: ['always'] },
  { word: 'কখনো', frequency: 7200, category: WordCategory.ADVERB, phonetic: 'kokhono', meanings: ['ever', 'never'] },
  { word: 'এখানে', frequency: 7700, category: WordCategory.ADVERB, phonetic: 'ekhane', meanings: ['here'] },
  { word: 'সেখানে', frequency: 7400, category: WordCategory.ADVERB, phonetic: 'shekhane', meanings: ['there'] },
  { word: 'কেন', frequency: 8000, category: WordCategory.ADVERB, phonetic: 'keno', meanings: ['why'] },
  { word: 'কীভাবে', frequency: 7600, category: WordCategory.ADVERB, phonetic: 'kibhabe', meanings: ['how'] },

  // Prepositions and conjunctions
  { word: 'এবং', frequency: 8800, category: WordCategory.CONJUNCTION, phonetic: 'ebong', meanings: ['and'] },
  { word: 'বা', frequency: 8200, category: WordCategory.CONJUNCTION, phonetic: 'ba', meanings: ['or'] },
  { word: 'কিন্তু', frequency: 8500, category: WordCategory.CONJUNCTION, phonetic: 'kintu', meanings: ['but'] },
  { word: 'যদি', frequency: 7900, category: WordCategory.CONJUNCTION, phonetic: 'jodi', meanings: ['if'] },
  { word: 'তাহলে', frequency: 7600, category: WordCategory.CONJUNCTION, phonetic: 'tahole', meanings: ['then'] },
  { word: 'কারণ', frequency: 7800, category: WordCategory.CONJUNCTION, phonetic: 'karon', meanings: ['because'] },
  { word: 'জন্য', frequency: 8200, category: WordCategory.PREPOSITION, phonetic: 'jonyo', meanings: ['for'] },
  { word: 'সাথে', frequency: 7700, category: WordCategory.PREPOSITION, phonetic: 'sathe', meanings: ['with'] },
  { word: 'থেকে', frequency: 8100, category: WordCategory.PREPOSITION, phonetic: 'theke', meanings: ['from', 'than'] },
  { word: 'মধ্যে', frequency: 7500, category: WordCategory.PREPOSITION, phonetic: 'moddhe', meanings: ['in', 'within'] },

  // Common expressions
  { word: 'ধন্যবাদ', frequency: 7800, category: WordCategory.INTERJECTION, phonetic: 'dhonnobad', meanings: ['thank you'] },
  { word: 'নমস্কার', frequency: 7200, category: WordCategory.INTERJECTION, phonetic: 'nomoshkar', meanings: ['hello', 'greetings'] },
  { word: 'হ্যাঁ', frequency: 8500, category: WordCategory.INTERJECTION, phonetic: 'hyan', meanings: ['yes'] },
  { word: 'না', frequency: 8600, category: WordCategory.INTERJECTION, phonetic: 'na', meanings: ['no'] },
  { word: 'দয়া', frequency: 6900, category: WordCategory.NOUN, phonetic: 'doya', meanings: ['kindness', 'please'] },
  { word: 'করুন', frequency: 7100, category: WordCategory.VERB, phonetic: 'korun', meanings: ['please do'] },

  // Numbers
  { word: 'এক', frequency: 7500, category: WordCategory.NUMBER, phonetic: 'ek', meanings: ['one'] },
  { word: 'দুই', frequency: 7300, category: WordCategory.NUMBER, phonetic: 'dui', meanings: ['two'] },
  { word: 'তিন', frequency: 7100, category: WordCategory.NUMBER, phonetic: 'tin', meanings: ['three'] },
  { word: 'চার', frequency: 6900, category: WordCategory.NUMBER, phonetic: 'char', meanings: ['four'] },
  { word: 'পাঁচ', frequency: 6700, category: WordCategory.NUMBER, phonetic: 'panch', meanings: ['five'] },

  // Family members
  { word: 'মা', frequency: 8200, category: WordCategory.NOUN, phonetic: 'ma', meanings: ['mother'] },
  { word: 'বাবা', frequency: 8100, category: WordCategory.NOUN, phonetic: 'baba', meanings: ['father'] },
  { word: 'ভাই', frequency: 7600, category: WordCategory.NOUN, phonetic: 'bhai', meanings: ['brother'] },
  { word: 'বোন', frequency: 7500, category: WordCategory.NOUN, phonetic: 'bon', meanings: ['sister'] },
  { word: 'পরিবার', frequency: 7400, category: WordCategory.NOUN, phonetic: 'poribar', meanings: ['family'] },

  // Modern/technical words
  { word: 'কম্পিউটার', frequency: 6500, category: WordCategory.TECHNICAL, phonetic: 'kompiutar', meanings: ['computer'] },
  { word: 'ইন্টারনেট', frequency: 6400, category: WordCategory.TECHNICAL, phonetic: 'internet', meanings: ['internet'] },
  { word: 'ফোন', frequency: 7200, category: WordCategory.TECHNICAL, phonetic: 'phone', meanings: ['phone'] },
  { word: 'ইমেইল', frequency: 6000, category: WordCategory.TECHNICAL, phonetic: 'email', meanings: ['email'] },
];

// Total: 100+ common words
// In production, this would be expanded to 50,000+ words loaded from a database
