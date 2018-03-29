import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store';
import {Provider} from 'react-redux';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import {
  createAnimationList,
  newAnimation,
  newFrame,
} from './ducks/animation';

const store = createStore();
store.dispatch(createAnimationList());
store.dispatch(newAnimation());
store.dispatch(newAnimation());
store.dispatch(newAnimation());
store.dispatch(newFrame(0));
store.dispatch(newFrame(0));
store.dispatch(newFrame(0));
store.dispatch(newFrame(1));
store.dispatch(newFrame(1));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
