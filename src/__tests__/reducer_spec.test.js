import { fromJS } from 'immutable';

import reducer, { setFilename } from '../ducks/animation';

describe('reducer', () => {
  it('has an initial state', () => {
    const action = setFilename('Spritesheet1');
    const nextState = reducer(undefined, action);
    expect(nextState).toEqual(fromJS({
      filename: 'Spritesheet1',
    }));
  });

  describe('filename', () => {
    it('handles SET_FILENAME', () => {
      const state = fromJS({});
      const action = setFilename('Spritesheet1');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(fromJS({
        filename: 'Spritesheet1',
      }));
    });
  });
});