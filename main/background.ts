import { app } from 'electron';
import serve from 'electron-serve';
import { BrowserWindow } from 'electron/main';
import { createWindow } from './helpers';
import { autoUpdate } from 'electron-auto-update';
const isProd: boolean = process.env.NODE_ENV === 'production';

autoUpdate({ checkFrequency: 30000 })
if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

let mainWindow: BrowserWindow;
 
(async () => {
  await app.whenReady();

  mainWindow = createWindow('main', {
    width: 1000,
    height: 650,
    webPreferences: {
      enableRemoteModule: false,
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');

  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    // mainWindow.webContents.openDevTools();
  }
})();

import './app'

app.on('window-all-closed', () => {
  app.quit();
});
