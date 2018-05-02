import {List, Map, fromJS} from 'immutable';
import reducer, {
  setAnimationName,
  setAnimationDelay,
  setAnimationRepeat,
} from '../ducks/animation';

let shortid = require('shortid');
if (process.env.NODE_ENV === 'test') {
  // Mock shortid if in tests
  shortid = {
    generate: () => 0,
  };
}

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

export default () => Map({
  _id: shortid.generate(),
  _inspector: Map({
    editableFields: List.of('name', 'delay', 'repeat'),
    updater: fieldUpdater,
  }),
  name: 'New Animation',
  delay: 0,
  repeat: false,
  frames: List(),
});