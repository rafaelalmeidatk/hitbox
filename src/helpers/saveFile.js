export function parseSaveFile(json) {
  if (!json.hitboxVersion) {
    throw new Error('Invalid file');
  }

  return json;
}