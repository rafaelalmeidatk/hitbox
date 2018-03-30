import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setSelectedFrameIndex} from '../ducks/selection';

import Window from './Window';
import WindowItemList from './WindowItemList';

export class CollidersWindow extends React.Component {
  static propTypes = {
    animations: PropTypes.object,
    selectedAnimationIndex: PropTypes.number,
    selectedFrameIndex: PropTypes.number,
    setSelectedFrameIndex: PropTypes.func,
  };

  get colliders() {
    const {animations, selectedAnimationIndex, selectedFrameIndex} = this.props;
    if (animations && selectedAnimationIndex >= 0 && selectedFrameIndex >= 0) {
      var animation = animations.get(selectedAnimationIndex);
      var frames = animation.get('frames');
      if (frames.size > 0) {
        var frame = frames.get(selectedFrameIndex);
        return frame.get('colliders');
      }
    }
    return [];
  }

  render() {
    const { selectedFrameIndex, setSelectedFrameIndex } = this.props;
    return (
      <Window title="Colliders">
        <WindowItemList
          items={this.colliders}
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
    selectedColliderIndex: state['selection'].get('selectedColliderIndex'),
  };
}

const mapDispatchToProps = {
  setSelectedFrameIndex,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollidersWindow);
