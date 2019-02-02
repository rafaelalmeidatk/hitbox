import { combineReducers } from 'redux-starter-kit';
import schema from './schema';
import objects from './objects';
import selection from './selection';
import ui from './ui';

export default combineReducers({
  schema,
  objects,
  selection,
  ui,
});
