import { Map } from 'immutable';

// Initial State
const INITIAL_STATE = Map({
  framesVisible: true,
  collidersVisible: true,
});

// Actions
const SHOW_FRAMES = 'animation-editor/ui/SHOW_FRAMES';
const HIDE_FRAMES = 'animation-editor/ui/HIDE_FRAMES';

const SHOW_COLLIDERS = 'animation-editor/ui/SHOW_COLLIDERS';
const HIDE_COLLIDERS = 'animation-editor/ui/HIDE_COLLIDERS';

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SHOW_FRAMES:
      return state.set('framesVisible', true);

    case HIDE_FRAMES:
      return state.set('framesVisible', false);

    case SHOW_COLLIDERS:
      return state.set('collidersVisible', true);

    case HIDE_COLLIDERS:
      return state.set('collidersVisible', false);

    default:
      return state;
  }
}

// Action creators
export function showFrames() {
  return { type: SHOW_FRAMES };
}

export function hideFrames() {
  return { type: HIDE_FRAMES };
}

export function showColliders() {
  return { type: SHOW_COLLIDERS };
}

export function hideColliders() {
  return { type: HIDE_COLLIDERS };
}