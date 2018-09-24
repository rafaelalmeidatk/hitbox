import shortid from 'shortid';
import {
  setColliderName,
  setColliderType,
  setColliderRect,
  setColliderOrigin,
} from '../ducks/objects';

export function fieldUpdater(props, field, value) {
  const {
    id,
    property,
    data: { innerField },
  } = props;
  switch (field) {
    case 'name':
      return setColliderName(id, value);
    case 'type':
      return setColliderType(id, value);
    case 'rect': {
      const rect = {
        ...property,
        [innerField]: value,
      };
      return setColliderRect(id, rect);
    }
    case 'origin': {
      const origin = {
        ...property,
        [innerField]: value,
      };
      return setColliderOrigin(id, origin);
    }
  }
}

export default () => ({
  id: shortid.generate(),
  _inspector: {
    modelType: 'collider',
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
      {
        fieldKey: 'origin',
        displayName: 'Origin',
      },
    ],
  },
  name: 'New Collider',
  type: 'NONE',
  rect: {
    x: 0,
    y: 0,
    width: 32,
    height: 32,
  },
  origin: {
    x: 0.5,
    y: 0.5,
  },
});
