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
  const { animationIndex, frameIndex, colliderIndex, property, data: { innerField } } = props;
  switch (field) {
    case 'name':
      return setColliderName(animationIndex, frameIndex, colliderIndex, value);
    case 'type':
      return setColliderType(animationIndex, frameIndex, colliderIndex, value);
    case 'rect': {
      const rect = property.set(innerField, value);
      return setColliderRect(animationIndex, frameIndex, colliderIndex, rect);
    }
  }
}

export default () => Map({
  _id: shortid.generate(),
  _inspector: Map({
    editableFields: List.of(
      Map({
        field: 'name',
        displayName: 'Name',
      }),
      Map({
        field: 'type',
        displayName: 'Type',
      }),
      Map({
        field: 'rect',
        displayName: 'Rectangle',
      }),
    ),
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