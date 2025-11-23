import { contextBridge, ipcRenderer } from 'electron';
import { UserSettings } from '@onusshar/core';

/**
 * Preload script to expose safe IPC methods to renderer
 */

contextBridge.exposeInMainWorld('electronAPI', {
  // Settings
  getSettings: () => ipcRenderer.invoke('get-settings'),
  updateSettings: (settings: Partial<UserSettings>) =>
    ipcRenderer.invoke('update-settings', settings),
  exportSettings: () => ipcRenderer.invoke('export-settings'),
  importSettings: (json: string) => ipcRenderer.invoke('import-settings', json),

  // Mode
  getCurrentMode: () => ipcRenderer.invoke('get-current-mode'),
  switchMode: (mode: 'english' | 'bangla') => ipcRenderer.invoke('switch-mode', mode),

  // Events
  onModeChanged: (callback: (mode: 'english' | 'bangla') => void) => {
    ipcRenderer.on('mode-changed', (_event, mode) => callback(mode));
  },
  onNavigateToSettings: (callback: () => void) => {
    ipcRenderer.on('navigate-to-settings', callback);
  },
  onNavigateToAbout: (callback: () => void) => {
    ipcRenderer.on('navigate-to-about', callback);
  },
});

// TypeScript declaration for window.electronAPI
declare global {
  interface Window {
    electronAPI: {
      getSettings: () => Promise<UserSettings>;
      updateSettings: (settings: Partial<UserSettings>) => Promise<UserSettings>;
      exportSettings: () => Promise<string>;
      importSettings: (json: string) => Promise<{ success: boolean; error?: string }>;
      getCurrentMode: () => Promise<'english' | 'bangla'>;
      switchMode: (mode: 'english' | 'bangla') => Promise<'english' | 'bangla'>;
      onModeChanged: (callback: (mode: 'english' | 'bangla') => void) => void;
      onNavigateToSettings: (callback: () => void) => void;
      onNavigateToAbout: (callback: () => void) => void;
    };
  }
}
