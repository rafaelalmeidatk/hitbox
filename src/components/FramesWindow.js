import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setSelectedFrameIndex, setSelectedItemId} from '../ducks/selection';
import {newFrame} from '../ducks/animation';

import Window from './Window';
import WindowItemList from './WindowItemList';

export class FramesWindow extends React.Component {
  static propTypes = {
    animations: PropTypes.object,
    selectedAnimationIndex: PropTypes.number,
    selectedFrameIndex: PropTypes.number,
    setSelectedFrameIndex: PropTypes.func,
    setSelectedItemId: PropTypes.func,
    newFrame: PropTypes.func,
  };

  get frames() {
    const {animations, selectedAnimationIndex} = this.props;
    if (animations && selectedAnimationIndex >= 0) {
      var animation = animations.get(selectedAnimationIndex);
      return animation.get('frames');
    }
    return [];
  }

  frameByIndex = (index) => {
    const {animations, selectedAnimationIndex} = this.props;
    return animations.getIn([
      selectedAnimationIndex,
      'frames',
      index,
    ]);
  }

  createNewFrame = () => {
    const {selectedAnimationIndex} = this.props;
    if (selectedAnimationIndex >= 0) {
      this.props.newFrame(selectedAnimationIndex);
    }
  }

  handleOnItemClick = (index) => {
    const {setSelectedFrameIndex, setSelectedItemId} = this.props;
    var frame = this.frameByIndex(index);
    setSelectedFrameIndex(index);
    setSelectedItemId(frame.get('_id'));
  }

  render() {
    const {
      selectedFrameIndex,
    } = this.props;
    return (
      <Window
        title="Frames"
        titleButtonAction={this.createNewFrame}
      >
        <WindowItemList
          items={this.frames}
          itemName={(index, name) => `Frame ${index}`}
          selectedIndex={selectedFrameIndex}
          onItemClick={(index) => this.handleOnItemClick(index)}
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
  setSelectedItemId,
  newFrame,
};

export default connect(mapStateToProps, mapDispatchToProps)(FramesWindow);
