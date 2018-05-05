import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';
import { connect } from 'react-redux';

import { setSelectedFrameIndex, setSelectedItemId } from '../ducks/selection';
import { getFrames } from '../core';
import colors from '../colors';

class FramesGroup extends React.Component {
  static propTypes = {
    animations: PropTypes.object,
    selectedAnimationIndex: PropTypes.number,
    setSelectedItemId: PropTypes.func,
  };

  handleFrameClick = (frameId) => {
    this.props.setSelectedItemId(frameId);
  }

  render() {
    const { animations, selectedAnimationIndex } = this.props;
    var frames = getFrames(animations, selectedAnimationIndex);
    return (
      <Group ref={node => this.framesGroup = node}>
        {
          frames.map((frame) => (
            <Rect
              key={frame._id}
              x={frame.sourceRect.x}
              y={frame.sourceRect.y}
              width={frame.sourceRect.width}
              height={frame.sourceRect.height}
              fill={colors.frameRect}
              draggable={true}
              onClick={() => this.handleFrameClick(frame._id)}
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
  };
}

const mapDispatchToProps = {
  setSelectedFrameIndex,
  setSelectedItemId,
};

export default connect(mapStateToProps, mapDispatchToProps)(FramesGroup);