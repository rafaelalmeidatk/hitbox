const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Add custom extensions to DevTools
    // obs: __dirname = public folder
    BrowserWindow.addDevToolsExtension(
      path.resolve(__dirname, '../electron-extensions/react-devtools/3.6.0_0')
    );
    BrowserWindow.addDevToolsExtension(
      path.resolve(__dirname, '../electron-extensions/redux-devtools/2.17.0_0')
    );
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
