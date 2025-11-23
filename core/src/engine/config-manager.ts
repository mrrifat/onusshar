import { UserSettings, PhoneticMode, DigitFormat } from '../types';

/**
 * Manages user settings persistence and validation
 */
export class ConfigManager {
  private static readonly DEFAULT_SETTINGS: UserSettings = {
    mode: PhoneticMode.SMART,
    digitFormat: DigitFormat.BANGLA,
    enableHotkey: true,
    hotkeyModifiers: ['Control', 'Alt'],
    hotkeyKey: 'B',
  };

  /**
   * Get default settings
   */
  static getDefaultSettings(): UserSettings {
    return { ...this.DEFAULT_SETTINGS };
  }

  /**
   * Validate and sanitize user settings
   */
  static validateSettings(settings: Partial<UserSettings>): UserSettings {
    const validated: UserSettings = { ...this.DEFAULT_SETTINGS };

    if (settings.mode && Object.values(PhoneticMode).includes(settings.mode)) {
      validated.mode = settings.mode;
    }

    if (settings.digitFormat && Object.values(DigitFormat).includes(settings.digitFormat)) {
      validated.digitFormat = settings.digitFormat;
    }

    if (typeof settings.enableHotkey === 'boolean') {
      validated.enableHotkey = settings.enableHotkey;
    }

    if (Array.isArray(settings.hotkeyModifiers) && settings.hotkeyModifiers.length > 0) {
      validated.hotkeyModifiers = settings.hotkeyModifiers;
    }

    if (typeof settings.hotkeyKey === 'string' && settings.hotkeyKey.length > 0) {
      validated.hotkeyKey = settings.hotkeyKey;
    }

    return validated;
  }

  /**
   * Export settings to JSON string
   */
  static exportSettings(settings: UserSettings): string {
    return JSON.stringify(settings, null, 2);
  }

  /**
   * Import settings from JSON string
   */
  static importSettings(json: string): UserSettings {
    try {
      const parsed = JSON.parse(json);
      return this.validateSettings(parsed);
    } catch (error) {
      throw new Error(`Invalid settings JSON: ${error}`);
    }
  }

  /**
   * Merge partial settings with existing settings
   */
  static mergeSettings(
    existing: UserSettings,
    updates: Partial<UserSettings>
  ): UserSettings {
    return this.validateSettings({ ...existing, ...updates });
  }
}
