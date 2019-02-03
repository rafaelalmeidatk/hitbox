import { createReducer } from 'redux-starter-kit';

// Initial State
const INITIAL_STATE = {
  filename: null,
  spritesheetPath: null,
  spritesheetRelativePath: null,
  spritesheetFileName: null,
  isDirty: false,
};

// Actions
const CREATE_NEW_SCHEMA = 'animation-editor/schema/CREATE_NEW_SCHEMA';
const LOAD_SCHEMA = 'animation-editor/schema/LOAD_SCHEMA';

// Reducer
export default createReducer(INITIAL_STATE, {
  [CREATE_NEW_SCHEMA]: (state, action) => {
    const { spritesheetPath, spritesheetFileName } = action;
    return {
      ...INITIAL_STATE,
      spritesheetPath,
      spritesheetFileName,
      isDirty: true,
    };
  },

  [LOAD_SCHEMA]: (state, action) => {
    const { filePath, spritesheetRelativePath, spritesheetFileName } = action;
    return {
      ...INITIAL_STATE,
      filePath,
      spritesheetRelativePath,
      spritesheetFileName,
    };
  },
});

// Action creators
export function createNewSchema(spritesheetPath, spritesheetFileName) {
  return { type: CREATE_NEW_SCHEMA, spritesheetPath, spritesheetFileName };
}

export function loadSchema(
  filePath,
  spritesheetRelativePath,
  spritesheetFileName
) {
  return {
    type: LOAD_SCHEMA,
    filePath,
    spritesheetRelativePath,
    spritesheetFileName,
  };
}
