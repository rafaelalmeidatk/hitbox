import { APP_VERSION } from '../helpers/constants';
import {
  showSaveDialog,
  relativePathToFile,
  saveFile as ioSaveFile,
} from '../helpers/io';

// Actions
const SAVE_FILE = 'animation-editor/io/SAVE_FILE';

// Helper functions
const mapIdsToObjects = (ids, allObjects) =>
  ids.map(id => {
    const data = allObjects.find(o => o.id === id);
    return { ...data };
  });

const createAnimationsJsonContent = objects => {
  const { animations, frames, colliders } = objects;

  // Basically what we are doing here is just replacing the IDs
  // with the actual objects
  return animations.map(animation => {
    return {
      ...animation,
      frames: mapIdsToObjects(animation.frames, frames).map(frame => ({
        ...frame,
        colliders: mapIdsToObjects(frame.colliders, colliders),
      })),
    };
  });
};

const createJsonContent = (schema, objects, savePath) => {
  const { spritesheetPath, spritesheetFileName } = schema;
  const spritesheetRelativePath = relativePathToFile(savePath, spritesheetPath);

  return {
    // It is better to save the relative path so the user can move
    // the folders from diferent locations and it will still work if the
    // directory structure is the same
    spritesheetPath: spritesheetRelativePath,
    spritesheetName: spritesheetFileName,
    animations: createAnimationsJsonContent(objects),
    hitboxVersion: APP_VERSION,
  };
};

// Middleware
export default store => next => action => {
  if (action.type !== SAVE_FILE) return next(action);

  // Get save path
  showSaveDialog().then(path => {
    if (!path) return;

    const state = store.getState();
    const { objects, schema } = state;
    console.log('schema', schema);
    const content = createJsonContent(schema, objects, path);
    const fileData = JSON.stringify(content);
    ioSaveFile(path, fileData);
  });
};

// Action creators
export function saveFile() {
  return { type: SAVE_FILE };
}
