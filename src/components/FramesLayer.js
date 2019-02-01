import React from 'react';
import PropTypes from 'prop-types';
import { Group, Line, Rect } from 'react-konva';
import { connect } from 'react-redux';

import { setSelectedFrameId } from '../ducks/selection';
import { setFrameSourceRect } from '../ducks/objects';
import colors from '../colors';
import { OBJ_STROKE_WIDTH, OBJ_HALF_STROKE_WIDTH } from '../helpers/constants';

class FramesLayer extends React.Component {
  static propTypes = {
    animations: PropTypes.array,
    frames: PropTypes.array,
    selectedAnimationId: PropTypes.string,
    setSelectedFrameId: PropTypes.func,
    setFrameSourceRect: PropTypes.func,

    framesVisible: PropTypes.bool,
  };

  get frames() {
    const { animations, selectedAnimationId, frames } = this.props;
    if (!animations || !selectedAnimationId) return [];
    const animation = animations.find(anim => anim.id === selectedAnimationId);
    if (!animation) return [];

    const currentFrames = animation.frames.map(frameId =>
      frames.find(frame => frame.id === frameId)
    );

    return currentFrames || [];
  }

  handleFrameClick = frameId => {
    this.props.setSelectedFrameId(frameId);
  };

  handleFrameDrag = (frameId, args) => {
    if (!args.target) return;
    const {
      attrs: { x, y, width, height },
    } = args.target;

    this.props.setFrameSourceRect(frameId, {
      x: Math.floor(x),
      y: Math.floor(y),
      width: Math.floor(width),
      height: Math.floor(height),
    });
  };

  render() {
    const { framesVisible } = this.props;
    return (
      <Group ref={node => (this.framesGroup = node)}>
        {framesVisible &&
          this.frames.map(frame => (
            <Group key={frame.id}>
              <Line
                x={frame.sourceRect.x}
                y={frame.sourceRect.y}
                points={[
                  OBJ_HALF_STROKE_WIDTH,
                  OBJ_HALF_STROKE_WIDTH,
                  frame.sourceRect.width - OBJ_HALF_STROKE_WIDTH,
                  OBJ_HALF_STROKE_WIDTH,
                  frame.sourceRect.width - OBJ_HALF_STROKE_WIDTH,
                  frame.sourceRect.height - OBJ_HALF_STROKE_WIDTH,
                  OBJ_HALF_STROKE_WIDTH,
                  frame.sourceRect.height - OBJ_HALF_STROKE_WIDTH,
                ]}
                stroke={colors.frameRectStroke}
                strokeWidth={OBJ_STROKE_WIDTH}
                closed
              />
              <Rect
                x={frame.sourceRect.x}
                y={frame.sourceRect.y}
                width={frame.sourceRect.width}
                height={frame.sourceRect.height}
                fill={colors.frameRect}
                draggable={true}
                onClick={() => this.handleFrameClick(frame.id)}
                onDragStart={args => this.handleFrameDrag(frame.id, args)}
                onDragMove={args => this.handleFrameDrag(frame.id, args)}
                onDragEnd={args => this.handleFrameDrag(frame.id, args)}
              />
            </Group>
          ))}
      </Group>
    );
  }
}

function mapStateToProps(state) {
  return {
    animations: state['objects'].animations,
    frames: state['objects'].frames,
    selectedAnimationId: state['selection'].selectedAnimationId,
    framesVisible: state['ui'].framesVisible,
  };
}

const mapDispatchToProps = {
  setSelectedFrameId,
  setFrameSourceRect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FramesLayer);
