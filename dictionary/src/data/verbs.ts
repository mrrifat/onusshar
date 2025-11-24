/**
 * Bengali Verbs - Common Action Words with Conjugations
 * Organized by frequency and usage
 */

import { DictionaryWord, WordCategory } from '../types';

export const verbs: DictionaryWord[] = [
  // Movement verbs
  { word: 'যাওয়া', phonetic: 'jaowa', frequency: 9400, category: WordCategory.VERB, meanings: ['to go'] },
  { word: 'যাচ্ছি', phonetic: 'jachhi', frequency: 8800, category: WordCategory.VERB, meanings: ['going (I)'] },
  { word: 'যাচ্ছে', phonetic: 'jachhe', frequency: 8900, category: WordCategory.VERB, meanings: ['going'] },
  { word: 'গেলাম', phonetic: 'gelam', frequency: 8600, category: WordCategory.VERB, meanings: ['went (I)'] },
  { word: 'গেল', phonetic: 'gelo', frequency: 8500, category: WordCategory.VERB, meanings: ['went'] },
  { word: 'গিয়েছিল', phonetic: 'giyechhilo', frequency: 8200, category: WordCategory.VERB, meanings: ['had gone'] },

  { word: 'আসা', phonetic: 'asha', frequency: 9500, category: WordCategory.VERB, meanings: ['to come'] },
  { word: 'আসছি', phonetic: 'ashchhi', frequency: 8900, category: WordCategory.VERB, meanings: ['coming (I)'] },
  { word: 'আসছে', phonetic: 'ashchhe', frequency: 9000, category: WordCategory.VERB, meanings: ['coming'] },
  { word: 'এলাম', phonetic: 'elam', frequency: 8700, category: WordCategory.VERB, meanings: ['came (I)'] },
  { word: 'এল', phonetic: 'elo', frequency: 8600, category: WordCategory.VERB, meanings: ['came'] },
  { word: 'এসেছিল', phonetic: 'eshechhilo', frequency: 8300, category: WordCategory.VERB, meanings: ['had come'] },

  { word: 'ফিরে', phonetic: 'phire', frequency: 8400, category: WordCategory.VERB, meanings: ['return', 'come back'] },
  { word: 'ফেরা', phonetic: 'phera', frequency: 8200, category: WordCategory.VERB, meanings: ['to return'] },
  { word: 'ফিরছি', phonetic: 'phirchhi', frequency: 7800, category: WordCategory.VERB, meanings: ['returning (I)'] },
  { word: 'ফিরেছি', phonetic: 'phirechhi', frequency: 7900, category: WordCategory.VERB, meanings: ['have returned'] },

  { word: 'চলা', phonetic: 'chola', frequency: 8600, category: WordCategory.VERB, meanings: ['to walk', 'to move', 'to go on'] },
  { word: 'চলে', phonetic: 'chole', frequency: 8800, category: WordCategory.VERB, meanings: ['walks', 'moves'] },
  { word: 'চলি', phonetic: 'choli', frequency: 8400, category: WordCategory.VERB, meanings: ['walk (I)'] },
  { word: 'চলছে', phonetic: 'cholchhe', frequency: 8500, category: WordCategory.VERB, meanings: ['going on'] },
  { word: 'চলেছি', phonetic: 'cholechhi', frequency: 8200, category: WordCategory.VERB, meanings: ['have walked'] },

  { word: 'দৌড়ানো', phonetic: 'douRano', frequency: 7800, category: WordCategory.VERB, meanings: ['to run'] },
  { word: 'দৌড়ায়', phonetic: 'douRay', frequency: 7600, category: WordCategory.VERB, meanings: ['runs'] },
  { word: 'দৌড়াই', phonetic: 'douRai', frequency: 7400, category: WordCategory.VERB, meanings: ['run (I)'] },
  { word: 'দৌড়ালাম', phonetic: 'douRalam', frequency: 7300, category: WordCategory.VERB, meanings: ['ran (I)'] },

  { word: 'ওঠা', phonetic: 'oTha', frequency: 8700, category: WordCategory.VERB, meanings: ['to rise', 'to get up'] },
  { word: 'ওঠে', phonetic: 'oThe', frequency: 8500, category: WordCategory.VERB, meanings: ['rises', 'gets up'] },
  { word: 'উঠি', phonetic: 'uThi', frequency: 8300, category: WordCategory.VERB, meanings: ['rise (I)'] },
  { word: 'উঠেছি', phonetic: 'uThechhi', frequency: 8100, category: WordCategory.VERB, meanings: ['have gotten up'] },
  { word: 'উঠব', phonetic: 'uThbo', frequency: 8000, category: WordCategory.VERB, meanings: ['will get up'] },

  { word: 'বসা', phonetic: 'bosha', frequency: 8800, category: WordCategory.VERB, meanings: ['to sit'] },
  { word: 'বসে', phonetic: 'boshe', frequency: 8600, category: WordCategory.VERB, meanings: ['sits'] },
  { word: 'বসি', phonetic: 'boshi', frequency: 8400, category: WordCategory.VERB, meanings: ['sit (I)'] },
  { word: 'বসেছি', phonetic: 'boshechhi', frequency: 8100, category: WordCategory.VERB, meanings: ['have sat'] },

  { word: 'দাঁড়ানো', phonetic: 'daRano', frequency: 8400, category: WordCategory.VERB, meanings: ['to stand'] },
  { word: 'দাঁড়ায়', phonetic: 'daRay', frequency: 8200, category: WordCategory.VERB, meanings: ['stands'] },
  { word: 'দাঁড়াই', phonetic: 'daRai', frequency: 8000, category: WordCategory.VERB, meanings: ['stand (I)'] },
  { word: 'দাঁড়িয়ে', phonetic: 'daRiye', frequency: 8100, category: WordCategory.VERB, meanings: ['standing'] },

  { word: 'ঘুমানো', phonetic: 'ghumano', frequency: 8300, category: WordCategory.VERB, meanings: ['to sleep'] },
  { word: 'ঘুমায়', phonetic: 'ghumay', frequency: 8100, category: WordCategory.VERB, meanings: ['sleeps'] },
  { word: 'ঘুমাই', phonetic: 'ghumai', frequency: 7900, category: WordCategory.VERB, meanings: ['sleep (I)'] },
  { word: 'ঘুমিয়ে', phonetic: 'ghumiye', frequency: 8000, category: WordCategory.VERB, meanings: ['sleeping'] },
  { word: 'ঘুমালাম', phonetic: 'ghumalam', frequency: 7700, category: WordCategory.VERB, meanings: ['slept (I)'] },

  { word: 'জাগা', phonetic: 'jaga', frequency: 8100, category: WordCategory.VERB, meanings: ['to wake up', 'to stay awake'] },
  { word: 'জাগে', phonetic: 'jage', frequency: 7900, category: WordCategory.VERB, meanings: ['wakes up'] },
  { word: 'জাগি', phonetic: 'jagi', frequency: 7700, category: WordCategory.VERB, meanings: ['wake (I)'] },
  { word: 'জেগেছি', phonetic: 'jegechhi', frequency: 7800, category: WordCategory.VERB, meanings: ['have woken'] },

  // Communication verbs
  { word: 'বলা', phonetic: 'bola', frequency: 9500, category: WordCategory.VERB, meanings: ['to say', 'to tell'] },
  { word: 'বলছি', phonetic: 'bolchhi', frequency: 9000, category: WordCategory.VERB, meanings: ['saying (I)'] },
  { word: 'বলছে', phonetic: 'bolchhe', frequency: 9100, category: WordCategory.VERB, meanings: ['saying'] },
  { word: 'বললাম', phonetic: 'bollam', frequency: 8800, category: WordCategory.VERB, meanings: ['said (I)'] },
  { word: 'বলল', phonetic: 'bollo', frequency: 8700, category: WordCategory.VERB, meanings: ['said'] },
  { word: 'বলেছিল', phonetic: 'bolechhilo', frequency: 8400, category: WordCategory.VERB, meanings: ['had said'] },

  { word: 'কথা বলা', phonetic: 'kotha bola', frequency: 8900, category: WordCategory.VERB, meanings: ['to speak', 'to talk'] },
  { word: 'শুনা', phonetic: 'shuna', frequency: 9200, category: WordCategory.VERB, meanings: ['to hear', 'to listen'] },
  { word: 'শুনে', phonetic: 'shune', frequency: 9000, category: WordCategory.VERB, meanings: ['hears', 'listens'] },
  { word: 'শুনি', phonetic: 'shuni', frequency: 8900, category: WordCategory.VERB, meanings: ['hear (I)'] },
  { word: 'শুনেছি', phonetic: 'shunechhi', frequency: 8700, category: WordCategory.VERB, meanings: ['have heard'] },
  { word: 'শুনব', phonetic: 'shunbo', frequency: 8600, category: WordCategory.VERB, meanings: ['will hear'] },

  { word: 'জিজ্ঞাসা', phonetic: 'jiggasha', frequency: 8400, category: WordCategory.VERB, meanings: ['to ask', 'question'] },
  { word: 'জিজ্ঞেস', phonetic: 'jigghesh', frequency: 8300, category: WordCategory.VERB, meanings: ['to ask'] },
  { word: 'জিজ্ঞাসা করা', phonetic: 'jiggasha kora', frequency: 8200, category: WordCategory.VERB, meanings: ['to ask'] },

  { word: 'উত্তর', phonetic: 'uttor', frequency: 8500, category: WordCategory.NOUN, meanings: ['answer'] },
  { word: 'উত্তর দেওয়া', phonetic: 'uttor deowa', frequency: 8200, category: WordCategory.VERB, meanings: ['to answer'] },
  { word: 'জবাব', phonetic: 'jobab', frequency: 7900, category: WordCategory.NOUN, meanings: ['reply', 'answer'] },

  { word: 'লেখা', phonetic: 'lekha', frequency: 9000, category: WordCategory.VERB, meanings: ['to write'] },
  { word: 'লেখে', phonetic: 'lekhe', frequency: 8800, category: WordCategory.VERB, meanings: ['writes'] },
  { word: 'লিখি', phonetic: 'likhi', frequency: 8700, category: WordCategory.VERB, meanings: ['write (I)'] },
  { word: 'লিখেছি', phonetic: 'likhechhi', frequency: 8500, category: WordCategory.VERB, meanings: ['have written'] },
  { word: 'লিখব', phonetic: 'likhbo', frequency: 8400, category: WordCategory.VERB, meanings: ['will write'] },
  { word: 'লিখছি', phonetic: 'likhchhi', frequency: 8600, category: WordCategory.VERB, meanings: ['writing (I)'] },

  { word: 'পড়া', phonetic: 'poRa', frequency: 9100, category: WordCategory.VERB, meanings: ['to read', 'to study', 'to fall'] },
  { word: 'পড়ে', phonetic: 'poRe', frequency: 8900, category: WordCategory.VERB, meanings: ['reads', 'studies'] },
  { word: 'পড়ি', phonetic: 'poRi', frequency: 8800, category: WordCategory.VERB, meanings: ['read (I)'] },
  { word: 'পড়েছি', phonetic: 'poRechhi', frequency: 8600, category: WordCategory.VERB, meanings: ['have read'] },
  { word: 'পড়ব', phonetic: 'poRbo', frequency: 8500, category: WordCategory.VERB, meanings: ['will read'] },
  { word: 'পড়ছি', phonetic: 'poRchhi', frequency: 8700, category: WordCategory.VERB, meanings: ['reading (I)'] },

  { word: 'শেখা', phonetic: 'shekha', frequency: 8700, category: WordCategory.VERB, meanings: ['to learn'] },
  { word: 'শেখে', phonetic: 'shekhe', frequency: 8500, category: WordCategory.VERB, meanings: ['learns'] },
  { word: 'শিখি', phonetic: 'shikhi', frequency: 8400, category: WordCategory.VERB, meanings: ['learn (I)'] },
  { word: 'শিখেছি', phonetic: 'shikhechhi', frequency: 8200, category: WordCategory.VERB, meanings: ['have learned'] },
  { word: 'শিখব', phonetic: 'shikhbo', frequency: 8100, category: WordCategory.VERB, meanings: ['will learn'] },
  { word: 'শিখছি', phonetic: 'shikhchhi', frequency: 8300, category: WordCategory.VERB, meanings: ['learning (I)'] },

  { word: 'শেখানো', phonetic: 'shekhano', frequency: 8400, category: WordCategory.VERB, meanings: ['to teach'] },
  { word: 'শেখায়', phonetic: 'shekhay', frequency: 8200, category: WordCategory.VERB, meanings: ['teaches'] },
  { word: 'শেখাই', phonetic: 'shekhai', frequency: 8000, category: WordCategory.VERB, meanings: ['teach (I)'] },
  { word: 'শিখিয়েছি', phonetic: 'shikhiyechhi', frequency: 7800, category: WordCategory.VERB, meanings: ['have taught'] },

  // Perception & thinking verbs
  { word: 'দেখা', phonetic: 'dekha', frequency: 9600, category: WordCategory.VERB, meanings: ['to see', 'to look'] },
  { word: 'দেখছি', phonetic: 'dekhchhi', frequency: 9100, category: WordCategory.VERB, meanings: ['seeing (I)'] },
  { word: 'দেখছে', phonetic: 'dekhchhe', frequency: 9200, category: WordCategory.VERB, meanings: ['seeing'] },
  { word: 'দেখলাম', phonetic: 'dekhlam', frequency: 9000, category: WordCategory.VERB, meanings: ['saw (I)'] },
  { word: 'দেখল', phonetic: 'dekhlo', frequency: 8900, category: WordCategory.VERB, meanings: ['saw'] },
  { word: 'দেখেছিল', phonetic: 'dekhechhilo', frequency: 8600, category: WordCategory.VERB, meanings: ['had seen'] },

  { word: 'জানা', phonetic: 'jana', frequency: 9400, category: WordCategory.VERB, meanings: ['to know'] },
  { word: 'জানছি', phonetic: 'janchhi', frequency: 8700, category: WordCategory.VERB, meanings: ['knowing (I)'] },
  { word: 'জানতাম', phonetic: 'jantam', frequency: 8600, category: WordCategory.VERB, meanings: ['knew (I)'] },
  { word: 'জানত', phonetic: 'janto', frequency: 8500, category: WordCategory.VERB, meanings: ['knew'] },

  { word: 'বুঝা', phonetic: 'bujha', frequency: 8900, category: WordCategory.VERB, meanings: ['to understand'] },
  { word: 'বুঝে', phonetic: 'bujhe', frequency: 8700, category: WordCategory.VERB, meanings: ['understands'] },
  { word: 'বুঝি', phonetic: 'bujhi', frequency: 8600, category: WordCategory.VERB, meanings: ['understand (I)'] },
  { word: 'বুঝেছি', phonetic: 'bujhechhi', frequency: 8400, category: WordCategory.VERB, meanings: ['have understood'] },
  { word: 'বুঝব', phonetic: 'bujhbo', frequency: 8300, category: WordCategory.VERB, meanings: ['will understand'] },
  { word: 'বুঝছি', phonetic: 'bujhchhi', frequency: 8500, category: WordCategory.VERB, meanings: ['understanding (I)'] },

  { word: 'ভাবা', phonetic: 'bhaba', frequency: 8800, category: WordCategory.VERB, meanings: ['to think'] },
  { word: 'ভাবে', phonetic: 'bhabe', frequency: 8600, category: WordCategory.VERB, meanings: ['thinks'] },
  { word: 'ভাবি', phonetic: 'bhabi', frequency: 8500, category: WordCategory.VERB, meanings: ['think (I)'] },
  { word: 'ভেবেছি', phonetic: 'bhebechhi', frequency: 8300, category: WordCategory.VERB, meanings: ['have thought'] },
  { word: 'ভাবব', phonetic: 'bhabbo', frequency: 8200, category: WordCategory.VERB, meanings: ['will think'] },
  { word: 'ভাবছি', phonetic: 'bhabchhi', frequency: 8400, category: WordCategory.VERB, meanings: ['thinking (I)'] },

  { word: 'মনে', phonetic: 'mone', frequency: 9000, category: WordCategory.NOUN, meanings: ['in mind'] },
  { word: 'মনে করা', phonetic: 'mone kora', frequency: 8700, category: WordCategory.VERB, meanings: ['to think', 'to remember'] },
  { word: 'মনে পড়া', phonetic: 'mone poRa', frequency: 8500, category: WordCategory.VERB, meanings: ['to remember'] },
  { word: 'মনে আছে', phonetic: 'mone achhe', frequency: 8600, category: WordCategory.VERB, meanings: ['remember'] },

  { word: 'ভুলা', phonetic: 'bhula', frequency: 8300, category: WordCategory.VERB, meanings: ['to forget'] },
  { word: 'ভুলে', phonetic: 'bhule', frequency: 8100, category: WordCategory.VERB, meanings: ['forgets'] },
  { word: 'ভুলি', phonetic: 'bhuli', frequency: 7900, category: WordCategory.VERB, meanings: ['forget (I)'] },
  { word: 'ভুলে গেছি', phonetic: 'bhule gechhi', frequency: 8000, category: WordCategory.VERB, meanings: ['have forgotten'] },
  { word: 'ভুলে গেছে', phonetic: 'bhule gechhe', frequency: 8100, category: WordCategory.VERB, meanings: ['has forgotten'] },

  { word: 'চিন্তা', phonetic: 'chinta', frequency: 8600, category: WordCategory.NOUN, meanings: ['thought', 'worry'] },
  { word: 'চিন্তা করা', phonetic: 'chinta kora', frequency: 8400, category: WordCategory.VERB, meanings: ['to think', 'to worry'] },

  // Action verbs
  { word: 'করা', phonetic: 'kora', frequency: 9800, category: WordCategory.VERB, meanings: ['to do', 'to make'] },
  { word: 'করছি', phonetic: 'korchhi', frequency: 9400, category: WordCategory.VERB, meanings: ['doing (I)'] },
  { word: 'করছে', phonetic: 'korchhe', frequency: 9500, category: WordCategory.VERB, meanings: ['doing'] },
  { word: 'করলাম', phonetic: 'korlam', frequency: 9200, category: WordCategory.VERB, meanings: ['did (I)'] },
  { word: 'করল', phonetic: 'korlo', frequency: 9100, category: WordCategory.VERB, meanings: ['did'] },
  { word: 'করেছিল', phonetic: 'korechhilo', frequency: 8900, category: WordCategory.VERB, meanings: ['had done'] },
  { word: 'করতাম', phonetic: 'kortam', frequency: 8700, category: WordCategory.VERB, meanings: ['used to do (I)'] },
  { word: 'করত', phonetic: 'korto', frequency: 8600, category: WordCategory.VERB, meanings: ['used to do'] },

  { word: 'নেওয়া', phonetic: 'neowa', frequency: 9300, category: WordCategory.VERB, meanings: ['to take'] },
  { word: 'নিচ্ছি', phonetic: 'nichhi', frequency: 8800, category: WordCategory.VERB, meanings: ['taking (I)'] },
  { word: 'নিচ্ছে', phonetic: 'nichhe', frequency: 8900, category: WordCategory.VERB, meanings: ['taking'] },
  { word: 'নিলাম', phonetic: 'nilam', frequency: 8600, category: WordCategory.VERB, meanings: ['took (I)'] },
  { word: 'নিল', phonetic: 'nilo', frequency: 8500, category: WordCategory.VERB, meanings: ['took'] },
  { word: 'নিয়েছিল', phonetic: 'niyechhilo', frequency: 8200, category: WordCategory.VERB, meanings: ['had taken'] },

  { word: 'দেওয়া', phonetic: 'deowa', frequency: 9400, category: WordCategory.VERB, meanings: ['to give'] },
  { word: 'দিচ্ছি', phonetic: 'dichhi', frequency: 8900, category: WordCategory.VERB, meanings: ['giving (I)'] },
  { word: 'দিচ্ছে', phonetic: 'dichhe', frequency: 9000, category: WordCategory.VERB, meanings: ['giving'] },
  { word: 'দিলাম', phonetic: 'dilam', frequency: 8700, category: WordCategory.VERB, meanings: ['gave (I)'] },
  { word: 'দিল', phonetic: 'dilo', frequency: 8600, category: WordCategory.VERB, meanings: ['gave'] },
  { word: 'দিয়েছিল', phonetic: 'diyechhilo', frequency: 8300, category: WordCategory.VERB, meanings: ['had given'] },

  { word: 'রাখা', phonetic: 'rakha', frequency: 8600, category: WordCategory.VERB, meanings: ['to keep', 'to put'] },
  { word: 'রাখে', phonetic: 'rakhe', frequency: 8400, category: WordCategory.VERB, meanings: ['keeps'] },
  { word: 'রাখি', phonetic: 'rakhi', frequency: 8300, category: WordCategory.VERB, meanings: ['keep (I)'] },
  { word: 'রেখেছি', phonetic: 'rekhechhi', frequency: 8100, category: WordCategory.VERB, meanings: ['have kept'] },
  { word: 'রাখব', phonetic: 'rakhbo', frequency: 8000, category: WordCategory.VERB, meanings: ['will keep'] },

  { word: 'ফেলা', phonetic: 'phela', frequency: 8300, category: WordCategory.VERB, meanings: ['to throw', 'to drop'] },
  { word: 'ফেলে', phonetic: 'phele', frequency: 8100, category: WordCategory.VERB, meanings: ['throws'] },
  { word: 'ফেলি', phonetic: 'pheli', frequency: 7900, category: WordCategory.VERB, meanings: ['throw (I)'] },
  { word: 'ফেলেছি', phonetic: 'phelechhi', frequency: 7800, category: WordCategory.VERB, meanings: ['have thrown'] },

  { word: 'খোলা', phonetic: 'khola', frequency: 8400, category: WordCategory.VERB, meanings: ['to open'] },
  { word: 'খোলে', phonetic: 'khole', frequency: 8200, category: WordCategory.VERB, meanings: ['opens'] },
  { word: 'খুলি', phonetic: 'khuli', frequency: 8000, category: WordCategory.VERB, meanings: ['open (I)'] },
  { word: 'খুলেছি', phonetic: 'khulechhi', frequency: 7900, category: WordCategory.VERB, meanings: ['have opened'] },

  { word: 'বন্ধ', phonetic: 'bondho', frequency: 8600, category: WordCategory.ADJECTIVE, meanings: ['closed'] },
  { word: 'বন্ধ করা', phonetic: 'bondho kora', frequency: 8400, category: WordCategory.VERB, meanings: ['to close'] },

  { word: 'শুরু', phonetic: 'shuru', frequency: 8700, category: WordCategory.NOUN, meanings: ['start', 'beginning'] },
  { word: 'শুরু করা', phonetic: 'shuru kora', frequency: 8600, category: WordCategory.VERB, meanings: ['to start'] },
  { word: 'শেষ', phonetic: 'sheSh', frequency: 8800, category: WordCategory.NOUN, meanings: ['end', 'finish'] },
  { word: 'শেষ করা', phonetic: 'sheSh kora', frequency: 8500, category: WordCategory.VERB, meanings: ['to finish'] },

  { word: 'খুঁজা', phonetic: 'khuja', frequency: 8300, category: WordCategory.VERB, meanings: ['to search', 'to look for'] },
  { word: 'খুঁজে', phonetic: 'khuje', frequency: 8100, category: WordCategory.VERB, meanings: ['searches'] },
  { word: 'খুঁজি', phonetic: 'khuji', frequency: 7900, category: WordCategory.VERB, meanings: ['search (I)'] },
  { word: 'খুঁজেছি', phonetic: 'khujechhi', frequency: 7800, category: WordCategory.VERB, meanings: ['have searched'] },

  { word: 'পাওয়া', phonetic: 'paowa', frequency: 9200, category: WordCategory.VERB, meanings: ['to get', 'to find'] },
  { word: 'পাচ্ছি', phonetic: 'pachhi', frequency: 8800, category: WordCategory.VERB, meanings: ['getting (I)'] },
  { word: 'পেলাম', phonetic: 'pelam', frequency: 8700, category: WordCategory.VERB, meanings: ['got (I)'] },
  { word: 'পেল', phonetic: 'pelo', frequency: 8600, category: WordCategory.VERB, meanings: ['got'] },

  { word: 'হারানো', phonetic: 'harano', frequency: 7900, category: WordCategory.VERB, meanings: ['to lose'] },
  { word: 'হারায়', phonetic: 'haray', frequency: 7700, category: WordCategory.VERB, meanings: ['loses'] },
  { word: 'হারাই', phonetic: 'harai', frequency: 7500, category: WordCategory.VERB, meanings: ['lose (I)'] },
  { word: 'হারিয়েছি', phonetic: 'hariyechhi', frequency: 7600, category: WordCategory.VERB, meanings: ['have lost'] },
  { word: 'হারিয়ে', phonetic: 'hariye', frequency: 7700, category: WordCategory.VERB, meanings: ['losing'] },

  // Eating & drinking
  { word: 'খাওয়া', phonetic: 'khaowa', frequency: 9200, category: WordCategory.VERB, meanings: ['to eat'] },
  { word: 'খাচ্ছি', phonetic: 'khachhi', frequency: 8700, category: WordCategory.VERB, meanings: ['eating (I)'] },
  { word: 'খাচ্ছে', phonetic: 'khachhe', frequency: 8800, category: WordCategory.VERB, meanings: ['eating'] },
  { word: 'খেলাম', phonetic: 'khelam', frequency: 8500, category: WordCategory.VERB, meanings: ['ate (I)'] },
  { word: 'খেল', phonetic: 'khelo', frequency: 8400, category: WordCategory.VERB, meanings: ['ate'] },
  { word: 'খেয়েছিল', phonetic: 'kheyechhilo', frequency: 8100, category: WordCategory.VERB, meanings: ['had eaten'] },
  { word: 'খাব', phonetic: 'khabo', frequency: 8600, category: WordCategory.VERB, meanings: ['will eat'] },

  { word: 'পান করা', phonetic: 'pan kora', frequency: 8200, category: WordCategory.VERB, meanings: ['to drink'] },
  { word: 'পান', phonetic: 'pan', frequency: 8400, category: WordCategory.NOUN, meanings: ['betel leaf', 'drink'] },
  { word: 'পিয়েছি', phonetic: 'piyechhi', frequency: 7800, category: WordCategory.VERB, meanings: ['have drunk'] },

  { word: 'রান্না', phonetic: 'ranna', frequency: 8300, category: WordCategory.NOUN, meanings: ['cooking'] },
  { word: 'রান্না করা', phonetic: 'ranna kora', frequency: 8200, category: WordCategory.VERB, meanings: ['to cook'] },
  { word: 'রান্নারেখেন', phonetic: 'ranna koren', frequency: 7900, category: WordCategory.VERB, meanings: ['cook (formal)'] },

  // Emotional & social verbs
  { word: 'ভালোবাসা', phonetic: 'bhalobasha', frequency: 9300, category: WordCategory.VERB, meanings: ['to love'] },
  { word: 'ভালবাসা', phonetic: 'bhalbasha', frequency: 9200, category: WordCategory.VERB, meanings: ['to love'] },
  { word: 'ভালোবাসেন', phonetic: 'bhalobashen', frequency: 8900, category: WordCategory.VERB, meanings: ['love (formal)'] },
  { word: 'ভালবেসেছি', phonetic: 'bhalbeshechhi', frequency: 8600, category: WordCategory.VERB, meanings: ['have loved'] },

  { word: 'পছন্দ', phonetic: 'pochondo', frequency: 8700, category: WordCategory.NOUN, meanings: ['like', 'preference'] },
  { word: 'পছন্দ করা', phonetic: 'pochondo kora', frequency: 8600, category: WordCategory.VERB, meanings: ['to like'] },

  { word: 'ঘৃণা', phonetic: 'ghriNa', frequency: 7800, category: WordCategory.NOUN, meanings: ['hatred'] },
  { word: 'ঘৃণা করা', phonetic: 'ghriNa kora', frequency: 7600, category: WordCategory.VERB, meanings: ['to hate'] },

  { word: 'হাসা', phonetic: 'hasha', frequency: 8500, category: WordCategory.VERB, meanings: ['to laugh', 'to smile'] },
  { word: 'হাসে', phonetic: 'hashe', frequency: 8300, category: WordCategory.VERB, meanings: ['laughs'] },
  { word: 'হাসি', phonetic: 'hashi', frequency: 8400, category: WordCategory.NOUN, meanings: ['laughter', 'smile'] },
  { word: 'হেসেছি', phonetic: 'heshechhi', frequency: 8100, category: WordCategory.VERB, meanings: ['have laughed'] },

  { word: 'কাঁদা', phonetic: 'kada', frequency: 8200, category: WordCategory.VERB, meanings: ['to cry'] },
  { word: 'কাঁদে', phonetic: 'kade', frequency: 8000, category: WordCategory.VERB, meanings: ['cries'] },
  { word: 'কাঁদি', phonetic: 'kadi', frequency: 7800, category: WordCategory.VERB, meanings: ['cry (I)'] },
  { word: 'কেঁদেছি', phonetic: 'kedechhi', frequency: 7700, category: WordCategory.VERB, meanings: ['have cried'] },

  { word: 'খেলা', phonetic: 'khela', frequency: 8600, category: WordCategory.VERB, meanings: ['to play'] },
  { word: 'খেলে', phonetic: 'khele', frequency: 8400, category: WordCategory.VERB, meanings: ['plays'] },
  { word: 'খেলি', phonetic: 'kheli', frequency: 8300, category: WordCategory.VERB, meanings: ['play (I)'] },
  { word: 'খেলেছি', phonetic: 'khelechhi', frequency: 8100, category: WordCategory.VERB, meanings: ['have played'] },
  { word: 'খেলব', phonetic: 'khelbo', frequency: 8000, category: WordCategory.VERB, meanings: ['will play'] },

  { word: 'সাহায্য', phonetic: 'shahajjo', frequency: 8600, category: WordCategory.NOUN, meanings: ['help'] },
  { word: 'সাহায্য করা', phonetic: 'shahajjo kora', frequency: 8400, category: WordCategory.VERB, meanings: ['to help'] },

  { word: 'চেষ্টা', phonetic: 'cheShTa', frequency: 8500, category: WordCategory.NOUN, meanings: ['try', 'effort'] },
  { word: 'চেষ্টা করা', phonetic: 'cheShTa kora', frequency: 8400, category: WordCategory.VERB, meanings: ['to try'] },

  { word: 'চাওয়া', phonetic: 'chaowa', frequency: 9100, category: WordCategory.VERB, meanings: ['to want'] },
  { word: 'চাচ্ছি', phonetic: 'chachhi', frequency: 8700, category: WordCategory.VERB, meanings: ['wanting (I)'] },
  { word: 'চাইলাম', phonetic: 'chailam', frequency: 8500, category: WordCategory.VERB, meanings: ['wanted (I)'] },
  { word: 'চেয়েছিল', phonetic: 'cheyechhilo', frequency: 8300, category: WordCategory.VERB, meanings: ['had wanted'] },

  { word: 'পারা', phonetic: 'para', frequency: 9500, category: WordCategory.VERB, meanings: ['to be able', 'can'] },
  { word: 'পারছি', phonetic: 'parchhi', frequency: 9100, category: WordCategory.VERB, meanings: ['can (I)', 'being able'] },
  { word: 'পারলাম', phonetic: 'parlam', frequency: 8900, category: WordCategory.VERB, meanings: ['could (I)', 'was able'] },
  { word: 'পারল', phonetic: 'parlo', frequency: 8800, category: WordCategory.VERB, meanings: ['could', 'was able'] },
  { word: 'পারতাম', phonetic: 'partam', frequency: 8600, category: WordCategory.VERB, meanings: ['could (I)', 'used to be able'] },
];
