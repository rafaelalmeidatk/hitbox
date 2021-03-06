import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import reducer from '../ducks';
import io from '../middlewares/io';

const state =
  '{"objects":{"animations":[{"id":"rJiN16HKm","_inspector":{"modelType":"animation","editableFields":[{"fieldKey":"name","displayName":"Name"},{"fieldKey":"delay","displayName":"Delay"},{"fieldKey":"repeat","displayName":"Repeat"}]},"name":"New Animation","delay":200,"repeat":true,"frames":["HkR4J6HFX","HygAVkpHKX","Sk-0EJaBF7","Skq816HFX"]},{"id":"B1hVkTHFm","_inspector":{"modelType":"animation","editableFields":[{"fieldKey":"name","displayName":"Name"},{"fieldKey":"delay","displayName":"Delay"},{"fieldKey":"repeat","displayName":"Repeat"}]},"name":"New Animation","delay":200,"repeat":true,"frames":[]},{"id":"BJlhVy6SFQ","_inspector":{"modelType":"animation","editableFields":[{"fieldKey":"name","displayName":"Name"},{"fieldKey":"delay","displayName":"Delay"},{"fieldKey":"repeat","displayName":"Repeat"}]},"name":"New Animation","delay":200,"repeat":true,"frames":[]}],"frames":[{"id":"HkR4J6HFX","_inspector":{"modelType":"frame","editableFields":[{"fieldKey":"sourceRect","displayName":"Rectangle"},{"fieldKey":"offset","displayName":"Offset"}]},"name":"New Frame","sourceRect":{"x":0,"y":64,"width":64,"height":64},"offset":{"x":0,"y":0},"colliders":["ByEyAoM4N"]},{"id":"HygAVkpHKX","_inspector":{"modelType":"frame","editableFields":[{"fieldKey":"sourceRect","displayName":"Rectangle"},{"fieldKey":"offset","displayName":"Offset"}]},"name":"New Frame","sourceRect":{"x":128,"y":64,"width":64,"height":64},"offset":{"x":0,"y":0},"colliders":[]},{"id":"Sk-0EJaBF7","_inspector":{"modelType":"frame","editableFields":[{"fieldKey":"sourceRect","displayName":"Rectangle"},{"fieldKey":"offset","displayName":"Offset"}]},"name":"New Frame","sourceRect":{"x":64,"y":64,"width":64,"height":64},"offset":{"x":0,"y":0},"colliders":[]},{"id":"Skq816HFX","_inspector":{"modelType":"frame","editableFields":[{"fieldKey":"sourceRect","displayName":"Rectangle"},{"fieldKey":"offset","displayName":"Offset"}]},"name":"New Frame","sourceRect":{"x":192,"y":64,"width":64,"height":64},"offset":{"x":0,"y":0},"colliders":[]}],"colliders":[{"id":"ByEyAoM4N","_inspector":{"modelType":"collider","editableFields":[{"fieldKey":"name","displayName":"Name"},{"fieldKey":"type","displayName":"Type"},{"fieldKey":"rect","displayName":"Rectangle"},{"fieldKey":"origin","displayName":"Origin"}]},"name":"New Collider","type":"NONE","rect":{"x":-16,"y":16,"width":32,"height":32},"origin":{"x":0.5,"y":0.5}}]},"selection":{"selectedAnimationId":"rJiN16HKm","selectedItemId":"ByEyAoM4N","selectedFrameId":"HkR4J6HFX","selectedColliderId":"ByEyAoM4N"},"ui":{"framesVisible":true,"collidersVisible":true}}';
// eslint-disable-next-line
const preloadedState = JSON.parse(state);

export default () => {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), io],
    //preloadedState,
  });
};
