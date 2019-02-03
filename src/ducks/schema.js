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
    const { spritesheetFileName } = action;
    state = {
      ...INITIAL_STATE,
      spritesheetFileName,
      isDirty: true,
    };
  },

  [HIDE_FRAMES]: state => {
    state.framesVisible = false;
  },
});

// Action creators
export function createNewSchema(spritePath, spritesheetFileName) {
  return { type: CREATE_NEW_SCHEMA, spritePath, spritesheetFileName };
}

export function hideFrames() {
  return { type: HIDE_FRAMES };
}
