import React from 'react';
import ReactDOM from 'react-dom';
import {Animations} from './Animations';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Animations />, div);
});