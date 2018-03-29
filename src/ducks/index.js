import { combineReducers } from 'redux';
import animation from './animation';
import selection from './selection';

export default combineReducers({
  animation,
  selection,
});