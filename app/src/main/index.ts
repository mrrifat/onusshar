import { app, BrowserWindow, Tray, Menu, globalShortcut, ipcMain, nativeImage } from 'electron';
import * as path from 'path';
import Store from 'electron-store';
import { UserSettings, PhoneticMode, DigitFormat } from '@onusshar/core';

// Initialize electron-store for persistent settings
const store = new Store<UserSettings>({
  defaults: {
    mode: PhoneticMode.SMART,
    digitFormat: DigitFormat.BANGLA,
    enableHotkey: true,
    hotkeyModifiers: ['Control', 'Alt'],
    hotkeyKey: 'B',
  },
});

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let currentMode: 'english' | 'bangla' = 'bangla';

/**
 * Create the main application window
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    minWidth: 400,
    minHeight: 300,
    frame: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    show: false,
    title: 'Onusshar - Bengali Phonetic Keyboard',
  });

  // Load the renderer
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();
  });

  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow?.hide();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

/**
 * Create system tray icon and menu
 */
function createTray() {
  // Create a simple icon (in production, use actual icon files)
  const icon = nativeImage.createEmpty();
  tray = new Tray(icon);

  updateTrayMenu();

  tray.setToolTip('Onusshar - Bengali Keyboard');
  tray.on('click', () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
      }
    } else {
      createWindow();
    }
  });
}

/**
 * Update tray menu based on current mode
 */
function updateTrayMenu() {
  if (!tray) return;

  const contextMenu = Menu.buildFromTemplate([
    {
      label: `Mode: ${currentMode === 'bangla' ? 'বাংলা (Bangla)' : 'English'}`,
      type: 'normal',
      enabled: false,
    },
    { type: 'separator' },
    {
      label: 'Switch to Bangla',
      type: 'radio',
      checked: currentMode === 'bangla',
      click: () => switchMode('bangla'),
    },
    {
      label: 'Switch to English',
      type: 'radio',
      checked: currentMode === 'english',
      click: () => switchMode('english'),
    },
    { type: 'separator' },
    {
      label: 'Open Typing Window',
      click: () => {
        if (!mainWindow) createWindow();
        mainWindow?.show();
      },
    },
    {
      label: 'Settings',
      click: () => {
        if (!mainWindow) createWindow();
        mainWindow?.show();
        mainWindow?.webContents.send('navigate-to-settings');
      },
    },
    { type: 'separator' },
    {
      label: 'About Onusshar',
      click: () => {
        if (!mainWindow) createWindow();
        mainWindow?.show();
        mainWindow?.webContents.send('navigate-to-about');
      },
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
}

/**
 * Switch typing mode
 */
function switchMode(mode: 'english' | 'bangla') {
  currentMode = mode;
  updateTrayMenu();

  // Notify renderer
  if (mainWindow) {
    mainWindow.webContents.send('mode-changed', mode);
  }
}

/**
 * Register global hotkey
 */
function registerHotkey() {
  const settings = store.get('enableHotkey');
  if (!settings) return;

  const modifiers = store.get('hotkeyModifiers', ['Control', 'Alt']);
  const key = store.get('hotkeyKey', 'B');

  // Construct accelerator string (e.g., "Control+Alt+B")
  const accelerator = [...modifiers, key].join('+');

  const success = globalShortcut.register(accelerator, () => {
    const newMode = currentMode === 'bangla' ? 'english' : 'bangla';
    switchMode(newMode);
  });

  if (success) {
    console.log(`Hotkey registered: ${accelerator}`);
  } else {
    console.error(`Failed to register hotkey: ${accelerator}`);
  }
}

/**
 * Unregister all global shortcuts
 */
function unregisterHotkeys() {
  globalShortcut.unregisterAll();
}

// App lifecycle
app.on('ready', () => {
  createWindow();
  createTray();
  registerHotkey();
});

app.on('window-all-closed', () => {
  // Don't quit on window close (we have tray)
  // Only quit when explicitly requested
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  } else {
    mainWindow.show();
  }
});

app.on('will-quit', () => {
  unregisterHotkeys();
});

// IPC handlers
ipcMain.handle('get-settings', () => {
  return store.store;
});

ipcMain.handle('update-settings', (_event, settings: Partial<UserSettings>) => {
  // Merge with existing settings
  const currentSettings = store.store;
  const newSettings = { ...currentSettings, ...settings };

  // Save to store
  store.set(newSettings);

  // Re-register hotkey if changed
  if (settings.enableHotkey !== undefined || settings.hotkeyModifiers || settings.hotkeyKey) {
    unregisterHotkeys();
    registerHotkey();
  }

  return newSettings;
});

ipcMain.handle('get-current-mode', () => {
  return currentMode;
});

ipcMain.handle('switch-mode', (_event, mode: 'english' | 'bangla') => {
  switchMode(mode);
  return currentMode;
});

ipcMain.handle('export-settings', () => {
  return JSON.stringify(store.store, null, 2);
});

ipcMain.handle('import-settings', (_event, json: string) => {
  try {
    const settings = JSON.parse(json);
    store.set(settings);
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
});
