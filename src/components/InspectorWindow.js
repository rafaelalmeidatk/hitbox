import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setSelectedColliderIndex} from '../ducks/selection';
import {newCollider} from '../ducks/animation';
import {findObjectById} from '../inspector';

import Window from './Window';
import InspectorItemPropertiesList from './InspectorItemPropertiesList';

export class InspectorWindow extends React.Component {
  static propTypes = {
    animations: PropTypes.object,
    selectedItemId: PropTypes.string,
    setSelectedColliderIndex: PropTypes.func,
    newCollider: PropTypes.func,
  };

  get selectedItem() {
    const {animations, selectedItemId} = this.props;
    return findObjectById(animations, selectedItemId);
  }

  render() {
    const item = this.selectedItem;
    return (
      <Window title="Inspector">
        {
          !item &&
          <div>
            No item available to inspect
          </div>
        }
        {
          item &&
          <InspectorItemPropertiesList item={item} />
        }
      </Window>
    );
  }
}

function mapStateToProps(state) {
  return {
    animations: state['animation'].get('animations'),
    selectedItemId: state['selection'].get('selectedItemId'),
  };
}

const mapDispatchToProps = {
  setSelectedColliderIndex,
  newCollider,
};

export default connect(mapStateToProps, mapDispatchToProps)(InspectorWindow);
