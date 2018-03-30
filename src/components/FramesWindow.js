import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setSelectedFrameIndex} from '../ducks/selection';

import Window from './Window';
import WindowItemList from './WindowItemList';

export class FramesWindow extends React.Component {
  static propTypes = {
    animations: PropTypes.object,
    selectedAnimationIndex: PropTypes.number,
    selectedFrameIndex: PropTypes.number,
    setSelectedFrameIndex: PropTypes.func,
  };

  get frames() {
    const {animations, selectedAnimationIndex} = this.props;
    if (animations && selectedAnimationIndex >= 0) {
      var animation = animations.get(selectedAnimationIndex);
      var frames = animation.get('frames');
      return frames;
    }
    return [];
  }

  render() {
    const { selectedFrameIndex, setSelectedFrameIndex } = this.props;
    return (
      <Window title="Frames">
        <WindowItemList
          items={this.frames}
          itemName={(index, name) => `Frame ${index}`}
          selectedIndex={selectedFrameIndex}
          onItemClick={setSelectedFrameIndex}
        />
      </Window>
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
  setSelectedFrameIndex,
};

export default connect(mapStateToProps, mapDispatchToProps)(FramesWindow);
