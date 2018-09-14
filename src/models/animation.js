import shortid from 'shortid';
import reducer, {
  setAnimationName,
  setAnimationDelay,
  setAnimationRepeat,
} from '../ducks/objects';

function fieldUpdater(props, field, value) {
  const { id } = props;
  switch (field) {
    case 'name':
      return setAnimationName(id, value);
    case 'delay':
      return setAnimationDelay(id, value);
    case 'repeat':
      return setAnimationRepeat(id, value);
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
        fieldKey: 'delay',
        displayName: 'Delay',
      },
      {
        fieldKey: 'repeat',
        displayName: 'Repeat',
      },
    ],
    updater: fieldUpdater,
  },
  name: 'New Animation',
  delay: 0,
  repeat: false,
  frames: [],
});
