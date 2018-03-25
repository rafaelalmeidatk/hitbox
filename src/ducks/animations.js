import {
  createAnimationsList as c_createAnimationsList,
  newAnimation as c_newAnimation,
  setAnimationName as c_setAnimationName,
  setAnimationDelay as c_setAnimationDelay,
  setAnimationRepeat as c_setAnimationRepeat,
} from '../core';

// Actions
const CREATE_ANIMATION_LIST = 'animation-editor/animations/CREATE_ANIMATION_LIST';
const NEW_ANIMATION = 'animation-editor/animations/NEW_ANIMATION';
const SET_ANIMATION_NAME = 'animation-editor/animations/SET_ANIMATION_NAME';
const SET_ANIMATION_DELAY = 'animation-editor/animations/SET_ANIMATION_DELAY';
const SET_ANIMATION_REPEAT = 'animation-editor/animations/SET_ANIMATION_REPEAT';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case CREATE_ANIMATION_LIST:
      return c_createAnimationsList(state);

    case NEW_ANIMATION:
      return c_newAnimation(state);

    case SET_ANIMATION_NAME:
      return c_setAnimationName(state, action.animationIndex, action.name);

    case SET_ANIMATION_DELAY:
      return c_setAnimationDelay(state, action.animationIndex, action.delay);

    case SET_ANIMATION_REPEAT:
      return c_setAnimationRepeat(state, action.animationIndex, action.repeat);

    default:
      return state;
  }
}

// Action creators
export function createAnimationList() {
  return { type: CREATE_ANIMATION_LIST };
}

export function newAnimation() {
  return { type: NEW_ANIMATION };
}

export function setAnimationName(animationIndex, name) {
  return { type: SET_ANIMATION_NAME, animationIndex, name };
}

export function setAnimationDelay(animationIndex, delay) {
  return { type: SET_ANIMATION_DELAY, animationIndex, delay };
}

export function setAnimationRepeat(animationIndex, repeat) {
  return { type: SET_ANIMATION_REPEAT, animationIndex, repeat };
}