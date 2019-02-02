import { APP_VERSION } from '../helpers/constants';
import { saveFile as ioSaveFile } from '../helpers/io';

// Actions
const SAVE_FILE = 'animation-editor/io/SAVE_FILE';

// Helper functions
const mapIdsToObjects = (ids, allObjects) =>
  ids.map(id => {
    const data = allObjects.find(o => o.id === id);
    return { ...data };
  });

const createJsonContent = objects => {
  const { animations, frames, colliders } = objects;
  return {
    hitboxVersion: APP_VERSION,
    animations: animations.map(animation => {
      return {
        ...animation,
        frames: mapIdsToObjects(animation.frames, frames).map(frame => ({
          ...frame,
          colliders: mapIdsToObjects(frame.colliders, colliders),
        })),
      };
    }),
  };
};

// Middleware
export default store => next => action => {
  if (action.type !== SAVE_FILE) return next(action);
  const state = store.getState();
  const { objects } = state;
  const content = createJsonContent(objects);
  const fileData = JSON.stringify(content);
  ioSaveFile(fileData);
};

// Action creators
export function saveFile() {
  return { type: SAVE_FILE };
}
