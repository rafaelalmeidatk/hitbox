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
    scale: PropTypes.number,
    selectedAnimationIndex: PropTypes.number,
    selectedFrameIndex: PropTypes.number,

    setSelectedItemId: PropTypes.func,
    setSelectedColliderIndex: PropTypes.func,
    setColliderRect: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      dragAbsoluteX: null,
      dragAbsoluteY: null,
    };
  }

  handleColliderClick = (colliderId, colliderIndex) => {
    this.props.setSelectedItemId(colliderId);
    this.props.setSelectedColliderIndex(colliderIndex);
  }

  handleColliderMouseDown = (args) => {
    const { attrs: { x, y } } = args.target;
    this.setState({
      dragAbsoluteX: x,
      dragAbsoluteY: y,
    });
  }

  handleColliderDrag = (colliderIndex, colliderRect, args) => {
    if (!args.target) return;
    const { selectedAnimationIndex, selectedFrameIndex } = this.props;
    const { attrs: { x, y, width, height } } = args.target;

    console.log('l', this.props.scale);

    const newX = x - this.state.dragAbsoluteX;// * this.props.scale;
    const newY = y - this.state.dragAbsoluteY;// * this.props.scale;

    this.setState({
      dragAbsoluteX: x,
      dragAbsoluteY: y,
    });
    this.props.setColliderRect(selectedAnimationIndex, selectedFrameIndex, colliderIndex, {
      x: colliderRect.x + Math.floor(newX),
      y: colliderRect.y + Math.floor(newY),
      width: Math.floor(width),
      height: Math.floor(height),
    });
  }

  calculateColliderX = (colliderRect) => {
    const { selectedAnimationIndex, selectedFrameIndex } = this.props;
    const frame = this.props.animations.getIn([selectedAnimationIndex, 'frames', selectedFrameIndex]);
    const sourceRect = frame.get('sourceRect');
    return sourceRect.get('x') + (sourceRect.get('width') - colliderRect.width) / 2 + colliderRect.x;
  }

  calculateColliderY = (colliderRect) => {
    const { selectedAnimationIndex, selectedFrameIndex } = this.props;
    const frame = this.props.animations.getIn([selectedAnimationIndex, 'frames', selectedFrameIndex]);
    const sourceRect = frame.get('sourceRect');
    return sourceRect.get('y') + (sourceRect.get('height') - colliderRect.height) / 2 + colliderRect.y;
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
              x={this.calculateColliderX(collider.rect)}
              y={this.calculateColliderY(collider.rect)}
              width={collider.rect.width}
              height={collider.rect.height}
              fill={colors.colliderRect}
              draggable={true}
              dragDistance={0}
              onClick={() => this.handleColliderClick(collider._id, index)}
              onMouseDown={(args) => this.handleColliderMouseDown(args)}
              onDragMove={(args) => this.handleColliderDrag(index, collider.rect, args)}   
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