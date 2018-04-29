import {List, Map, fromJS} from 'immutable';
import reducer, {
  setColliderName,
  setColliderType,
  setColliderRect,
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
    case 'name':
      return setColliderName(animationIndex, frameIndex, colliderIndex, value);
    case 'type':
      return setColliderType(animationIndex, frameIndex, colliderIndex, value);
    case 'rect':
      return setColliderRect(/* ... */);
  }
}

export default () => Map({
  _id: shortid.generate(),
  _inspector: Map({
    editableFields: List.of('name', 'type', 'rect'),
    updater: fieldUpdater,
  }),
  name: 'New Collider',
  type: 'NONE',
  rect: Map({
    x: 0,
    y: 0,
    width: 32,
    height: 32,
  }),
});