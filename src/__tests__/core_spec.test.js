import {List, Map, fromJS} from 'immutable';

import {
  setFilename,
  createAnimationsList,
  newAnimation,
  setAnimationName,
  setAnimationDelay,
  setAnimationRepeat,
  newFrame,
  setFrameSourceRect,
  setFrameOffset,
  newCollider,
} from '../core';

describe('application logic', () => {

  describe('setFilename', () => {
    it('it sets the filename to the state', () => {
      const state = Map();
      const filename = 'Spritesheet1';
      const nextState = setFilename(state, filename);
      expect(nextState).toEqual(Map({
        filename: filename
      }));
    });
  });

  describe('createAnimationsList', () => {
    it('it adds an empty list to the state', () => {
      const state = Map();
      const nextState = createAnimationsList(state);
      expect(nextState).toEqual(Map({
        animations: List()
      }));
    });
  });

  describe('newAnimation', () => {
    it('it adds a new animation with default name', () => {
      const state = Map();
      const animationName = "New Animation";
      const nextState = newAnimation(state, animationName);
      expect(nextState).toEqual(Map({
        animations: List.of(Map({
          name: animationName,
          frames: List.of(),
          delay: 0,
          repeat: false,
        }))
      }));
    });

    it('it preservers the other animations', () => {
      const state = fromJS({
        animations: [{
          name: 'Hey!',
          frames: [],
          delay: 0,
          repeat: false,
        }]
      });
      const animationName = "New Animation";
      const nextState = newAnimation(state, animationName);
      expect(nextState).toEqual(fromJS({
        animations: [{
          name: 'Hey!',
          frames: [],
          delay: 0,
          repeat: false,
        }, {
          name: animationName,
          frames: [],
          delay: 0,
          repeat: false,
        }]
      }));
    });
  });

  describe('setAnimationName', () => {
    it('it changes the animation name', () => {
      const state = fromJS({
        animations: [{
          name: 'New Animation',
          frames: [],
          delay: 0,
          repeat: false,
        }]
      });
      const animationIndex = 0;
      const newAnimationName = 'New Name';
      const nextState = setAnimationName(state, animationIndex, newAnimationName);
      expect(nextState).toEqual(fromJS({
        animations: [{
          name: 'New Name',
          frames: [],
          delay: 0,
          repeat: false,
        }]
      }));
    });
  });

  describe('setAnimationDelay', () => {
    it('it changes the animation delay', () => {
      const state = fromJS({
        animations: [{
          name: 'New Animation',
          frames: [],
          delay: 0,
          repeat: false,
        }]
      });
      const animationIndex = 0;
      const newAnimationDelay = 500;
      const nextState = setAnimationDelay(state, animationIndex, newAnimationDelay);
      expect(nextState).toEqual(fromJS({
        animations: [{
          name: 'New Animation',
          frames: [],
          delay: 500,
          repeat: false,
        }]
      }));
    });
  });

  describe('setAnimationRepeat', () => {
    it('it changes the animation repeat', () => {
      const state = fromJS({
        animations: [{
          name: 'New Animation',
          frames: [],
          delay: 0,
          repeat: false,
        }]
      });
      const animationIndex = 0;
      const newAnimationRepeat = true;
      const nextState = setAnimationRepeat(state, animationIndex, newAnimationRepeat);
      expect(nextState).toEqual(fromJS({
        animations: [{
          name: 'New Animation',
          frames: [],
          delay: 0,
          repeat: true,
        }]
      }));
    });
  });

  describe('newFrame', () => {
    it('it should add a new frame', () => {
      const state = fromJS({
        animations: [{
          name: 'Hey!',
          frames: [],
          delay: 0,
          repeat: false,
        }]
      });
      const animationIndex = 0;
      const nextState = newFrame(state, animationIndex);
      expect(nextState).toEqual(fromJS({
        animations: [{
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
      }));
    });

    it('it preservers the old frames', () => {
      const state = fromJS({
        animations: [{
          name: 'Hey!',
          frames: [{
            sourceRect: {
              x: 32,
              y: 32,
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
      const nextState = newFrame(state, animationIndex);
      expect(nextState).toEqual(fromJS({
        animations: [{
          name: 'Hey!',
          frames: [{
            sourceRect: {
              x: 32,
              y: 32,
              width: 32,
              height: 32,
            },
            colliders: [],
            offset: {
              x: 0,
              y: 0,
            },
          }, {
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
      }));
    });
  });

  describe('setFrameSourceRect', () => {
    it('it changes the source rectangle', () => {
      const state = fromJS({
        animations: [{
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
      const frameSourceRect = {
        x: 96,
        y: 96,
        width: 64,
        height: 64,
      };
      const nextState = setFrameSourceRect(state, animationIndex, frameIndex, frameSourceRect);
      expect(nextState).toEqual(fromJS({
        animations: [{
          name: 'Hey!',
          frames: [{
            sourceRect: {
              x: 96,
              y: 96,
              width: 64,
              height: 64,
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
      }));
    });
  });

  describe('setFrameOffset', () => {
    it('it changes the offset', () => {
      const state = fromJS({
        animations: [{
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
      const frameOffset = {
        x: 64,
        y: 32,
      };
      const nextState = setFrameOffset(state, animationIndex, frameIndex, frameOffset);
      expect(nextState).toEqual(fromJS({
        animations: [{
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
              x: 64,
              y: 32,
            },
          }],
          delay: 0,
          repeat: false,
        }]
      }));
    });
  });

  describe('newCollider', () => {
    it('it adds a new collider with default name and type', () => {
      const state = fromJS({
        animations: [{
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
      const nextState = newCollider(state, animationIndex, frameIndex);
      expect(nextState).toEqual(fromJS({
        animations: [{
          name: 'Hey!',
          frames: [{
            sourceRect: {
              x: 0,
              y: 0,
              width: 32,
              height: 32,
            },
            colliders: [{
              type: 'NONE',
              x: 0,
              y: 0,
              width: 32,
              height: 32,
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
});