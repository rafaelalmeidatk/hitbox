import { APP_VERSION } from '../helpers/constants';
import {
  showSaveDialog,
  relativePathToFile,
  saveFile as ioSaveFile,
} from '../helpers/io';
import { formatObjectToSave } from '../helpers/saveFile';

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
  // with the actual objects and formating the objects to remove
  // any non necessary data on the save file
  return animations.map(animation => {
    return {
      ...formatObjectToSave(animation),
      frames: mapIdsToObjects(animation.frames, frames).map(frame => ({
        ...formatObjectToSave(frame),
        colliders: mapIdsToObjects(frame.colliders, colliders).map(collider =>
          formatObjectToSave(collider)
        ),
      })),
    };
  });
};

const createJsonContent = (schema, objects, savePath) => {
  const { spritesheetPath, spritesheetFileName } = schema;
  const spritesheetRelativePath =
    schema.spritesheetRelativePath ||
    relativePathToFile(savePath, spritesheetPath);

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
export default store => next => async action => {
  if (action.type !== SAVE_FILE) return next(action);

  const { isSaveAs } = action;
  const state = store.getState();
  const { objects, schema } = state;

  // Get save path
  const savePath =
    isSaveAs || !schema.filePath ? await showSaveDialog() : schema.filePath;
  if (!savePath) return;

  // Generate content
  const content = createJsonContent(schema, objects, savePath);
  const fileData = JSON.stringify(content);

  // Save the file
  ioSaveFile(savePath, fileData);
};

// Action creators
export function saveFile({ isSaveAs }) {
  return { type: SAVE_FILE, isSaveAs };
}
