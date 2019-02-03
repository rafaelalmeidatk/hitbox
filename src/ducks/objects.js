import { createReducer } from 'redux-starter-kit';
import createAnimationModel from '../models/animation';
import createFrameModel from '../models/frame';
import createColliderModel from '../models/collider';

// Initial State
const INITIAL_STATE = {
  animations: [],
  frames: [],
  colliders: [],
};

// Actions
const NEW_ANIMATION = 'animation-editor/objects/NEW_ANIMATION';
const DELETE_ANIMATION = 'animation-editor/objects/DELETE_ANIMATION';
const SET_ANIMATION_NAME = 'animation-editor/objects/SET_ANIMATION_NAME';
const SET_ANIMATION_DELAY = 'animation-editor/objects/SET_ANIMATION_DELAY';
const SET_ANIMATION_REPEAT = 'animation-editor/objects/SET_ANIMATION_REPEAT';

const NEW_COLLIDER = 'animation-editor/objects/NEW_COLLIDER';
const DELETE_COLLIDER = 'animation-editor/objects/DELETE_COLLIDER';
const SET_COLLIDER_NAME = 'animation-editor/objects/SET_COLLIDER_NAME';
const SET_COLLIDER_TYPE = 'animation-editor/objects/SET_COLLIDER_TYPE';
const SET_COLLIDER_RECT = 'animation-editor/objects/SET_COLLIDER_RECT';
const SET_COLLIDER_ORIGIN = 'animation-editor/objects/SET_COLLIDER_ORIGIN';

const NEW_FRAME = 'animation-editor/objects/NEW_FRAME';
const DELETE_FRAME = 'animation-editor/objects/DELETE_FRAME';
const SET_FRAME_SOURCERECT = 'animation-editor/objects/SET_FRAME_SOURCERECT';
const SET_FRAME_OFFSET = 'animation-editor/objects/SET_FRAME_OFFSET';

const LOAD_OBJECTS = 'animation-editor/objects/LOAD_OBJECTS';
const RESET_OBJECTS = 'animation-editor/objects/RESET_OBJECTS';

// Helper
function findIndexById(array, id) {
  return array.findIndex(obj => obj && obj.id === id);
}

// Reducer
export default createReducer(INITIAL_STATE, {
  [NEW_ANIMATION]: (state, action) => {
    state.animations.push(createAnimationModel());
  },

  [DELETE_ANIMATION]: (state, action) => {
    const index = findIndexById(state.animations, action.id);
    state.animations.splice(index, 1);
  },

  [SET_ANIMATION_NAME]: (state, action) => {
    const index = findIndexById(state.animations, action.id);
    state.animations[index].name = action.name;
  },

  [SET_ANIMATION_DELAY]: (state, action) => {
    const index = findIndexById(state.animations, action.id);
    state.animations[index].delay = parseInt(action.delay, 10);
  },

  [SET_ANIMATION_REPEAT]: (state, action) => {
    const index = findIndexById(state.animations, action.id);
    state.animations[index].repeat = action.repeat;
  },

  [NEW_FRAME]: (state, action) => {
    const { animationId } = action;
    const animation = state.animations.find(a => a.id === animationId);
    if (!animation)
      throw new Error('The frame must specify a valid animation ID');

    const frame = createFrameModel();
    state.frames.push(frame);
    animation.frames.push(frame.id);
  },

  [DELETE_FRAME]: (state, action) => {
    const { id } = action;

    state.animations.forEach(animation => {
      animation.frames = animation.frames.filter(frameId => frameId !== id);
    });

    const index = findIndexById(state.frames, action.id);
    state.frames.splice(index, 1);
  },

  [SET_FRAME_SOURCERECT]: (state, action) => {
    const index = findIndexById(state.frames, action.id);
    state.frames[index].sourceRect = action.sourceRect;
  },

  [SET_FRAME_OFFSET]: (state, action) => {
    const index = findIndexById(state.frames, action.id);
    state.frames[index].offset = action.offset;
  },

  [NEW_COLLIDER]: (state, action) => {
    const { frameId } = action;
    const frame = state.frames.find(a => a.id === frameId);
    if (!frame) throw new Error('The collider must specify a valid frame ID');

    const collider = createColliderModel();
    state.colliders.push(collider);
    frame.colliders.push(collider.id);
  },

  [DELETE_COLLIDER]: (state, action) => {
    const { id } = action;

    state.frames.forEach(frame => {
      frame.colliders = frame.colliders.filter(colliderId => colliderId !== id);
    });

    const index = findIndexById(state.colliders, action.id);
    state.colliders.splice(index, 1);
  },

  [SET_COLLIDER_NAME]: (state, action) => {
    const index = findIndexById(state.colliders, action.id);
    state.colliders[index].name = action.name;
  },

  [SET_COLLIDER_TYPE]: (state, action) => {
    const index = findIndexById(state.colliders, action.id);
    state.colliders[index].type = action.colliderType;
  },

  [SET_COLLIDER_RECT]: (state, action) => {
    const index = findIndexById(state.colliders, action.id);
    state.colliders[index].rect = action.rect;
  },

  [SET_COLLIDER_ORIGIN]: (state, action) => {
    const index = findIndexById(state.colliders, action.id);
    state.colliders[index].origin = action.origin;
  },

  [LOAD_OBJECTS]: (state, action) => {
    const { animations, frames, colliders } = action;
    
    // Create animations
    animations.forEach(animation => {
      state.animations.push({
        ...createAnimationModel(),
        ...animation,
      });
    });

    frames.forEach(frame => {
      state.frames.push({
        ...createFrameModel(),
        ...frame,
      });
    });

    colliders.forEach(collider => {
      state.colliders.push({
        ...createColliderModel(),
        ...collider,
      });
    });
  },

  [RESET_OBJECTS]: () => {
    return INITIAL_STATE;
  },
});

// Action creators
export function newAnimation() {
  return { type: NEW_ANIMATION };
}

export function deleteAnimation(id) {
  return { type: DELETE_ANIMATION, id };
}

export function setAnimationName(id, name) {
  return { type: SET_ANIMATION_NAME, id, name };
}

export function setAnimationDelay(id, delay) {
  return { type: SET_ANIMATION_DELAY, id, delay };
}

export function setAnimationRepeat(id, repeat) {
  return { type: SET_ANIMATION_REPEAT, id, repeat };
}

export function newFrame(animationId) {
  return { type: NEW_FRAME, animationId };
}

export function deleteFrame(id) {
  return { type: DELETE_FRAME, id };
}

export function setFrameSourceRect(id, sourceRect) {
  return { type: SET_FRAME_SOURCERECT, id, sourceRect };
}

export function setFrameOffset(id, offset) {
  return { type: SET_FRAME_OFFSET, id, offset };
}

export function newCollider(frameId) {
  return { type: NEW_COLLIDER, frameId };
}

export function deleteCollider(id) {
  return { type: DELETE_COLLIDER, id };
}

export function setColliderName(id, name) {
  return { type: SET_COLLIDER_NAME, id, name };
}

export function setColliderType(id, type) {
  return { type: SET_COLLIDER_TYPE, id, colliderType: type };
}

export function setColliderRect(id, rect) {
  return { type: SET_COLLIDER_RECT, id, rect };
}

export function setColliderOrigin(id, origin) {
  return { type: SET_COLLIDER_ORIGIN, id, origin };
}

export function loadObjects(animations, frames, colliders) {
  return { type: LOAD_OBJECTS, animations, frames, colliders };
}

export function resetObjects() {
  return { type: RESET_OBJECTS };
}
