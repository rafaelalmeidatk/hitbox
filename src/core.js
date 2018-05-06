import {List, Map, fromJS} from 'immutable';
import createAnimationModel from './models/animation';
import createFrameModel from './models/frame';
import createColliderModel from './models/collider';

export const INITIAL_STATE = Map();

export function setFilename(state, filename) {
  return state.set('filename', filename);
}

export function createAnimationsList(state) {
  return state.set('animations', List());
}

export function getFrames(animations, animationIndex) {
  const anim = animations.get(animationIndex);
  return anim.get('frames').toJS();
}

export function newAnimation(state) {
  return state.update('animations', List(),
    animations => animations.push(createAnimationModel())
  );
}

export function setAnimationName(state, animationIndex, animationName) {
  return state.setIn(
    ['animations', animationIndex, 'name'], animationName
  );
}

export function setAnimationDelay(state, animationIndex, animationDelay) {
  return state.setIn(
    ['animations', animationIndex, 'delay'], animationDelay
  );
}

export function setAnimationRepeat(state, animationIndex, animationRepeat) {
  return state.setIn(
    ['animations', animationIndex, 'repeat'], animationRepeat
  );
}

export function newFrame(state, animationIndex) {
  return state.updateIn(
    ['animations', animationIndex, 'frames'], List(),
    frames => frames.push(createFrameModel())
  );
}

export function setFrameSourceRect(state, animationIndex, frameIndex, sourceRect) {
  return state.setIn(
    ['animations', animationIndex, 'frames', frameIndex, 'sourceRect'],
    fromJS(sourceRect)
  );
}

export function setFrameOffset(state, animationIndex, frameIndex, offset) {
  return state.setIn(
    ['animations', animationIndex, 'frames', frameIndex, 'offset'],
    fromJS(offset)
  );
}

export function newCollider(state, animationIndex, frameIndex) {
  return state.updateIn(
    ['animations', animationIndex, 'frames', frameIndex, 'colliders'], List(),
    colliders => colliders.push(createColliderModel())
  );
}

export function setColliderName(state, animationIndex, frameIndex, colliderIndex, colliderName) {
  return state.setIn(
    ['animations', animationIndex, 'frames', frameIndex, 'colliders', colliderIndex, 'name'],
    colliderName
  );
}

export function setColliderType(state, animationIndex, frameIndex, colliderIndex, colliderType) {
  return state.setIn(
    ['animations', animationIndex, 'frames', frameIndex, 'colliders', colliderIndex, 'type'],
    colliderType
  );
}

export function setColliderRect(state, animationIndex, frameIndex, colliderIndex, colliderRect) {
  return state.setIn(
    ['animations', animationIndex, 'frames', frameIndex, 'colliders', colliderIndex, 'rect'],
    fromJS(colliderRect)
  );
}
