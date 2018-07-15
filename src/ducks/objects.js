import { Map, List } from 'immutable';
import createAnimationModel from '../models/animation';
import createFrameModel from '../models/frame';
import createColliderModel from '../models/collider';

// Initial State
const INITIAL_STATE = Map({
  animations: List(),
  frames: List(),
  colliders: List(),
});

// Actions
const NEW_ANIMATION = 'animation-editor/objects/NEW_ANIMATION';
const SET_ANIMATION_NAME = 'animation-editor/objects/SET_ANIMATION_NAME';
const SET_ANIMATION_DELAY = 'animation-editor/objects/SET_ANIMATION_DELAY';
const SET_ANIMATION_REPEAT = 'animation-editor/objects/SET_ANIMATION_REPEAT';

const NEW_COLLIDER = 'animation-editor/objects/NEW_COLLIDER';
const SET_COLLIDER_NAME = 'animation-editor/objects/SET_COLLIDER_NAME';
const SET_COLLIDER_TYPE = 'animation-editor/objects/SET_COLLIDER_TYPE';
const SET_COLLIDER_RECT = 'animation-editor/objects/SET_COLLIDER_RECT';

const NEW_FRAME = 'animation-editor/objects/NEW_FRAME';
const SET_FRAME_SOURCERECT = 'animation-editor/objects/SET_FRAME_SOURCERECT';
const SET_FRAME_OFFSET = 'animation-editor/objects/SET_FRAME_OFFSET';

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case NEW_ANIMATION:
      return state.update('animations', animations => animations.push(createAnimationModel()));

    case NEW_FRAME: {
      const { animationId } = action;
      const animationIndex = state
        .get('animations')
        .findIndex(animation => animation.get('_id') === animationId);
      if (!~animationIndex) throw new Error('The frame must specify a valid animation ID');
      const frame = createFrameModel();
      return state
        .update('frames', frames => frames.push(frame))
        .updateIn(['animations', animationIndex, 'frames'], frames =>
          frames.push(frame.get('_id'))
        );
    }

    case NEW_COLLIDER: {
      const { frameId } = action;
      const frameIndex = state.get('frames').findIndex(frame => frame.get('_id') === frameId);
      if (!~frameIndex) throw new Error('The collider must specify a valid frame ID');
      const collider = createColliderModel();
      return state
        .update('colliders', colliders => colliders.push(collider))
        .updateIn(['frames', frameIndex, 'colliders'], colliders =>
          colliders.push(collider.get('_id'))
        );
    }

    default:
      return state;
  }
}

// Action creators
export function newAnimation() {
  return { type: NEW_ANIMATION };
}

export function newFrame(animationId) {
  return { type: NEW_FRAME, animationId };
}

export function newCollider(frameId) {
  return { type: NEW_COLLIDER, frameId };
}
/*

export function setAnimationName(animationIndex, name) {
  return { type: SET_ANIMATION_NAME, animationIndex, name };
}

export function setAnimationDelay(animationIndex, delay) {
  return { type: SET_ANIMATION_DELAY, animationIndex, delay };
}

export function setAnimationRepeat(animationIndex, repeat) {
  return { type: SET_ANIMATION_REPEAT, animationIndex, repeat };
}

export function setFrameSourceRect(animationIndex, frameIndex, sourceRect) {
  return { type: SET_FRAME_SOURCERECT, animationIndex, frameIndex, sourceRect };
}

export function setFrameOffset(animationIndex, frameIndex, offset) {
  return { type: SET_FRAME_OFFSET, animationIndex, frameIndex, offset };
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
/**/
