import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSelectedColliderId, setSelectedItemId } from '../ducks/selection';
import { newCollider } from '../ducks/objects';

import Window from './Window';
import WindowItemsList from './WindowItemsList';

class CollidersWindow extends React.Component {
  static propTypes = {
    frames: PropTypes.object,
    colliders: PropTypes.object,
    selectedFrameId: PropTypes.string,
    selectedColliderId: PropTypes.string,
    setSelectedColliderId: PropTypes.func,
    newCollider: PropTypes.func,

    // Deprecated
    onImageChange: PropTypes.func,
  };

  get colliders() {
    const { frames, selectedFrameId, colliders } = this.props;
    if (!colliders || !selectedFrameId) return [];
    const currentColliders = frames
      .find(frame => frame.get('id') === selectedFrameId)
      .get('colliders')
      .map(colliderId => colliders.find(collider => collider.get('id') === colliderId));

    return (currentColliders && currentColliders.valueSeq().toArray()) || [];
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
    const { selectedColliderId } = this.props;
    return (
      <Window
        title="Colliders"
        titleActionButton={this.createNewCollider}
        titleActionButtonEnabled={this.canCreateNewCollider}
      >
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
    frames: state['objects'].get('frames'),
    colliders: state['objects'].get('colliders'),
    selectedFrameId: state['selection'].get('selectedFrameId'),
    selectedColliderId: state['selection'].get('selectedColliderId'),
  };
}

const mapDispatchToProps = {
  setSelectedColliderId,
  setSelectedItemId,
  newCollider,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollidersWindow);
