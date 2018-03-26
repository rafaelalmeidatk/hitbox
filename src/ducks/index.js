import {
  INITIAL_STATE,
  
  setFilename as c_setFilename,

  createAnimationsList as c_createAnimationsList,
  newAnimation as c_newAnimation,
  setAnimationName as c_setAnimationName,
  setAnimationDelay as c_setAnimationDelay,
  setAnimationRepeat as c_setAnimationRepeat,

  newCollider as c_newCollider,
  setColliderName as c_setColliderName,
  setColliderType as c_setColliderType,
  setColliderRect as c_setColliderRect,

  newFrame as c_newFrame,
  setFrameSourceRect as c_setFrameSourceRect,
  setFrameOffset as c_setFrameOffset,
} from '../core';

// Actions
const SET_FILENAME = 'animation-editor/animations/SET_FILENAME';

const CREATE_ANIMATION_LIST = 'animation-editor/animations/CREATE_ANIMATION_LIST';
const NEW_ANIMATION = 'animation-editor/animations/NEW_ANIMATION';
const SET_ANIMATION_NAME = 'animation-editor/animations/SET_ANIMATION_NAME';
const SET_ANIMATION_DELAY = 'animation-editor/animations/SET_ANIMATION_DELAY';
const SET_ANIMATION_REPEAT = 'animation-editor/animations/SET_ANIMATION_REPEAT';

const NEW_COLLIDER = 'animation-editor/animations/NEW_COLLIDER';
const SET_COLLIDER_NAME = 'animation-editor/animations/SET_COLLIDER_NAME';
const SET_COLLIDER_TYPE = 'animation-editor/animations/SET_COLLIDER_TYPE';
const SET_COLLIDER_RECT = 'animation-editor/animations/SET_COLLIDER_RECT';

const NEW_FRAME = 'animation-editor/animations/NEW_FRAME';
const SET_FRAME_SOURCERECT = 'animation-editor/animations/SET_FRAME_SOURCERECT';
const SET_FRAME_OFFSET = 'animation-editor/animations/SET_FRAME_OFFSET';

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_FILENAME:
      return c_setFilename(state, action.filename);

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

    case NEW_COLLIDER:
      return c_newCollider(state, action.animationIndex, action.frameIndex);

    case SET_COLLIDER_NAME:
      return c_setColliderName(state, action.animationIndex, action.frameIndex, action.colliderIndex, action.name);

    case SET_COLLIDER_TYPE:
      return c_setColliderType(state, action.animationIndex, action.frameIndex, action.colliderIndex, action.colliderType);

    case SET_COLLIDER_RECT:
      return c_setColliderRect(state, action.animationIndex, action.frameIndex, action.colliderIndex, action.rect);
    
    case NEW_FRAME:
      return c_newFrame(state, action.animationIndex);

    case SET_FRAME_SOURCERECT:
      return c_setFrameSourceRect(state, action.animationIndex, action.frameIndex, action.sourceRect);

    case SET_FRAME_OFFSET:
      return c_setFrameOffset(state, action.animationIndex, action.frameIndex, action.offset);

    default:
      return state;
  }
}

// Action creators
export function setFilename(filename) {
  return { type: SET_FILENAME, filename };
}

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

export function newCollider(animationIndex, frameIndex) {
  return { type: NEW_COLLIDER, animationIndex, frameIndex };
}

export function setColliderName(animationIndex, frameIndex, colliderIndex, name) {
  return { type: SET_COLLIDER_NAME, animationIndex, frameIndex, colliderIndex, name };
}

export function setColliderType(animationIndex, frameIndex, colliderIndex, type) {
  return { type: SET_COLLIDER_TYPE, animationIndex, frameIndex, colliderIndex, colliderType: type };
}

export function setColliderRect(animationIndex, frameIndex, colliderIndex, rect) {
  return { type: SET_COLLIDER_RECT, animationIndex, frameIndex, colliderIndex, rect };
}

export function newFrame(animationIndex) {
  return { type: NEW_FRAME, animationIndex };
}

export function setFrameSourceRect(animationIndex, frameIndex, sourceRect) {
  return { type: SET_FRAME_SOURCERECT, animationIndex, frameIndex, sourceRect };
}

export function setFrameOffset(animationIndex, frameIndex, offset) {
  return { type: SET_FRAME_OFFSET, animationIndex, frameIndex, offset };
}