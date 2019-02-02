import { combineReducers } from 'redux-starter-kit';
import objects from './objects';
import selection from './selection';
import ui from './ui';

export default combineReducers({
  objects,
  selection,
  ui,
});
