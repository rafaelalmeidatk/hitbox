import shortid from 'shortid';
import { setFrameSourceRect, setFrameOffset } from '../ducks/objects';

export function fieldUpdater(props, field, value) {
  const {
    id,
    property,
    data: { innerField },
  } = props;
  switch (field) {
    case 'sourceRect': {
      const sourceRect = {
        ...property,
        [innerField]: value,
      };
      return setFrameSourceRect(id, sourceRect);
    }
    case 'offset': {
      const offset = {
        ...property,
        [innerField]: value,
      };
      return setFrameOffset(id, offset);
    }
  }
}

export default () => ({
  id: shortid.generate(),
  _inspector: {
    modelType: 'frame',
    editableFields: [
      {
        fieldKey: 'sourceRect',
        displayName: 'Rectangle',
      },
      {
        fieldKey: 'offset',
        displayName: 'Offset',
      },
    ],
  },
  name: 'New Frame',
  sourceRect: {
    x: 0,
    y: 0,
    width: 32,
    height: 32,
  },
  offset: {
    x: 0,
    y: 0,
  },
  colliders: [],
});
