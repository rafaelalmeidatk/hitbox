import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';
import { connect } from 'react-redux';

import { setSelectedColliderId } from '../ducks/selection';
import { setColliderRect } from '../ducks/objects';
import { localPositionToCanvas } from '../helpers/colliders';
import colors from '../colors';

class CollidersLayer extends React.Component {
  static propTypes = {
    frames: PropTypes.array,
    colliders: PropTypes.array,
    selectedFrameId: PropTypes.string,
    setSelectedColliderId: PropTypes.func,
    setColliderRect: PropTypes.func,

    collidersVisible: PropTypes.bool,
  };

  initialDragData = {
    mousePosition: { x: 0, y: 0 },
    colliderPosition: { x: 0, y: 0 },
  };

  get colliders() {
    const { frames, selectedFrameId, colliders } = this.props;
    if (!colliders || !selectedFrameId) return [];
    const currentColliders = frames
      .find(frame => frame.id === selectedFrameId)
      .colliders.map(colliderId =>
        colliders.find(collider => collider.id === colliderId)
      );

    return currentColliders || [];
  }

  get frame() {
    const { selectedFrameId, frames } = this.props;
    return frames.find(frame => frame.id === selectedFrameId);
  }

  handleColliderClick = colliderId => {
    this.props.setSelectedColliderId(colliderId);
  };

  handleColliderMouseDown = (collider, args) => {
    const { x, y } = args.target.attrs;
    this.initialDragData = {
      mousePosition: { x, y },
      colliderPosition: { x: collider.rect.x, y: collider.rect.y },
    };
  };

  handleColliderDrag = (collider, args) => {
    if (!args.target) return;
    const { x, y, width, height } = args.target.attrs;

    const deltaX = x - this.initialDragData.mousePosition.x;
    const deltaY = y - this.initialDragData.mousePosition.y;

    this.props.setColliderRect(collider.id, {
      x: this.initialDragData.colliderPosition.x + Math.floor(deltaX),
      y: this.initialDragData.colliderPosition.y + Math.floor(deltaY),
      width: Math.floor(width),
      height: Math.floor(height),
    });
  };

  calculateColliderX = collider => {
    return localPositionToCanvas(
      collider.rect,
      collider.origin,
      this.frame.sourceRect
    ).x;
  };

  calculateColliderY = collider => {
    return localPositionToCanvas(
      collider.rect,
      collider.origin,
      this.frame.sourceRect
    ).y;
  };

  render() {
    const { collidersVisible } = this.props;
    return (
      <Group ref={node => (this.collidersGroup = node)}>
        {collidersVisible &&
          this.colliders.map(collider => (
            <Rect
              key={collider.id}
              x={this.calculateColliderX(collider)}
              y={this.calculateColliderY(collider)}
              width={collider.rect.width}
              height={collider.rect.height}
              fill={colors.colliderRect}
              draggable={true}
              dragDistance={0}
              onClick={() => this.handleColliderClick(collider.id)}
              onMouseDown={args => this.handleColliderMouseDown(collider, args)}
              onDragMove={args => this.handleColliderDrag(collider, args)}
            />
          ))}
      </Group>
    );
  }
}

function mapStateToProps(state) {
  return {
    frames: state['objects'].frames,
    colliders: state['objects'].colliders,
    selectedFrameId: state['selection'].selectedFrameId,
    collidersVisible: state['ui'].collidersVisible,
  };
}

const mapDispatchToProps = {
  setSelectedColliderId,
  setColliderRect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollidersLayer);
