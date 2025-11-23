import { Transliterator } from './transliterator';
import { PhoneticMode, DigitFormat } from '../types';

describe('Transliterator', () => {
  let engine: Transliterator;

  beforeEach(() => {
    engine = new Transliterator();
  });

  describe('Basic Vowels', () => {
    test('should convert single vowels correctly', () => {
      expect(engine.convert('a').text).toBe('আ');
      expect(engine.convert('i').text).toBe('ই');
      expect(engine.convert('u').text).toBe('উ');
      expect(engine.convert('e').text).toBe('এ');
      expect(engine.convert('o').text).toBe('ও');
    });

    test('should convert double vowels correctly', () => {
      expect(engine.convert('aa').text).toBe('আআ');
      expect(engine.convert('ii').text).toBe('ঈ');
      expect(engine.convert('ee').text).toBe('ঈ');
      expect(engine.convert('uu').text).toBe('ঊ');
      expect(engine.convert('oo').text).toBe('উ');
      expect(engine.convert('oi').text).toBe('ঐ');
      expect(engine.convert('ou').text).toBe('ঔ');
    });
  });

  describe('Basic Consonants', () => {
    test('should convert simple consonants', () => {
      expect(engine.convert('k').text).toBe('ক');
      expect(engine.convert('g').text).toBe('গ');
      expect(engine.convert('c').text).toBe('চ');
      expect(engine.convert('j').text).toBe('জ');
      expect(engine.convert('t').text).toBe('ত');
      expect(engine.convert('d').text).toBe('দ');
      expect(engine.convert('n').text).toBe('ন');
      expect(engine.convert('p').text).toBe('প');
      expect(engine.convert('b').text).toBe('ব');
      expect(engine.convert('m').text).toBe('ম');
      expect(engine.convert('r').text).toBe('র');
      expect(engine.convert('l').text).toBe('ল');
      expect(engine.convert('s').text).toBe('স');
      expect(engine.convert('h').text).toBe('হ');
    });

    test('should convert aspirated consonants', () => {
      expect(engine.convert('kh').text).toBe('খ');
      expect(engine.convert('gh').text).toBe('ঘ');
      expect(engine.convert('ch').text).toBe('চ');
      expect(engine.convert('jh').text).toBe('ঝ');
      expect(engine.convert('th').text).toBe('থ');
      expect(engine.convert('dh').text).toBe('ধ');
      expect(engine.convert('ph').text).toBe('ফ');
      expect(engine.convert('bh').text).toBe('ভ');
    });

    test('should convert retroflex consonants', () => {
      expect(engine.convert('T').text).toBe('ট');
      expect(engine.convert('Th').text).toBe('ঠ');
      expect(engine.convert('D').text).toBe('ড');
      expect(engine.convert('Dh').text).toBe('ঢ');
      expect(engine.convert('R').text).toBe('ড়');
      expect(engine.convert('Rh').text).toBe('ঢ়');
      expect(engine.convert('N').text).toBe('ণ');
    });

    test('should convert special consonants', () => {
      expect(engine.convert('ng').text).toBe('ঙ');
      expect(engine.convert('sh').text).toBe('শ');
      expect(engine.convert('Sh').text).toBe('ষ');
      expect(engine.convert('y').text).toBe('য়');
      expect(engine.convert('Y').text).toBe('য');
    });
  });

  describe('Vowel Signs (Kars)', () => {
    test('should convert consonant + vowel to consonant + kar', () => {
      expect(engine.convert('ka').text).toBe('কা');
      expect(engine.convert('ki').text).toBe('কি');
      expect(engine.convert('ku').text).toBe('কু');
      expect(engine.convert('ke').text).toBe('কে');
      expect(engine.convert('ko').text).toBe('কো');
    });

    test('should handle double vowels after consonants', () => {
      expect(engine.convert('kii').text).toBe('কী');
      expect(engine.convert('kee').text).toBe('কী');
      expect(engine.convert('kuu').text).toBe('কূ');
      expect(engine.convert('koo').text).toBe('কু');
      expect(engine.convert('koi').text).toBe('কৈ');
      expect(engine.convert('kou').text).toBe('কৌ');
    });
  });

  describe('Words and Phrases', () => {
    test('should convert common Bengali words', () => {
      expect(engine.convert('bangla').text).toBe('বাঙলা');
      expect(engine.convert('bhasha').text).toBe('ভাষা');
      expect(engine.convert('ami').text).toBe('আমি');
      expect(engine.convert('tumi').text).toBe('তুমি');
      expect(engine.convert('bhalo').text).toBe('ভালো');
      expect(engine.convert('shundor').text).toBe('শুন্দোর');
    });

    test('should handle mixed words', () => {
      expect(engine.convert('namaste').text).toBe('নামাস্তে');
      expect(engine.convert('dhonnobad').text).toBe('ধন্নোবাদ');
    });

    test('should preserve spaces', () => {
      expect(engine.convert('ami tomake bhalobashi').text).toBe('আমি তোমাকে ভালোবাষি');
    });
  });

  describe('Special Characters', () => {
    test('should convert anusvara', () => {
      expect(engine.convert('Ng').text).toBe('ং');
      expect(engine.convert('NG').text).toBe('ং');
    });

    test('should convert visarga', () => {
      expect(engine.convert('H').text).toBe('ঃ');
    });

    test('should convert chandrabindu', () => {
      expect(engine.convert('~').text).toBe('ঁ');
    });

    test('should handle explicit hasanta', () => {
      expect(engine.convert('k^').text).toBe('ক্');
    });
  });

  describe('Numbers', () => {
    test('should convert to Bengali digits by default', () => {
      expect(engine.convert('0').text).toBe('০');
      expect(engine.convert('1').text).toBe('১');
      expect(engine.convert('123').text).toBe('১২৩');
      expect(engine.convert('2025').text).toBe('২০২৫');
    });

    test('should keep Western digits when configured', () => {
      const westernEngine = new Transliterator({ digitFormat: DigitFormat.WESTERN });
      expect(westernEngine.convert('123').text).toBe('123');
      expect(westernEngine.convert('2025').text).toBe('2025');
    });
  });

  describe('Escape Sequences', () => {
    test('should escape to raw Latin with backslash', () => {
      expect(engine.convert('\\hello').text).toBe('hello');
      expect(engine.convert('\\test ami').text).toBe('test আমি');
    });

    test('should handle escape followed by space', () => {
      expect(engine.convert('\\ok tumi').text).toBe('ok তুমি');
    });
  });

  describe('Punctuation', () => {
    test('should preserve common punctuation', () => {
      expect(engine.convert('ki koro?').text).toBe('কি কোরো?');
      expect(engine.convert('bhalo achi!').text).toBe('ভালো আছি!');
      expect(engine.convert('ami, tumi').text).toBe('আমি, তুমি');
    });

    test('should convert dari', () => {
      expect(engine.convert('..').text).toBe('।');
    });

    test('should keep single period', () => {
      expect(engine.convert('.').text).toBe('.');
    });
  });

  describe('Smart Mode vs Basic Mode', () => {
    test('smart mode should be default', () => {
      const smartEngine = new Transliterator({ mode: PhoneticMode.SMART });
      expect(smartEngine.getConfig().mode).toBe(PhoneticMode.SMART);
    });

    test('basic mode should work', () => {
      const basicEngine = new Transliterator({ mode: PhoneticMode.BASIC });
      expect(basicEngine.convert('ka').text).toBe('কা');
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty input', () => {
      expect(engine.convert('').text).toBe('');
    });

    test('should handle whitespace', () => {
      expect(engine.convert('   ').text).toBe('   ');
    });

    test('should handle single character', () => {
      expect(engine.convert('a').text).toBe('আ');
      expect(engine.convert('k').text).toBe('ক');
    });

    test('should handle repeated characters', () => {
      expect(engine.convert('aaa').text).toBe('আআআ');
      expect(engine.convert('kkk').text).toBe('ক্ক্ক');
    });
  });

  describe('Configuration Management', () => {
    test('should update configuration', () => {
      engine.updateConfig({ digitFormat: DigitFormat.WESTERN });
      expect(engine.getConfig().digitFormat).toBe(DigitFormat.WESTERN);
    });

    test('should maintain other config when updating', () => {
      const originalMode = engine.getConfig().mode;
      engine.updateConfig({ digitFormat: DigitFormat.WESTERN });
      expect(engine.getConfig().mode).toBe(originalMode);
    });

    test('should get current mapping', () => {
      const mapping = engine.getMapping();
      expect(mapping.vowels).toBeDefined();
      expect(mapping.consonants).toBeDefined();
      expect(mapping.vowelSigns).toBeDefined();
    });
  });

  describe('Complex Scenarios', () => {
    test('should handle sentence with mixed elements', () => {
      const input = 'ami 25 bochhor boyeshi.. tumi kemon acho?';
      const result = engine.convert(input).text;
      expect(result).toContain('আমি');
      expect(result).toContain('২৫');
      expect(result).toContain('তুমি');
      expect(result).toContain('?');
    });

    test('should handle names with escape', () => {
      const input = '\\John bole, "ami bangla shikhchi"';
      const result = engine.convert(input).text;
      expect(result).toContain('John');
      expect(result).toContain('বাঙলা');
    });
  });
});
