import shortid from 'shortid';
import {
  setAnimationName,
  setAnimationDelay,
  setAnimationRepeat,
} from '../ducks/objects';

export function fieldUpdater(props, field, value) {
  const { id } = props;
  switch (field) {
    case 'name':
      return setAnimationName(id, value);
    case 'delay':
      return setAnimationDelay(id, value);
    case 'repeat':
      return setAnimationRepeat(id, value);
    default:
      return null;
  }
}

export default () => ({
  _inspector: {
    modelType: 'animation',
    editableFields: [
      {
        fieldKey: 'name',
        displayName: 'Name',
      },
      {
        fieldKey: 'delay',
        displayName: 'Delay',
      },
      {
        fieldKey: 'repeat',
        displayName: 'Repeat',
      },
    ],
  },
  _meta: {
    // 'frames' is a special field that is always saved
    saveFields: ['id', 'name', 'delay', 'repeat'],
  },
  id: shortid.generate(),
  name: 'New Animation',
  delay: 200,
  repeat: true,
  frames: [],
});
