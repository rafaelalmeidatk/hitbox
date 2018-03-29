import { createStore } from 'redux';
import reducer from '../ducks';

export default () => {
  return createStore(reducer);
};
