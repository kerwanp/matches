import { app, BrowserWindow, screen, ipcMain, Menu, Tray } from 'electron';
import * as path from 'path';
import * as url from 'url';
import {Bridger} from './electron/bridger';
import {CSGO} from './electron/Inputs/CSGO/cs-go';
import * as Express from 'express';
import * as bodyParser from 'body-parser';
import {HueApi} from './electron/utils/hue-api';
import {DatabaseManager} from './electron/utils/database-manager';

let hueApi: HueApi;
export function getHueApi(): HueApi {
  if (!hueApi) {
    hueApi = new HueApi();
    return hueApi;
  }
  return hueApi;
}

let databaseManager: DatabaseManager;
export function getDatabaseManager(): DatabaseManager {
  if (!databaseManager) {
    databaseManager = new DatabaseManager();
    return databaseManager;
  }
  return databaseManager;
}

getDatabaseManager();


export const webServer = Express();
webServer.use(bodyParser.json());
const webServerInstance = webServer.listen(8765, () => {
  console.log('Web server listening on port 8765');
});

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

let tray = null;

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  const winWidth = 1500;
  const winHeight = 800;
  win = new BrowserWindow({
    x: size.width / 2 - (winWidth / 2),
    y: size.height / 2 - (winHeight / 2),
    width: winWidth,
    height: winHeight,
    webPreferences: {
      nodeIntegration: true,
    },
    frame: false,
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (serve) {
    // win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}

function createTrail() {
  tray = new Tray('assets/logo.png');
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Exit', type: 'normal', click: () => quitApp()}
  ]);
  tray.setToolTip('Matches');
  tray.setContextMenu(contextMenu);
  tray.on('double-click', () => {
    if (!win) {
      createWindow();
    } else {
      win.focus();
    }
  });
}

function quitApp() {
  app.quit();
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    createWindow();
    createTrail();
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

ipcMain.on('searchBridges', (event) => {
  const bridger = new Bridger();
  return bridger.scanDevices(event);
});

ipcMain.on('waitButton', (event) => {
  const bridger = new Bridger();
  return bridger.waitForButton(event);
});

ipcMain.on('loadScenario', (event) => {
  const scenarios = [];
  scenarios.push(new CSGO());
});
