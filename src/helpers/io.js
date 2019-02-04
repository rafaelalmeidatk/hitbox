import { Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons'
import { showSuccessMessage, showErrorMessage } from './toaster';

let fs = null;
let dialog = null;
let path = null;

if (window.require) {
  fs = window.require('fs');
  dialog = window.require('electron').remote.dialog;
  path = window.require('path');
}

export function relativePathToFile(from, to) {
  if (!fs || !dialog) {
    console.error("Can't solve relative path on browser");
    return;
  }
  const fromFolder = path.dirname(from);
  return path.relative(fromFolder, to);
}

export function openFile() {
  return new window.Promise((resolve, reject) => {
    if (!fs || !dialog) {
      console.error("Ops, you can't open a file inside the browser");
      return resolve(null);
    }

    dialog.showOpenDialog(
      {
        filters: [{ name: 'Hitbox file (*.json)', extensions: ['json'] }],
      },
      filePaths => {
        if (!filePaths || !filePaths[0]) {
          console.log('No file selected');
          return resolve(null);
        }
        const filePath = filePaths[0];
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            return reject(err);
          }

          try {
            const json = JSON.parse(data);
            resolve({ filePath, json });
          } catch (err) {
            reject(err);
          }
        });
      }
    );
  });
}

export function openImage() {
  return new window.Promise((resolve, reject) => {
    if (!fs || !dialog) {
      console.error("Ops, you can't open a file inside the browser");
      return resolve(null);
    }

    dialog.showOpenDialog(
      {
        filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }],
      },
      filePaths => {
        if (!filePaths || !filePaths[0]) {
          // No file selected
          return resolve(null);
        }
        
        const filePath = filePaths[0];
        const pathInfo = path.parse(filePath);
        fs.readFile(filePath, 'base64', (err, data) => {
          if (err) {
            return reject(err);
          }
          resolve({ data, filePath, pathInfo });
        });
      }
    );
  });
}

export function loadSpritesheetImage(filePath, spritesheetRelativePath) {
  return new window.Promise((resolve, reject) => {
    const filePathDir = path.parse(filePath).dir;
    const spritesheetPath = path.resolve(filePathDir, spritesheetRelativePath);
    fs.readFile(spritesheetPath, 'base64', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

export function showSaveDialog() {
  return new window.Promise(resolve => {
    if (!fs || !dialog) {
      console.error("Ops, you can't save a file inside the browser");
      return resolve(null);
    }

    dialog.showSaveDialog(
      {
        filters: [
          {
            name: '*.json',
            extensions: ['json'],
          },
        ],
      },
      fileName => {
        if (!fileName) {
          console.log("You didn't save the file");
          return resolve(null);
        }

        resolve(fileName);
      }
    );
  });
}

export function saveFile(filePath, data) {
  return new window.Promise((resolve, reject) => {
    if (!fs || !dialog) {
      console.error("Ops, you can't save a file inside the browser");
      return reject(null);
    }

    fs.writeFile(filePath, data, err => {
      if (err) {
        showErrorMessage('An error ocurred saving the file: ' + err.message);
        return reject(err.message);
      }

      showSuccessMessage('The file has been succesfully saved');
      resolve(true);
    });
  });
}
