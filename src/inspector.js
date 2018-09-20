import {fromJS} from 'immutable';

// Types
export const ANIMATION_TYPE = 'inspector/ANIMATION';
export const FRAME_TYPE = 'inspector/FRAME';
export const COLLIDER_TYPE = 'inspector/COLLIDER';

// Functions
export function getInspectableObjectById(animations, id) {
  let inspectableObject = null;
  animations.find((obj) => {
    if (obj.get('_id') === id) {
      inspectableObject = obj;
      return true;
    }
    var frames = obj.get('frames');
    if (!frames) return false;
    frames.find((obj) => {
      if (obj.get('_id') === id) {
        inspectableObject = obj;
        return true;
      }
      var colliders = obj.get('colliders');
      if (!colliders) return false;
      colliders.find((obj) => {
        if (obj.get('_id') === id) {
          inspectableObject = obj;
          return true;
        }
      });
    });
  });
  return inspectableObject;
}

export function getInspectorEditableFields(inspectableObject) {
  const inspector = inspectableObject._inspector;
  return inspector.editableFields || [];
}

export function getUpdater(inspectableObject) {
  const inspector = inspectableObject._inspector;
  return inspector.updater || [];
}

export function extractFieldsByType(inspectableObject) {
  const type = inspectableObject.get('type');
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

export function findObjectById(objects, id) {
  return objects.find(object => (
    object && object.id === id
  ));
}