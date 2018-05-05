import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Group, Rect } from 'react-konva';
import { connect } from 'react-redux';
import Konva from 'konva';

import { getFrames } from '../core';
import colors from '../colors';

class FramesGroup extends React.Component {
  static propTypes = {
    animations: PropTypes.object,
    selectedAnimationIndex: PropTypes.number,
  };

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

export default connect(mapStateToProps)(FramesGroup);