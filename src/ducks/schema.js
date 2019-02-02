import { createReducer } from 'redux-starter-kit';

// Initial State
const INITIAL_STATE = {
  filename: null,
  spriteFileName: null,
  isDirty: false,
};

// Actions
const CREATE_NEW_SCHEMA = 'animation-editor/schema/CREATE_NEW_SCHEMA';
const HIDE_FRAMES = 'animation-editor/ui/HIDE_FRAMES';

// Reducer
export default createReducer(INITIAL_STATE, {
  [CREATE_NEW_SCHEMA]: (state, action) => {
    const { spriteFileName } = action;
    state = {
      ...INITIAL_STATE,
      spriteFileName,
      isDirty: true,
    };
  },

  [HIDE_FRAMES]: state => {
    state.framesVisible = false;
  },
});

// Action creators
export function createNewSchema(spriteFileName) {
  return { type: CREATE_NEW_SCHEMA, spriteFileName };
}

export function hideFrames() {
  return { type: HIDE_FRAMES };
}
