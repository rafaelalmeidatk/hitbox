import {List, Map, fromJS} from 'immutable';

export function setFilename(state, filename) {
  return state.set('filename', filename);
}

export function createAnimationsList(state) {
  return state.set('animations', List());
}

export function newAnimation(state, animationName) {
  return state.update('animations', List(),
    animations => animations.push(Map({
        name: animationName,
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
      type: 'NONE',
      x: 0,
      y: 0,
      width: 32,
      height: 32,
    }))
  );
}