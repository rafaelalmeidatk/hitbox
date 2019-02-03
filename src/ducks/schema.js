import { createReducer } from 'redux-starter-kit';

// Initial State
const INITIAL_STATE = {
  filename: null,
  spritesheetPath: null,
  spritesheetFileName: null,
  isDirty: false,
};

// Actions
const CREATE_NEW_SCHEMA = 'animation-editor/schema/CREATE_NEW_SCHEMA';
const HIDE_FRAMES = 'animation-editor/ui/HIDE_FRAMES';

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

  [HIDE_FRAMES]: state => {
    state.framesVisible = false;
  },
});

// Action creators
export function createNewSchema(spritesheetPath, spritesheetFileName) {
  return { type: CREATE_NEW_SCHEMA, spritesheetPath, spritesheetFileName };
}

export function hideFrames() {
  return { type: HIDE_FRAMES };
}
