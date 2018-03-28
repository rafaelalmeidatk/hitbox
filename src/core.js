import {List, Map, fromJS} from 'immutable';

let shortid = require('shortid');
if (process.env.NODE_ENV === 'test') {
  // Mock shortid if in tests
  shortid = {
    generate: () => 0,
  };
}

export const INITIAL_STATE = Map();

export function setFilename(state, filename) {
  return state.set('filename', filename);
}

export function createAnimationsList(state) {
  return state.set('animations', List());
}

export function newAnimation(state) {
  return state.update('animations', List(),
    animations => animations.push(Map({
        _id: shortid.generate(),
        name: 'New Animation',
        frames: List.of(),
        delay: 0,
        repeat: false,
    }))
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
    frames => frames.push(Map({
      _id: shortid.generate(),
      sourceRect: Map({
        x: 0,
        y: 0,
        width: 32,
        height: 32,
      }),
      colliders: List(),
      offset: Map({
        x: 0,
        y: 0,
      }),
    }))
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
    colliders => colliders.push(Map({
      _id: shortid.generate(),
      name: 'New Collider',
      type: 'NONE',
      rect: Map({
        x: 0,
        y: 0,
        width: 32,
        height: 32, 
      })
    }))
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