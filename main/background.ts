import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { BrowserWindow } from 'electron/main';
import { createWindow } from './helpers';
const isProd: boolean = process.env.NODE_ENV === 'production';
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
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    // mainWindow.webContents.openDevTools();
  }
})();

interface Messages {
  id: string,
  user?: string,
  message?: string

}


app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('set-message', (event, arg: Messages) => {


})


ipcMain.on('get-message', (event) => {

})