import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';
import { connect } from 'react-redux';

import { setSelectedColliderIndex, setSelectedItemId } from '../ducks/selection';
import { setColliderRect } from '../ducks/animation';
import { getColliders } from '../core';
import colors from '../colors';

class CollidersGroup extends React.Component {
  static propTypes = {
    animations: PropTypes.object,
    selectedAnimationIndex: PropTypes.number,
    selectedFrameIndex: PropTypes.number,

    setSelectedItemId: PropTypes.func,
    setSelectedColliderIndex: PropTypes.func,
    setColliderRect: PropTypes.func,
  };

  handleColliderClick = (colliderId, colliderIndex) => {
    this.props.setSelectedItemId(colliderId);
    this.props.setSelectedColliderIndex(colliderIndex);
  }

  handleColliderDrag = (colliderIndex, args) => {
    if (!args.target) return;
    const { selectedAnimationIndex, selectedFrameIndex } = this.props;
    const { attrs: { x, y, width, height } } = args.target;

    this.props.setColliderRect(selectedAnimationIndex, selectedFrameIndex, colliderIndex, {
      x: Math.floor(x),
      y: Math.floor(y),
      width: Math.floor(width),
      height: Math.floor(height),
    });
  }

  render() {
    const { animations, selectedAnimationIndex, selectedFrameIndex } = this.props;
    var colliders = getColliders(animations, selectedAnimationIndex, selectedFrameIndex);
    return (
      <Group ref={node => this.collidersGroup = node}>
        {
          colliders.map((collider, index) => (
            <Rect
              key={collider._id}
              x={collider.rect.x}
              y={collider.rect.y}
              width={collider.rect.width}
              height={collider.rect.height}
              fill={colors.colliderRect}
              draggable={true}
              onClick={() => this.handleColliderClick(collider._id, index)}
              onDragStart={(args) => this.handleColliderDrag(index, args)}
              onDragMove={(args) => this.handleColliderDrag(index, args)}
              onDragEnd={(args) => this.handleColliderDrag(index, args)}
            />
          ))
        }
      </Group>
    );
  }
}

function mapStateToProps(state) {
  return {
    animations: state['animation'].get('animations'),
    selectedAnimationIndex: state['selection'].get('selectedAnimationIndex'),
    selectedFrameIndex: state['selection'].get('selectedFrameIndex'),
  };
}

const mapDispatchToProps = {
  setSelectedColliderIndex,
  setSelectedItemId,
  setColliderRect,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollidersGroup);