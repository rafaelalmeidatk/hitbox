import { fromJS } from 'immutable';

import reducer, {
  newCollider,
  setColliderName,
  setColliderType,
  setColliderRect,
} from '../ducks';

describe('colliders reducer', () => {
  it('handles NEW_COLLIDER', () => {
    const state = fromJS({
      animations: [{
        _id: 0,
        name: 'Hey!',
        frames: [{
          sourceRect: {
            x: 0,
            y: 0,
            width: 32,
            height: 32,
          },
          colliders: [],
          offset: {
            x: 0,
            y: 0,
          },
        }],
        delay: 0,
        repeat: false,
      }]
    });
    const animationIndex = 0;
    const frameIndex = 0;
    const action = newCollider(animationIndex, frameIndex);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({
      animations: [{
        _id: 0,
        name: 'Hey!',
        frames: [{
          sourceRect: {
            x: 0,
            y: 0,
            width: 32,
            height: 32,
          },
          colliders: [{
            _id: 0,
            name: 'New Collider',
            type: 'NONE',
            rect: {
              x: 0,
              y: 0,
              width: 32,
              height: 32, 
            }
          }],
          offset: {
            x: 0,
            y: 0,
          },
        }],
        delay: 0,
        repeat: false,
      }]
    }));
  });

  it('handles SET_COLLIDER_NAME', () => {
    const state = fromJS({
      animations: [{
        _id: 0,
        name: 'Hey!',
        frames: [{
          sourceRect: {
            x: 0,
            y: 0,
            width: 32,
            height: 32,
          },
          colliders: [{
            _id: 0,
            name: 'New Collider',
            type: 'NONE',
            rect: {
              x: 0,
              y: 0,
              width: 32,
              height: 32, 
            }
          }],
          offset: {
            x: 0,
            y: 0,
          },
        }],
        delay: 0,
        repeat: false,
      }]
    });
    const animationIndex = 0;
    const frameIndex = 0;
    const colliderIndex = 0;
    const colliderName = 'New Collider Name';
    const action = setColliderName(animationIndex, frameIndex, colliderIndex, colliderName);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({
      animations: [{
        _id: 0,
        name: 'Hey!',
        frames: [{
          sourceRect: {
            x: 0,
            y: 0,
            width: 32,
            height: 32,
          },
          colliders: [{
            _id: 0,
            name: 'New Collider Name',
            type: 'NONE',
            rect: {
              x: 0,
              y: 0,
              width: 32,
              height: 32, 
            }
          }],
          offset: {
            x: 0,
            y: 0,
          },
        }],
        delay: 0,
        repeat: false,
      }]
    }));
  });

  it('handles SET_COLLIDER_TYPE', () => {
    const state = fromJS({
      animations: [{
        _id: 0,
        name: 'Hey!',
        frames: [{
          sourceRect: {
            x: 0,
            y: 0,
            width: 32,
            height: 32,
          },
          colliders: [{
            _id: 0,
            name: 'New Collider',
            type: 'NONE',
            rect: {
              x: 0,
              y: 0,
              width: 32,
              height: 32, 
            }
          }],
          offset: {
            x: 0,
            y: 0,
          },
        }],
        delay: 0,
        repeat: false,
      }]
    });
    const animationIndex = 0;
    const frameIndex = 0;
    const colliderIndex = 0;
    const colliderType = 'HITBOX';
    const action = setColliderType(animationIndex, frameIndex, colliderIndex, colliderType);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({
      animations: [{
        _id: 0,
        name: 'Hey!',
        frames: [{
          sourceRect: {
            x: 0,
            y: 0,
            width: 32,
            height: 32,
          },
          colliders: [{
            _id: 0,
            name: 'New Collider',
            type: 'HITBOX',
            rect: {
              x: 0,
              y: 0,
              width: 32,
              height: 32, 
            }
          }],
          offset: {
            x: 0,
            y: 0,
          },
        }],
        delay: 0,
        repeat: false,
      }]
    }));
  });

  it('handles SET_COLLIDER_RECT', () => {
    const state = fromJS({
      animations: [{
        _id: 0,
        name: 'Hey!',
        frames: [{
          sourceRect: {
            x: 0,
            y: 0,
            width: 32,
            height: 32,
          },
          colliders: [{
            _id: 0,
            name: 'New Collider',
            type: 'NONE',
            rect: {
              x: 0,
              y: 0,
              width: 32,
              height: 32, 
            }
          }],
          offset: {
            x: 0,
            y: 0,
          },
        }],
        delay: 0,
        repeat: false,
      }]
    });
    const animationIndex = 0;
    const frameIndex = 0;
    const colliderIndex = 0;
    const colliderRect = {
      x: 32,
      y: 32,
      width: 64,
      height: 64,
    };
    const action = setColliderRect(animationIndex, frameIndex, colliderIndex, colliderRect);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({
      animations: [{
        _id: 0,
        name: 'Hey!',
        frames: [{
          sourceRect: {
            x: 0,
            y: 0,
            width: 32,
            height: 32,
          },
          colliders: [{
            _id: 0,
            name: 'New Collider',
            type: 'NONE',
            rect: {
              x: 32,
              y: 32,
              width: 64,
              height: 64, 
            }
          }],
          offset: {
            x: 0,
            y: 0,
          },
        }],
        delay: 0,
        repeat: false,
      }]
    }));
  });
});