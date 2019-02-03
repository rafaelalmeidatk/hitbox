let fs = null;
let dialog = null;
let path = null;

if (window.require) {
  fs = window.require('fs');
  dialog = window.require('electron').remote.dialog;
  path = window.require('path');
}

export function openImage() {
  return new window.Promise(resolve => {
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
          console.log('No file selected');
          return resolve(null);
        }
        const filePath = filePaths[0];
        const pathInfo = path.parse(filePath);

        fs.readFile(filePath, 'base64', (err, data) => {
          resolve({ data, filePath, pathInfo });
        });
      }
    );
  });
}

export function saveFile(data) {
  if (!fs || !dialog) {
    console.error("Ops, you can't save a file inside the browser");
    return;
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
        return;
      }

      fs.writeFile(fileName, data, err => {
        if (err) {
          alert('An error ocurred creating the file ' + err.message);
          return;
        }

        alert('The file has been succesfully saved');
        console.log('saved!');
      });
    }
  );
}
