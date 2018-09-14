import shortid from 'shortid';
import reducer, {
  setColliderName,
  setColliderType,
  // setColliderRect,
} from '../ducks/objects';

function fieldUpdater(props, field, value) {
  const { id } = props;
  switch (field) {
    case 'name':
      return setColliderName(id, value);
    case 'type':
      return setColliderType(id, value);
    // case 'rect': {
    //   const rect = property.set(innerField, value);
    //   return setColliderRect(animationIndex, frameIndex, colliderIndex, rect);
    // }
  }
}

export default () => ({
  id: shortid.generate(),
  _inspector: {
    editableFields: [
      {
        fieldKey: 'name',
        displayName: 'Name',
      },
      {
        fieldKey: 'type',
        displayName: 'Type',
      },
      {
        fieldKey: 'rect',
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
