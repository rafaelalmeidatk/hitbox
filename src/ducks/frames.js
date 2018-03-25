import {
  newFrame as c_newFrame,
  setFrameSourceRect as c_setFrameSourceRect,
  setFrameOffset as c_setFrameOffset,
} from '../core';

// Actions
const NEW_FRAME = 'animation-editor/animations/NEW_FRAME';
const SET_FRAME_SOURCERECT = 'animation-editor/animations/SET_FRAME_SOURCERECT';
const SET_FRAME_OFFSET = 'animation-editor/animations/SET_FRAME_OFFSET';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
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
export function newFrame(animationIndex) {
  return { type: NEW_FRAME, animationIndex };
}

export function setFrameSourceRect(animationIndex, frameIndex, sourceRect) {
  return { type: SET_FRAME_SOURCERECT, animationIndex, frameIndex, sourceRect };
}

export function setFrameOffset(animationIndex, frameIndex, offset) {
  return { type: SET_FRAME_OFFSET, animationIndex, frameIndex, offset };
}