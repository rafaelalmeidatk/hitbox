import {List, Map, fromJS} from 'immutable';

let shortid = require('shortid');
if (process.env.NODE_ENV === 'test') {
  // Mock shortid if in tests
  shortid = {
    generate: () => 0,
  };
}

export default Map({
  _id: shortid.generate(),
  _inspector: Map({
    editableFields: List.of('name', 'type', 'rect'),
  }),
  name: 'New Collider',
  type: 'NONE',
  rect: Map({
    x: 0,
    y: 0,
    width: 32,
    height: 32,
  }),
});