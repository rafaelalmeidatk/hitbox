import {
  newCollider as c_newCollider,
  setColliderName as c_setColliderName,
  setColliderType as c_setColliderType,
  setColliderRect as c_setColliderRect,
} from '../core';

// Actions
const NEW_COLLIDER = 'animation-editor/animations/NEW_COLLIDER';
const SET_COLLIDER_NAME = 'animation-editor/animations/SET_COLLIDER_NAME';
const SET_COLLIDER_TYPE = 'animation-editor/animations/SET_COLLIDER_TYPE';
const SET_COLLIDER_RECT = 'animation-editor/animations/SET_COLLIDER_RECT';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case NEW_COLLIDER:
      return c_newCollider(state, action.animationIndex, action.frameIndex);

    case SET_COLLIDER_NAME:
      return c_setColliderName(state, action.animationIndex, action.frameIndex, action.colliderIndex, action.name);

    case SET_COLLIDER_TYPE:
      return c_setColliderType(state, action.animationIndex, action.frameIndex, action.colliderIndex, action.colliderType);

    case SET_COLLIDER_RECT:
      return c_setColliderRect(state, action.animationIndex, action.frameIndex, action.colliderIndex, action.rect);

    default:
      return state;
  }
}

// Action creators
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