import { configureStore } from '@acemarke/redux-starter-kit';
import reducer from '../ducks';

export default () => {
  return configureStore({ reducer });
};
