import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';
import { connect } from 'react-redux';

import { setSelectedColliderId } from '../ducks/selection';
import { setColliderRect } from '../ducks/objects';
import colors from '../colors';

class CollidersLayer extends React.Component {
  static propTypes = {
    frames: PropTypes.array,
    colliders: PropTypes.array,
    selectedFrameId: PropTypes.string,
    setSelectedColliderId: PropTypes.func,
    setColliderRect: PropTypes.func,
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

  handleColliderClick = colliderId => {
    this.props.setSelectedColliderId(colliderId);
  };

  handleColliderDrag = (colliderId, args) => {
    if (!args.target) return;
    const {
      attrs: { x, y, width, height },
    } = args.target;

    this.props.setColliderRect(colliderId, {
      x: Math.floor(x),
      y: Math.floor(y),
      width: Math.floor(width),
      height: Math.floor(height),
    });
  };

  render() {
    return (
      <Group ref={node => (this.collidersGroup = node)}>
        {this.colliders.map(collider => (
          <Rect
            key={collider.id}
            x={collider.rect.x}
            y={collider.rect.y}
            width={collider.rect.width}
            height={collider.rect.height}
            fill={colors.colliderRect}
            draggable={true}
            onClick={() => this.handleColliderClick(collider.id)}
            onDragStart={args => this.handleColliderDrag(collider.id, args)}
            onDragMove={args => this.handleColliderDrag(collider.id, args)}
            onDragEnd={args => this.handleColliderDrag(collider.id, args)}
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
