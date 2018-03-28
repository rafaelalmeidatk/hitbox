import { fromJS } from 'immutable';

import reducer, {
  newFrame,
  setFrameSourceRect,
  setFrameOffset,
} from '../ducks';

describe('frames reducer', () => {
  it('handles NEW_FRAME', () => {
    const state = fromJS({
      animations: [{
        _id: 0,
        name: 'Hey!',
        frames: [],
        delay: 0,
        repeat: false,
      }]
    });
    const animationIndex = 0;
    const action = newFrame(animationIndex);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({
      animations: [{
        _id: 0,
        name: 'Hey!',
        frames: [{
          _id: 0,
          sourceRect: {
            x: 0,
            y: 0,
            width: 32,
            height: 32,
          },
          colliders: [],
          offset: {
            x: 0,
            y: 0,
          },
        }],
        delay: 0,
        repeat: false,
      }]
    }));
  });

  it('handles SET_FRAME_SOURCERECT', () => {
    const state = fromJS({
      animations: [{
        _id: 0,
        name: 'Hey!',
        frames: [{
          _id: 0,
          sourceRect: {
            x: 0,
            y: 0,
            width: 32,
            height: 32,
          },
          colliders: [],
          offset: {
            x: 0,
            y: 0,
          },
        }],
        delay: 0,
        repeat: false,
      }]
    });
    const animationIndex = 0;
    const frameIndex = 0;
    const frameSourceRect = {
      x: 96,
      y: 96,
      width: 64,
      height: 64,
    };
    const action = setFrameSourceRect(animationIndex, frameIndex, frameSourceRect);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({
      animations: [{
        _id: 0,
        name: 'Hey!',
        frames: [{
          _id: 0,
          sourceRect: {
            x: 96,
            y: 96,
            width: 64,
            height: 64,
          },
          colliders: [],
          offset: {
            x: 0,
            y: 0,
          },
        }],
        delay: 0,
        repeat: false,
      }]
    }));
  });

  it('handles SET_FRAME_OFFSET', () => {
    const state = fromJS({
      animations: [{
        _id: 0,
        name: 'Hey!',
        frames: [{
          _id: 0,
          sourceRect: {
            x: 0,
            y: 0,
            width: 32,
            height: 32,
          },
          colliders: [],
          offset: {
            x: 0,
            y: 0,
          },
        }],
        delay: 0,
        repeat: false,
      }]
    });
    const animationIndex = 0;
    const frameIndex = 0;
    const frameOffset = {
      x: 64,
      y: 32,
    };
    const action = setFrameOffset(animationIndex, frameIndex, frameOffset);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({
      animations: [{
        _id: 0,
        name: 'Hey!',
        frames: [{
          _id: 0,
          sourceRect: {
            x: 0,
            y: 0,
            width: 32,
            height: 32,
          },
          colliders: [],
          offset: {
            x: 64,
            y: 32,
          },
        }],
        delay: 0,
        repeat: false,
      }]
    }));
  })
})