import { Map } from 'immutable';

// Initial State
const INITIAL_STATE = Map();

// Actions
const SET_SELECTED_ANIMATION_INDEX = 'animation-editor/selection/SET_SELECTED_ANIMATION_INDEX';
const SET_SELECTED_FRAME_INDEX = 'animation-editor/selection/SET_SELECTED_FRAME_INDEX';
const SET_SELECTED_COLLIDER_INDEX = 'animation-editor/selection/SET_SELECTED_COLLIDER_INDEX';
const SET_SELECTED_ITEM_ID = 'animation-editor/selection/SET_SELECTED_ITEM_ID';

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_SELECTED_ANIMATION_INDEX:
    console.log('here!!', action.index);
      return state.set('selectedAnimationIndex', action.index);

    case SET_SELECTED_FRAME_INDEX:
      return state.set('selectedFrameIndex', action.index);

    case SET_SELECTED_COLLIDER_INDEX:
      return state.set('selectedColliderIndex', action.index);

    case SET_SELECTED_ITEM_ID:
      return state.set('selectedItemId', action.id);

    default:
      return state;
  }
}

// Action creators
export function setSelectedAnimationIndex(index) {
  return { type: SET_SELECTED_ANIMATION_INDEX, index };
}

export function setSelectedFrameIndex(index) {
  return { type: SET_SELECTED_FRAME_INDEX, index };
}

export function setSelectedColliderIndex(index) {
  return { type: SET_SELECTED_COLLIDER_INDEX, index };
}

export function setSelectedItemId(id) {
  return { type: SET_SELECTED_ITEM_ID, id };
}