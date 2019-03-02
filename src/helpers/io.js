import { showSuccessMessage, showErrorMessage } from './toaster';

export function saveFile(filePath, data) {
  return window
    .saveFile(filePath, data)
    .then(() => showSuccessMessage('The file has been succesfully saved'))
    .catch(err =>
      showErrorMessage('An error ocurred saving the file: ' + err.message)
    );
}
