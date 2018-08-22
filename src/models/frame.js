import shortid from 'shortid';
import reducer, {
  setFrameSourceRect,
  setFrameOffset,
} from '../ducks/animation';

function fieldUpdater(props, field, value) {
  const {
    animationIndex,
    frameIndex,
    property,
    data: { innerField },
  } = props;
  switch (field) {
    case 'sourceRect': {
      const sourceRect = property.set(innerField, value);
      return setFrameSourceRect(animationIndex, frameIndex, sourceRect);
    }
    case 'offset': {
      const offset = property.set(innerField, value);
      return setFrameOffset(animationIndex, frameIndex, offset);
    }
  }
}

export default () => ({
  id: shortid.generate(),
  _inspector: {
    editableFields: [
      {
        field: 'sourceRect',
        displayName: 'Rectangle',
      },
      {
        field: 'offset',
        displayName: 'Offset',
      },
    ],
    updater: fieldUpdater,
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
