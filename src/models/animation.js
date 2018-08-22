import shortid from 'shortid';
import reducer, {
  setAnimationName,
  setAnimationDelay,
  setAnimationRepeat,
} from '../ducks/animation';

function fieldUpdater(props, field, value) {
  const { animationIndex } = props;
  switch (field) {
    case 'name':
      return setAnimationName(animationIndex, value);
    case 'delay':
      return setAnimationDelay(animationIndex, value);
    case 'repeat':
      return setAnimationRepeat(animationIndex, value);
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
        field: 'delay',
        displayName: 'Delay',
      },
      {
        field: 'repeat',
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
