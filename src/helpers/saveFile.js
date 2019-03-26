// This function receives the save json, validates
// and updates it if necessary (from lower versions)
export function parseSaveFile(json) {
  if (!json.hitboxVersion) {
    throw new Error('INCOMPATIBLE_FILE');
  }

  return json;
}

// This function gets the save json and normalizes
// the objects to individual lists
export function createObjectsList(json) {
  const animations = [];
  const frames = [];
  const colliders = [];

  json.animations.forEach(animation => {
    const animFrames = [];
    animation.frames.forEach(frame => {
      const frameColliders = [];
      frame.colliders.forEach(collider => {
        colliders.push({
          ...collider,
        });
        frameColliders.push(collider.id);
      });

      frames.push({
        ...frame,
        colliders: frameColliders,
      });

      animFrames.push(frame.id);
    });

    animations.push({
      ...animation,
      frames: animFrames,
    });
  });

  return { animations, frames, colliders };
}

// This function filters the object fields
// to only write the ones specified on the _meta
export function formatObjectToSave(object) {
  const fields = object._meta.saveFields;
  return fields.reduce((outObject, field) => {
    outObject[field] = object[field];
    return outObject;
  }, {});
}
