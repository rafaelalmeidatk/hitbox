import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';
import { connect } from 'react-redux';

import { setSelectedFrameIndex, setSelectedItemId } from '../ducks/selection';
import { setFrameSourceRect } from '../ducks/animation';
import { getFrames } from '../core';
import colors from '../colors';

class FramesGroup extends React.Component {
  static propTypes = {
    animations: PropTypes.object,
    selectedAnimationIndex: PropTypes.number,
    setSelectedItemId: PropTypes.func,
    setSelectedFrameIndex: PropTypes.func,
    setFrameSourceRect: PropTypes.func,
    framesVisible: PropTypes.bool,
  };

  handleFrameClick = (frameId, frameIndex) => {
    this.props.setSelectedItemId(frameId);
    this.props.setSelectedFrameIndex(frameIndex);
  }

  handleFrameDrag = (frameIndex, args) => {
    if (!args.target) return;
    const { selectedAnimationIndex } = this.props;
    const { attrs: { x, y, width, height } } = args.target;

    this.props.setFrameSourceRect(selectedAnimationIndex, frameIndex, {
      x: Math.floor(x),
      y: Math.floor(y),
      width: Math.floor(width),
      height: Math.floor(height),
    });
  }

  render() {
    const { framesVisible, animations, selectedAnimationIndex } = this.props;
    var frames = getFrames(animations, selectedAnimationIndex);
    return (
      <Group ref={node => this.framesGroup = node}>
        {
          framesVisible &&
          frames.map((frame, index) => (
            <Rect
              key={frame._id}
              x={frame.sourceRect.x}
              y={frame.sourceRect.y}
              width={frame.sourceRect.width}
              height={frame.sourceRect.height}
              fill={colors.frameRect}
              draggable={true}
              onClick={() => this.handleFrameClick(frame._id, index)}
              onDragStart={(args) => this.handleFrameDrag(index, args)}
              onDragMove={(args) => this.handleFrameDrag(index, args)}
              onDragEnd={(args) => this.handleFrameDrag(index, args)}
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
    framesVisible: state['ui'].get('framesVisible'),
  };
}

const mapDispatchToProps = {
  setSelectedFrameIndex,
  setSelectedItemId,
  setFrameSourceRect,
};

export default connect(mapStateToProps, mapDispatchToProps)(FramesGroup);