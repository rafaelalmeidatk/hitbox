import {fromJS} from 'immutable';

// Types
export const ANIMATION_TYPE = 'inspector/ANIMATION';
export const FRAME_TYPE = 'inspector/FRAME';
export const COLLIDER_TYPE = 'inspector/COLLIDER';

// Functions
export function getInspectableObjectById(animations, id) {
  const inspectableObject = {};
  animations.find((obj) => {
    if (obj.get('_id') === id) {
      inspectableObject.type = ANIMATION_TYPE;
      inspectableObject.object = obj;
      return true;
    }
    var frames = obj.get('frames');
    if (!frames) return false;
    frames.find((obj) => {
      if (obj.get('_id') === id) {
        inspectableObject.type = FRAME_TYPE;
        inspectableObject.object = obj;
        return true;
      }
      var colliders = obj.get('colliders');
      if (!colliders) return false;
      colliders.find((obj) => {
        if (obj.get('_id') === id) {
          inspectableObject.type = COLLIDER_TYPE;
          inspectableObject.object = obj;
          return true;
        }
      });
    });
  });
  return extractFieldsByType(fromJS(inspectableObject));
}

export function extractFieldsByType(inspectableObject) {
  const type = inspectableObject.get('type');
  const object = inspectableObject.get('object');
  const fields = [];
  switch (type) {
    case ANIMATION_TYPE:
      fields.push('name', 'delay', 'repeat');
      break;

    case FRAME_TYPE:
      fields.push('sourceRect', 'offset');
      break;

    case COLLIDER_TYPE:
      fields.push('name', 'type', 'rect');
      break;
  }
  return {
    type,
    fields,
  };
}

export function findObjectById(animations, id) {
  let finalObject = null;
  animations.find((obj) => {
    if (obj.get('_id') === id) {
      finalObject = obj;
      return true;
    }
    var frames = obj.get('frames');
    if (!frames) return false;
    frames.find((obj) => {
      if (obj.get('_id') === id) {
        finalObject = obj;
        return true;
      }
      var colliders = obj.get('colliders');
      if (!colliders) return false;
      colliders.find((obj) => {
        if (obj.get('_id') === id) {
          finalObject = obj;
          return true;
        }
      });
    });
  });
  return finalObject;
}