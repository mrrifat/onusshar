import { Transliterator, PhoneticMode, DigitFormat, UserSettings } from '@onusshar/core';
import './styles.css';

// Initialize transliterator
let transliterator = new Transliterator();

// DOM elements
const inputBox = document.getElementById('input-box') as HTMLTextAreaElement;
const outputBox = document.getElementById('output-box') as HTMLDivElement;
const copyBtn = document.getElementById('copy-btn') as HTMLButtonElement;
const clearBtn = document.getElementById('clear-btn') as HTMLButtonElement;
const currentModeDisplay = document.getElementById('current-mode') as HTMLSpanElement;
const toggleModeBtn = document.getElementById('toggle-mode-btn') as HTMLButtonElement;

// Settings elements
const phoneticModeSelect = document.getElementById('phonetic-mode') as HTMLSelectElement;
const digitFormatSelect = document.getElementById('digit-format') as HTMLSelectElement;
const enableHotkeyCheckbox = document.getElementById('enable-hotkey') as HTMLInputElement;
const hotkeyDisplay = document.getElementById('hotkey-display') as HTMLInputElement;
const saveSettingsBtn = document.getElementById('save-settings-btn') as HTMLButtonElement;
const exportBtn = document.getElementById('export-btn') as HTMLButtonElement;
const importBtn = document.getElementById('import-btn') as HTMLButtonElement;

// Tab buttons
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

/**
 * Initialize the application
 */
async function init() {
  // Load settings
  await loadSettings();

  // Set up event listeners
  setupEventListeners();

  // Update mode display
  updateModeDisplay();
}

/**
 * Load settings from main process
 */
async function loadSettings() {
  const settings = await window.electronAPI.getSettings();
  applySettings(settings);
  updateSettingsUI(settings);
}

/**
 * Apply settings to transliterator
 */
function applySettings(settings: UserSettings) {
  transliterator.updateConfig({
    mode: settings.mode,
    digitFormat: settings.digitFormat,
  });
}

/**
 * Update settings UI
 */
function updateSettingsUI(settings: UserSettings) {
  phoneticModeSelect.value = settings.mode;
  digitFormatSelect.value = settings.digitFormat;
  enableHotkeyCheckbox.checked = settings.enableHotkey;
  hotkeyDisplay.value = `${settings.hotkeyModifiers.join('+')}+${settings.hotkeyKey}`;
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
  // Typing box
  inputBox.addEventListener('input', handleInput);

  // Buttons
  copyBtn.addEventListener('click', copyToClipboard);
  clearBtn.addEventListener('click', clearBoxes);
  toggleModeBtn.addEventListener('click', toggleMode);

  // Settings
  saveSettingsBtn.addEventListener('click', saveSettings);
  exportBtn.addEventListener('click', exportSettings);
  importBtn.addEventListener('click', importSettings);

  // Tabs
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      if (tabName) switchTab(tabName);
    });
  });

  // Listen for mode changes from main process
  window.electronAPI.onModeChanged((mode) => {
    updateModeDisplay(mode);
  });

  window.electronAPI.onNavigateToSettings(() => {
    switchTab('settings');
  });

  window.electronAPI.onNavigateToAbout(() => {
    switchTab('about');
  });
}

/**
 * Handle input and convert to Bengali
 */
function handleInput() {
  const input = inputBox.value;
  const result = transliterator.convert(input);
  outputBox.textContent = result.text;
}

/**
 * Copy output to clipboard
 */
async function copyToClipboard() {
  const text = outputBox.textContent || '';
  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = 'Copy to Clipboard';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}

/**
 * Clear input and output boxes
 */
function clearBoxes() {
  inputBox.value = '';
  outputBox.textContent = '';
}

/**
 * Toggle typing mode
 */
async function toggleMode() {
  const currentMode = await window.electronAPI.getCurrentMode();
  const newMode = currentMode === 'bangla' ? 'english' : 'bangla';
  await window.electronAPI.switchMode(newMode);
  updateModeDisplay(newMode);
}

/**
 * Update mode display
 */
async function updateModeDisplay(mode?: 'english' | 'bangla') {
  if (!mode) {
    mode = await window.electronAPI.getCurrentMode();
  }

  if (mode === 'bangla') {
    currentModeDisplay.textContent = 'বাংলা (Bangla)';
    currentModeDisplay.className = 'mode-bangla';
    inputBox.disabled = false;
  } else {
    currentModeDisplay.textContent = 'English';
    currentModeDisplay.className = 'mode-english';
    inputBox.disabled = true;
  }
}

/**
 * Save settings
 */
async function saveSettings() {
  const settings: Partial<UserSettings> = {
    mode: phoneticModeSelect.value as PhoneticMode,
    digitFormat: digitFormatSelect.value as DigitFormat,
    enableHotkey: enableHotkeyCheckbox.checked,
  };

  const updated = await window.electronAPI.updateSettings(settings);
  applySettings(updated);

  saveSettingsBtn.textContent = 'Saved!';
  setTimeout(() => {
    saveSettingsBtn.textContent = 'Save Settings';
  }, 2000);
}

/**
 * Export settings to JSON file
 */
async function exportSettings() {
  const json = await window.electronAPI.exportSettings();

  // Create download link
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'onusshar-settings.json';
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Import settings from JSON file
 */
function importSettings() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const text = await file.text();
    const result = await window.electronAPI.importSettings(text);

    if (result.success) {
      await loadSettings();
      alert('Settings imported successfully!');
    } else {
      alert(`Failed to import settings: ${result.error}`);
    }
  };
  input.click();
}

/**
 * Switch tab
 */
function switchTab(tabName: string) {
  tabButtons.forEach((btn) => {
    if (btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  tabContents.forEach((content) => {
    if (content.id === `${tabName}-tab`) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
}

// Initialize on load
init();
