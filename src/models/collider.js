import shortid from 'shortid';
import {
  setColliderName,
  setColliderType,
  setColliderRect,
  setColliderOrigin,
} from '../ducks/objects';

export function fieldUpdater(props, field, value) {
  const { id, property, data } = props;

  switch (field) {
    case 'name':
      return setColliderName(id, value);
    case 'type':
      return setColliderType(id, value);
    case 'rect': {
      const { innerField } = data;
      const rect = {
        ...property,
        [innerField]: value,
      };
      return setColliderRect(id, rect);
    }
    case 'origin': {
      const { innerField } = data;
      const origin = {
        ...property,
        [innerField]: value,
      };
      return setColliderOrigin(id, origin);
    }
    default:
      return null;
  }
}

export default () => ({
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
        selection: ['HITBOX', 'HURTBOX', 'PHYSICS', 'NONE'],
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
  _meta: {
    saveFields: ['id', 'name', 'type', 'rect', 'origin'],
  },
  id: shortid.generate(),
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
