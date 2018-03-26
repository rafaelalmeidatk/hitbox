import { Map, fromJS } from 'immutable';
import { setFilename, createAnimationList } from '../ducks';

import makeStore from '../store';

describe('store', () => {
  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).toEqual(Map());

    store.dispatch(setFilename('File test'));
    store.dispatch(createAnimationList());
    expect(store.getState()).toEqual(fromJS({
      filename: 'File test',
      animations: [],
    }));
  });
});