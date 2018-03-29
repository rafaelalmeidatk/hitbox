import { fromJS } from 'immutable';

import reducer, {
  setSelectedAnimationIndex,
  setSelectedFrameIndex,
  setSelectedColliderIndex,
  setSelectedItemId,
} from '../ducks/selection';

describe('selection reducer', () => {
  it('handles SET_SELECTED_ANIMATION_INDEX', () => {
    const state = fromJS({});
    const index = 5;
    const action = setSelectedAnimationIndex(index);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({
      selectedAnimationIndex: 5,
    }));
  });

  it('handles SET_SELECTED_FRAME_INDEX', () => {
    const state = fromJS({});
    const index = 5;
    const action = setSelectedFrameIndex(index);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({
      selectedFrameIndex: 5,
    }));
  });

  it('handles SET_SELECTED_COLLIDER_INDEX', () => {
    const state = fromJS({});
    const index = 5;
    const action = setSelectedColliderIndex(index);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({
      selectedColliderIndex: 5,
    }));
  });
  it('handles SET_SELECTED_ITEM_ID', () => {
    const state = fromJS({});
    const index = 3;
    const action = setSelectedItemId(index);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({
      selectedItemId: 3,
    }));
  });
})