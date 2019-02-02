import { createReducer } from 'redux-starter-kit';

// Initial State
const INITIAL_STATE = {};

// Actions
const SET_SELECTED_ANIMATION_ID = 'animation-editor/selection/SET_SELECTED_ANIMATION_ID';
const SET_SELECTED_FRAME_ID = 'animation-editor/selection/SET_SELECTED_FRAME_ID';
const SET_SELECTED_COLLIDER_ID = 'animation-editor/selection/SET_SELECTED_COLLIDER_ID';
const SET_SELECTED_ITEM_ID = 'animation-editor/selection/SET_SELECTED_ITEM_ID';

// Reducer
export default createReducer(INITIAL_STATE, {
  [SET_SELECTED_ANIMATION_ID]: (state, action) => {
    state.selectedAnimationId = action.id;
    state.selectedItemId = action.id;
  },

  [SET_SELECTED_FRAME_ID]: (state, action) => {
    state.selectedFrameId = action.id;
    state.selectedItemId = action.id;
  },

  [SET_SELECTED_COLLIDER_ID]: (state, action) => {
    state.selectedColliderId = action.id;
    state.selectedItemId = action.id;
  },

  [SET_SELECTED_ITEM_ID]: (state, action) => {
    state.selectedItemId = action.id;
  },
});

// Action creators
export function setSelectedAnimationId(id) {
  return { type: SET_SELECTED_ANIMATION_ID, id };
}

export function setSelectedFrameId(id) {
  return { type: SET_SELECTED_FRAME_ID, id };
}

export function setSelectedColliderId(id) {
  return { type: SET_SELECTED_COLLIDER_ID, id };
}

export function setSelectedItemId(id) {
  return { type: SET_SELECTED_ITEM_ID, id };
}
