import { Map, List, fromJS } from 'immutable';
import { setFilename, createAnimationList } from '../ducks/animation';

import makeStore from '../store';

describe('store', () => {
  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).toEqual({
      animation: Map(),
      selection: Map(),
    });

    store.dispatch(setFilename('File test'));
    store.dispatch(createAnimationList());
    expect(store.getState()).toEqual({
      animation: Map({
        filename: 'File test',
        animations: List(),
      }),
      selection: Map(),
    });
  });
});