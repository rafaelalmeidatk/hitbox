import shortid from 'shortid';
import reducer, {
  setColliderName,
  setColliderType,
  setColliderRect,
} from '../ducks/animation';

function fieldUpdater(props, field, value) {
  const {
    animationIndex,
    frameIndex,
    colliderIndex,
    property,
    data: { innerField },
  } = props;
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

export default () => ({
  id: shortid.generate(),
  _inspector: {
    editableFields: [
      {
        field: 'name',
        displayName: 'Name',
      },
      {
        field: 'type',
        displayName: 'Type',
      },
      {
        field: 'rect',
        displayName: 'Rectangle',
      },
    ],
    updater: fieldUpdater,
  },
  name: 'New Collider',
  type: 'NONE',
  rect: {
    x: 0,
    y: 0,
    width: 32,
    height: 32,
  },
});
