import { combineReducers } from 'redux';
import animation from './animation';
import selection from './selection';
import ui from './ui';

export default combineReducers({
  animation,
  selection,
  ui,
});