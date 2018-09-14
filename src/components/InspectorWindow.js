import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Window from './Window';
import InspectorItemPropertiesList from './InspectorItemPropertiesList';
import { findObjectById } from '../inspector';

class InspectorWindow extends React.Component {
  static propTypes = {
    objects: PropTypes.array,
    selectedItemId: PropTypes.string,
  };

  get selectedItem() {
    const { objects, selectedItemId } = this.props;
    return findObjectById(objects, selectedItemId);
  }

  render() {
    const item = this.selectedItem;
    return (
      <Window title="Inspector">
        {!item && <div>No item available to inspect</div>}
        {item && <InspectorItemPropertiesList item={item} />}
      </Window>
    );
  }
}

function mapStateToProps(state) {
  const {
    objects: { animations, colliders, frames },
    selection: { selectedItemId },
  } = state;
  return {
    objects: [...animations, ...colliders, ...frames],
    selectedItemId,
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InspectorWindow);
