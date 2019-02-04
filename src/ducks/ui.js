import { createReducer } from 'redux-starter-kit';

// Initial State
const INITIAL_STATE = {
  framesVisible: true,
  collidersVisible: true,
  objectsHideList: {}, // { id: isHidden }
};

// Actions
const SHOW_FRAMES = 'animation-editor/ui/SHOW_FRAMES';
const HIDE_FRAMES = 'animation-editor/ui/HIDE_FRAMES';

const SHOW_COLLIDERS = 'animation-editor/ui/SHOW_COLLIDERS';
const HIDE_COLLIDERS = 'animation-editor/ui/HIDE_COLLIDERS';

const TOGGLE_OBJECT_VISIBILITY = 'animation-editor/ui/TOGGLE_OBJECT_VISIBILITY';

// Reducer
export default createReducer(INITIAL_STATE, {
  [SHOW_FRAMES]: state => {
    state.framesVisible = true;
  },

  [HIDE_FRAMES]: state => {
    state.framesVisible = false;
  },

  [SHOW_COLLIDERS]: state => {
    state.collidersVisible = true;
  },

  [HIDE_COLLIDERS]: state => {
    state.collidersVisible = false;
  },

  [TOGGLE_OBJECT_VISIBILITY]: (state, action) => {
    const { id } = action;
    state.objectsHideList[id] = !state.objectsHideList[id];
  },
});

// Action creators
export function showFrames() {
  return { type: SHOW_FRAMES };
}

export function hideFrames() {
  return { type: HIDE_FRAMES };
}

export function showColliders() {
  return { type: SHOW_COLLIDERS };
}

export function hideColliders() {
  return { type: HIDE_COLLIDERS };
}

export function toggleObjectVisibility(id) {
  return { type: TOGGLE_OBJECT_VISIBILITY, id };
}
