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

function updaterField(animationId, field, value) {
  console.log(`updater called with field ${field} and value ${value}`);
  switch (field) {
    case 'name':
      return setAnimationName(animationId, value);
    case 'delay':
      return setAnimationDelay(animationId, value);
    case 'repeat':
      return setAnimationRepeat(animationId, value);
  }
}

export default Map({
  _id: shortid.generate(),
  _inspector: Map({
    editableFields: List.of('name', 'delay', 'repeat'),
    updater: updaterField,
  }),
  name: 'New Animation',
  delay: 0,
  repeat: false,
  frames: List(),
});