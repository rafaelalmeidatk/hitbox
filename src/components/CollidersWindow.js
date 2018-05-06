import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setSelectedColliderIndex, setSelectedItemId} from '../ducks/selection';
import {newCollider} from '../ducks/animation';
import {showColliders, hideColliders} from '../ducks/ui';

import Window from './Window';
import WindowItemList from './WindowItemList';
import WindowToolsRow from './WindowToolsRow';

export class CollidersWindow extends React.Component {
  static propTypes = {
    animations: PropTypes.object,
    selectedAnimationIndex: PropTypes.number,
    selectedFrameIndex: PropTypes.number,
    selectedColliderIndex: PropTypes.number,
    setSelectedColliderIndex: PropTypes.func,
    setSelectedItemId: PropTypes.func,
    newCollider: PropTypes.func,
    collidersVisible: PropTypes.bool,
    showColliders: PropTypes.func,
    hideColliders: PropTypes.func,
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

  colliderByIndex = (index) => {
    const {animations, selectedAnimationIndex, selectedFrameIndex} = this.props;
    return animations.getIn([
      selectedAnimationIndex,
      'frames',
      selectedFrameIndex,
      'colliders',
      index,
    ]);
  }

  createNewCollider = () => {
    const {selectedAnimationIndex, selectedFrameIndex} = this.props;
    if (selectedAnimationIndex >= 0 && selectedFrameIndex >= 0) {
      this.props.newCollider(selectedAnimationIndex, selectedFrameIndex);
    }
  }

  handleOnItemClick = (index) => {
    const {setSelectedColliderIndex, setSelectedItemId} = this.props;
    var collider = this.colliderByIndex(index);
    setSelectedColliderIndex(index);
    setSelectedItemId(collider.get('_id'));
  }

  render() {
    const { 
      selectedColliderIndex,
      collidersVisible,
      showColliders,
      hideColliders,
    } = this.props;
    return (
      <Window
        title="Colliders"
        titleButtonAction={this.createNewCollider}
      >
        <WindowToolsRow
          visibility={true}
          visibilityValue={collidersVisible}
          onClick={() => collidersVisible ?  hideColliders() : showColliders()}
        />
        <WindowItemList
          items={this.colliders}
          selectedIndex={selectedColliderIndex}
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
    selectedColliderIndex: state['selection'].get('selectedColliderIndex'),
    collidersVisible: state['ui'].get('collidersVisible'),
  };
}

const mapDispatchToProps = {
  setSelectedColliderIndex,
  setSelectedItemId,
  newCollider,
  showColliders,
  hideColliders,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollidersWindow);
