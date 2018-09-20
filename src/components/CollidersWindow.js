import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSelectedColliderId, setSelectedItemId } from '../ducks/selection';
import { newCollider } from '../ducks/objects';
import { showColliders, hideColliders } from '../ducks/ui';

import Window from './Window';
import WindowItemsList from './WindowItemsList';
import WindowToolsRow from './WindowToolsRow';

class CollidersWindow extends React.Component {
  static propTypes = {
    frames: PropTypes.array,
    colliders: PropTypes.array,
    selectedFrameId: PropTypes.string,
    selectedColliderId: PropTypes.string,
    setSelectedColliderId: PropTypes.func,
    newCollider: PropTypes.func,
    collidersVisible: PropTypes.bool,
    showColliders: PropTypes.func,
    hideColliders: PropTypes.func,
  };

  get colliders() {
    const { frames, selectedFrameId, colliders } = this.props;
    if (!colliders || !selectedFrameId) return [];
    const currentColliders = frames
      .find(frame => frame.id === selectedFrameId)
      .colliders.map(colliderId =>
        colliders.find(collider => collider.id === colliderId)
      );

    return currentColliders || [];
  }

  get canCreateNewCollider() {
    return !!this.props.selectedFrameId;
  }

  handleOnItemClick = id => {
    const { setSelectedColliderId } = this.props;
    setSelectedColliderId(id);
  };

  createNewCollider = () => {
    const { selectedFrameId, newCollider } = this.props;
    newCollider(selectedFrameId);
  };

  render() {
    const {
      selectedColliderId,
      collidersVisible,
      showColliders,
      hideColliders,
    } = this.props;
    return (
      <Window
        title="Colliders"
        titleActionButton={this.createNewCollider}
        titleActionButtonEnabled={this.canCreateNewCollider}
      >
        <WindowToolsRow
          visibility={true}
          visibilityValue={collidersVisible}
          onClick={() => (collidersVisible ? hideColliders() : showColliders())}
        />
        <WindowItemsList
          items={this.colliders}
          selectedId={selectedColliderId}
          onItemClick={id => this.handleOnItemClick(id)}
        />
      </Window>
    );
  }
}

function mapStateToProps(state) {
  return {
    frames: state['objects'].frames,
    colliders: state['objects'].colliders,
    selectedFrameId: state['selection'].selectedFrameId,
    selectedColliderId: state['selection'].selectedColliderId,
    collidersVisible: state['ui'].collidersVisible,
  };
}

const mapDispatchToProps = {
  setSelectedColliderId,
  setSelectedItemId,
  newCollider,
  showColliders,
  hideColliders,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollidersWindow);
