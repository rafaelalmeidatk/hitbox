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
  newCollider,
} from './ducks/animation';
import {
  setSelectedAnimationIndex,
  setSelectedFrameIndex,
  setSelectedItemId,
} from './ducks/selection';

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
store.dispatch(newCollider(0, 0));
store.dispatch(setSelectedAnimationIndex(0));
store.dispatch(setSelectedFrameIndex(0, 0));
var id = store.getState()['animation'].get('animations').get(0).get('_id');
store.dispatch(setSelectedItemId(id));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
