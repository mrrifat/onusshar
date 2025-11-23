import { ConfigManager } from './config-manager';
import { PhoneticMode, DigitFormat, UserSettings } from '../types';

describe('ConfigManager', () => {
  describe('getDefaultSettings', () => {
    test('should return valid default settings', () => {
      const defaults = ConfigManager.getDefaultSettings();
      expect(defaults.mode).toBe(PhoneticMode.SMART);
      expect(defaults.digitFormat).toBe(DigitFormat.BANGLA);
      expect(defaults.enableHotkey).toBe(true);
      expect(defaults.hotkeyModifiers).toEqual(['Control', 'Alt']);
      expect(defaults.hotkeyKey).toBe('B');
    });
  });

  describe('validateSettings', () => {
    test('should validate correct settings', () => {
      const settings: UserSettings = {
        mode: PhoneticMode.SMART,
        digitFormat: DigitFormat.WESTERN,
        enableHotkey: true,
        hotkeyModifiers: ['Control', 'Shift'],
        hotkeyKey: 'K',
      };
      const validated = ConfigManager.validateSettings(settings);
      expect(validated).toEqual(settings);
    });

    test('should use defaults for invalid mode', () => {
      const settings = { mode: 'invalid' as PhoneticMode };
      const validated = ConfigManager.validateSettings(settings);
      expect(validated.mode).toBe(PhoneticMode.SMART);
    });

    test('should use defaults for invalid digitFormat', () => {
      const settings = { digitFormat: 'invalid' as DigitFormat };
      const validated = ConfigManager.validateSettings(settings);
      expect(validated.digitFormat).toBe(DigitFormat.BANGLA);
    });

    test('should handle partial settings', () => {
      const settings = { mode: PhoneticMode.BASIC };
      const validated = ConfigManager.validateSettings(settings);
      expect(validated.mode).toBe(PhoneticMode.BASIC);
      expect(validated.digitFormat).toBe(DigitFormat.BANGLA); // default
    });

    test('should validate hotkey settings', () => {
      const settings = {
        hotkeyModifiers: ['Meta', 'Shift'],
        hotkeyKey: 'M',
      };
      const validated = ConfigManager.validateSettings(settings);
      expect(validated.hotkeyModifiers).toEqual(['Meta', 'Shift']);
      expect(validated.hotkeyKey).toBe('M');
    });
  });

  describe('exportSettings', () => {
    test('should export settings to JSON string', () => {
      const settings = ConfigManager.getDefaultSettings();
      const json = ConfigManager.exportSettings(settings);
      expect(typeof json).toBe('string');
      expect(JSON.parse(json)).toEqual(settings);
    });

    test('should format JSON with indentation', () => {
      const settings = ConfigManager.getDefaultSettings();
      const json = ConfigManager.exportSettings(settings);
      expect(json).toContain('\n');
      expect(json).toContain('  ');
    });
  });

  describe('importSettings', () => {
    test('should import valid JSON settings', () => {
      const originalSettings: UserSettings = {
        mode: PhoneticMode.BASIC,
        digitFormat: DigitFormat.WESTERN,
        enableHotkey: false,
        hotkeyModifiers: ['Control'],
        hotkeyKey: 'X',
      };
      const json = JSON.stringify(originalSettings);
      const imported = ConfigManager.importSettings(json);
      expect(imported).toEqual(originalSettings);
    });

    test('should throw error for invalid JSON', () => {
      expect(() => {
        ConfigManager.importSettings('invalid json');
      }).toThrow('Invalid settings JSON');
    });

    test('should validate imported settings', () => {
      const json = JSON.stringify({ mode: 'invalid' });
      const imported = ConfigManager.importSettings(json);
      expect(imported.mode).toBe(PhoneticMode.SMART); // default
    });
  });

  describe('mergeSettings', () => {
    test('should merge partial updates with existing settings', () => {
      const existing = ConfigManager.getDefaultSettings();
      const updates = { mode: PhoneticMode.BASIC };
      const merged = ConfigManager.mergeSettings(existing, updates);
      expect(merged.mode).toBe(PhoneticMode.BASIC);
      expect(merged.digitFormat).toBe(existing.digitFormat);
    });

    test('should validate merged settings', () => {
      const existing = ConfigManager.getDefaultSettings();
      const updates = { mode: 'invalid' as PhoneticMode };
      const merged = ConfigManager.mergeSettings(existing, updates);
      expect(merged.mode).toBe(PhoneticMode.SMART); // default
    });

    test('should handle multiple updates', () => {
      const existing = ConfigManager.getDefaultSettings();
      const updates = {
        mode: PhoneticMode.BASIC,
        digitFormat: DigitFormat.WESTERN,
        enableHotkey: false,
      };
      const merged = ConfigManager.mergeSettings(existing, updates);
      expect(merged.mode).toBe(PhoneticMode.BASIC);
      expect(merged.digitFormat).toBe(DigitFormat.WESTERN);
      expect(merged.enableHotkey).toBe(false);
    });
  });

  describe('Round-trip export/import', () => {
    test('should maintain settings through export/import cycle', () => {
      const original = ConfigManager.getDefaultSettings();
      const json = ConfigManager.exportSettings(original);
      const imported = ConfigManager.importSettings(json);
      expect(imported).toEqual(original);
    });
  });
});
