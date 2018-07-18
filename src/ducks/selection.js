import { Map } from 'immutable';

// Initial State
const INITIAL_STATE = Map();

// Actions
const SET_SELECTED_ANIMATION_ID = 'animation-editor/selection/SET_SELECTED_ANIMATION_ID';
const SET_SELECTED_FRAME_ID = 'animation-editor/selection/SET_SELECTED_FRAME_ID';
const SET_SELECTED_COLLIDER_ID = 'animation-editor/selection/SET_SELECTED_COLLIDER_ID';
const SET_SELECTED_ITEM_ID = 'animation-editor/selection/SET_SELECTED_ITEM_ID';

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_SELECTED_ANIMATION_ID:
      return state.set('selectedAnimationId', action.id);

    case SET_SELECTED_FRAME_ID:
      return state.set('selectedFrameId', action.id);

    case SET_SELECTED_COLLIDER_ID:
      return state.set('selectedColliderId', action.id);

    case SET_SELECTED_ITEM_ID:
      return state.set('selectedItemId', action.id);

    default:
      return state;
  }
}

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
