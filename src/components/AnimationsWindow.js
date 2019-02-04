import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Hotkey, Hotkeys, HotkeysTarget } from '@blueprintjs/core';
import { setSelectedAnimationId, setSelectedItemId } from '../ducks/selection';
import { newAnimation, deleteAnimation } from '../ducks/objects';

import Window from './Window';
import WindowItemsList from './WindowItemsList';

class AnimationsWindow extends React.Component {
  static propTypes = {
    animations: PropTypes.array,
    selectedAnimationId: PropTypes.string,
    setSelectedAnimationId: PropTypes.func,
    newAnimation: PropTypes.func,
    deleteAnimation: PropTypes.func,
    spritesheetPath: PropTypes.string,
  };

  get animations() {
    return this.props.animations || [];
  }

  get canCreateNewAnimation() {
    // It is only possible to add animations if the
    // spritesheet is loaded
    return !!this.props.spritesheetPath;
  }

  handleOnItemClick = id => {
    const { setSelectedAnimationId } = this.props;
    setSelectedAnimationId(id);
  };

  handleOnItemDeleteClick = id => {
    const {
      selectedAnimationId,
      deleteAnimation,
      setSelectedAnimationId,
    } = this.props;
    deleteAnimation(id);

    if (id === selectedAnimationId) setSelectedAnimationId(undefined);
  };

  renderHotkeys() {
    const { newAnimation } = this.props;

    return (
      <Hotkeys>
        <Hotkey
          global={true}
          combo="ctrl + shift + a"
          label="Create new animation"
          onKeyDown={() => this.canCreateNewAnimation && newAnimation()}
        />
      </Hotkeys>
    );
  }

  render() {
    const { selectedAnimationId, newAnimation } = this.props;

    return (
      <Window
        title="Animations"
        titleActionButton={newAnimation}
        titleActionButtonEnabled={this.canCreateNewAnimation}
      >
        <WindowItemsList
          items={this.animations}
          selectedId={selectedAnimationId}
          onItemClick={id => this.handleOnItemClick(id)}
          onItemDeleteClick={id => this.handleOnItemDeleteClick(id)}
        />
      </Window>
    );
  }
}

const AnimationsWindowWithHotkeys = HotkeysTarget(AnimationsWindow);

function mapStateToProps(state) {
  return {
    animations: state['objects'].animations,
    selectedAnimationId: state['selection'].selectedAnimationId,
    spritesheetPath: state['schema'].spritesheetPath,
  };
}

const mapDispatchToProps = {
  setSelectedAnimationId,
  setSelectedItemId,
  newAnimation,
  deleteAnimation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimationsWindowWithHotkeys);
