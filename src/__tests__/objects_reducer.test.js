import { List } from 'immutable';
import reducer, { newAnimation, newFrame, newCollider } from '../ducks/objects';

describe('objects', () => {
  test('newAnimation', () => {
    const state = reducer();
    const action = newAnimation();
    const nextState = reducer(state, action);
    expect(nextState.get('animations').count()).toBe(1);
  });

  test('newFrame', () => {
    const state = reducer(undefined, newAnimation());
    const animationId = state.get('animations').getIn([0, '_id']);
    const action = newFrame(animationId);
    const nextState = reducer(state, action);
    expect(nextState.get('frames').count()).toBe(1);
    const frame = nextState.get('frames').first();
    expect(frame.get('_id')).toBeTruthy();
    expect(nextState.getIn(['animations', 0, 'frames', 0])).toBe(frame.get('_id'));
  });

  test('newCollider', () => {
    let state = reducer(undefined, newAnimation());
    state = reducer(state, newFrame(state.get('animations').getIn([0, '_id'])));

    const frameId = state.get('frames').getIn([0, '_id']);
    const action = newCollider(frameId);
    const nextState = reducer(state, action);
    expect(nextState.get('colliders').count()).toBe(1);
    const collider = nextState.get('colliders').first();
    expect(collider.get('_id')).toBeTruthy();
    expect(nextState.getIn(['frames', 0, 'colliders', 0])).toBe(collider.get('_id'));
  });
});
