import { combineReducers } from 'redux';
import animation from './animation';
import objects from './objects';
import selection from './selection';
import ui from './ui';

export default combineReducers({
  animation,
  objects,
  selection,
  ui,
});
