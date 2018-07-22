import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImageUploadButton from './ImageUploadButton';
import { setSelectedFrameId, setSelectedItemId } from '../ducks/selection';
import { newFrame } from '../ducks/objects';

import Window from './Window';
import WindowItemsList from './WindowItemsList';

class FramesWindow extends React.Component {
  static propTypes = {
    animations: PropTypes.object,
    frames: PropTypes.object,
    selectedAnimationId: PropTypes.string,
    selectedFrameId: PropTypes.string,
    setSelectedFrameId: PropTypes.func,
    newFrame: PropTypes.func,

    // Deprecated
    onImageChange: PropTypes.func,
  };

  get frames() {
    const { animations, selectedAnimationId, frames } = this.props;
    if (!animations || !selectedAnimationId) return [];
    const currentFrames = animations
      .find(anim => anim.get('id') === selectedAnimationId)
      .get('frames')
      .map(frameId => frames.find(frame => frame.get('id') === frameId));

    return (currentFrames && currentFrames.valueSeq().toArray()) || [];
  }

  get canCreateNewFrame() {
    return !!this.props.selectedAnimationId;
  }

  handleOnItemClick = id => {
    const { setSelectedFrameId } = this.props;
    setSelectedFrameId(id);
  };

  createNewFrame = () => {
    const { selectedAnimationId, newFrame } = this.props;
    newFrame(selectedAnimationId);
  };

  render() {
    const { selectedFrameId } = this.props;
    return (
      <Window
        title="Frames"
        titleActionButton={this.createNewFrame}
        titleActionButtonEnabled={this.canCreateNewFrame}
      >
        <WindowItemsList
          items={this.frames}
          selectedId={selectedFrameId}
          onItemClick={id => this.handleOnItemClick(id)}
        />

        {/* <ImageUploadButton onChange={this.props.onImageChange} /> */}
      </Window>
    );
  }
}

function mapStateToProps(state) {
  return {
    animations: state['objects'].get('animations'),
    frames: state['objects'].get('frames'),
    selectedAnimationId: state['selection'].get('selectedAnimationId'),
    selectedFrameId: state['selection'].get('selectedFrameId'),
  };
}

const mapDispatchToProps = {
  setSelectedFrameId,
  setSelectedItemId,
  newFrame,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FramesWindow);
