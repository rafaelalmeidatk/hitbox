let fs = null;
let dialog = null;

if (window.require) {
  fs = window.require('fs');
  dialog = window.require('electron').remote.dialog;
}

export function saveFile(data) {
  if (!fs || !dialog) {
    console.error('Ops, you can\'t save a file inside the browser');
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
