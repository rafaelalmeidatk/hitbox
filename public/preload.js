const fs = require('fs');
const remote = require('electron').remote;
const dialog = remote.dialog;
const path = require('path');

window.relativePathToFile = function(from, to) {
  if (!fs || !dialog) {
    console.error("Can't solve relative path on browser");
    return;
  }
  const fromFolder = path.dirname(from);
  return path.relative(fromFolder, to);
};

window.openFile = function() {
  return new window.Promise((resolve, reject) => {
    if (!fs || !dialog) {
      console.error("Ops, you can't open a file inside the browser");
      return resolve(null);
    }

    dialog.showOpenDialog(
      remote.getCurrentWindow(),
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
};

window.openImage = function() {
  return new window.Promise((resolve, reject) => {
    if (!fs || !dialog) {
      console.error("Ops, you can't open a file inside the browser");
      return resolve(null);
    }

    dialog.showOpenDialog(
      remote.getCurrentWindow(),
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
};

window.loadSpritesheetImage = function(filePath, spritesheetRelativePath) {
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
};

window.showSaveDialog = function() {
  return new window.Promise(resolve => {
    if (!fs || !dialog) {
      console.error("Ops, you can't save a file inside the browser");
      return resolve(null);
    }

    dialog.showSaveDialog(
      remote.getCurrentWindow(),
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
};

window.saveFile = function(filePath, data) {
  return new window.Promise((resolve, reject) => {
    fs.writeFile(filePath, data, err => {
      if (err) {
        return reject(err);
      }

      resolve(true);
    });
  });
};
