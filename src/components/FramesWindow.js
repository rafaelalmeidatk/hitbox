import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Hotkey, Hotkeys, HotkeysTarget } from '@blueprintjs/core';
import { setSelectedFrameId, setSelectedItemId } from '../ducks/selection';
import { newFrame, deleteFrame } from '../ducks/objects';
import { showFrames, hideFrames } from '../ducks/ui';

import Window from './Window';
import WindowItemsList from './WindowItemsList';
import WindowToolsRow from './WindowToolsRow';

class FramesWindow extends React.Component {
  static propTypes = {
    animations: PropTypes.array,
    frames: PropTypes.array,
    selectedAnimationId: PropTypes.string,
    selectedFrameId: PropTypes.string,
    setSelectedFrameId: PropTypes.func,
    newFrame: PropTypes.func,
    deleteFrame: PropTypes.func,
    framesVisible: PropTypes.bool,
    showFrames: PropTypes.func,
    hideFrames: PropTypes.func,
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

  get canCreateNewFrame() {
    return !!this.props.selectedAnimationId;
  }

  handleOnItemClick = id => {
    const { setSelectedFrameId } = this.props;
    setSelectedFrameId(id);
  };

  handleOnItemDeleteClick = id => {
    const { selectedFrameId, deleteFrame, setSelectedFrameId } = this.props;
    deleteFrame(id);

    if (id === selectedFrameId) setSelectedFrameId(undefined);
  };

  createNewFrame = () => {
    const { selectedAnimationId, newFrame } = this.props;
    newFrame(selectedAnimationId);
  };

  renderHotkeys() {
    return (
      <Hotkeys>
        <Hotkey
          global={true}
          combo="ctrl + shift + f"
          label="Create new frame"
          onKeyDown={() => this.canCreateNewFrame && this.createNewFrame()}
        />
      </Hotkeys>
    );
  }

  render() {
    const {
      selectedFrameId,
      framesVisible,
      showFrames,
      hideFrames,
    } = this.props;
    return (
      <Window
        title="Frames"
        titleActionButton={this.createNewFrame}
        titleActionButtonEnabled={this.canCreateNewFrame}
      >
        <WindowToolsRow
          visibility={true}
          visibilityValue={framesVisible}
          onClick={() => (framesVisible ? hideFrames() : showFrames())}
        />
        <WindowItemsList
          items={this.frames}
          selectedId={selectedFrameId}
          onItemClick={id => this.handleOnItemClick(id)}
          onItemDeleteClick={id => this.handleOnItemDeleteClick(id)}
        />
      </Window>
    );
  }
}

const FramesWindowWithHotkeys = HotkeysTarget(FramesWindow);

function mapStateToProps(state) {
  return {
    animations: state['objects'].animations,
    frames: state['objects'].frames,
    selectedAnimationId: state['selection'].selectedAnimationId,
    selectedFrameId: state['selection'].selectedFrameId,
    framesVisible: state['ui'].framesVisible,
  };
}

const mapDispatchToProps = {
  setSelectedFrameId,
  setSelectedItemId,
  newFrame,
  deleteFrame,
  showFrames,
  hideFrames,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FramesWindowWithHotkeys);
