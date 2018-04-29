import { fromJS } from 'immutable';
import createAnimationModel from '../models/animation';

import reducer, {
  createAnimationList,
  newAnimation,
  setAnimationName,
  setAnimationDelay,
  setAnimationRepeat,
} from '../ducks/animation';

describe('animations reducer', () => {
  it('handles CREATE_ANIMATION_LIST', () => {
    const state = fromJS({});
    const action = createAnimationList();
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({
      animations: [],
    }));
  });

  it('handles NEW_ANIMATION', () => {
    const state = fromJS({});
    const action = newAnimation();
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({
      animations: [createAnimationModel()],
    }));
  });

  it('handles SET_ANIMATION_NAME', () => {
    const state = fromJS({
      animations: [{
        _id: 0,
        name: 'New Animation',
        frames: [],
        delay: 0,
        repeat: false,
      }]
    });
    const animationIndex = 0;
    const newAnimationName = 'New Name';
    const action = setAnimationName(animationIndex, newAnimationName);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({
      animations: [{
        _id: 0,
        name: 'New Name',
        frames: [],
        delay: 0,
        repeat: false,
      }]
    }));
  });

  it('handles SET_ANIMATION_DELAY', () => {
    const state = fromJS({
      animations: [{
        _id: 0,
        name: 'New Animation',
        frames: [],
        delay: 0,
        repeat: false,
      }]
    });
    const animationIndex = 0;
    const newAnimationDelay = 500;
    const action = setAnimationDelay(animationIndex, newAnimationDelay);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({
      animations: [{
        _id: 0,
        name: 'New Animation',
        frames: [],
        delay: 500,
        repeat: false,
      }]
    }));
  });

  it('handles SET_ANIMATION_REPEAT', () => {
    const state = fromJS({
      animations: [{
        _id: 0,
        name: 'New Animation',
        frames: [],
        delay: 0,
        repeat: false,
      }]
    });
    const animationIndex = 0;
    const newAnimationRepeat = true;
    const action = setAnimationRepeat(animationIndex, newAnimationRepeat);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({
      animations: [{
        _id: 0,
        name: 'New Animation',
        frames: [],
        delay: 0,
        repeat: true,
      }]
    }));
  });
})