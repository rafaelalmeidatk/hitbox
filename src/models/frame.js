import {List, Map, fromJS} from 'immutable';
import reducer, {
  setFrameSourceRect,
  setFrameOffset,
} from '../ducks/animation';

let shortid = require('shortid');
if (process.env.NODE_ENV === 'test') {
  // Mock shortid if in tests
  shortid = {
    generate: () => 0,
  };
}

function fieldUpdater(props, field, value) {
  const { animationIndex, frameIndex, colliderIndex } = props;
  switch (field) {
    case 'sourceRect':
      return setFrameSourceRect(/* ... */);
    case 'offset':
      return setFrameOffset(/* ... */);
  }
}

export default () => Map({
  _id: shortid.generate(),
  _inspector: Map({
    editableFields: List.of('sourceRect', 'offset'),
    updater: fieldUpdater,
  }),
  sourceRect: Map({
    x: 0,
    y: 0,
    width: 32,
    height: 32,
  }),
  offset: Map({
    x: 0,
    y: 0,
  }),
  colliders: List(),
});