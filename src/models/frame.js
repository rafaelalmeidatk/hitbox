import { List, Map, fromJS } from 'immutable';
import shortid from 'shortid';
import reducer, { setFrameSourceRect, setFrameOffset } from '../ducks/animation';

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

export default () =>
  Map({
    id: shortid.generate(),
    _inspector: Map({
      editableFields: List.of(
        Map({
          field: 'sourceRect',
          displayName: 'Rectangle',
        }),
        Map({
          field: 'offset',
          displayName: 'Offset',
        })
      ),
      updater: fieldUpdater,
    }),
    name: 'New Frame',
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
