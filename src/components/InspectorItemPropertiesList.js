import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getInspectableObjectById} from '../inspector';
import InspectorItemPropertyInput from './InspectorItemPropertyInput';
import './InspectorItemPropertiesList.style.css';

export class InspectorItemPropertiesList extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    animations: PropTypes.object,
    selectedItemId: PropTypes.string,
  };

  get inspectableObject() {
    const {animations, selectedItemId} = this.props;
    return getInspectableObjectById(animations, selectedItemId);
  }

  render() {
    const {item} = this.props;
    const inspectableObject = this.inspectableObject;

    return (
      <ul className="properties-list">
        {
          inspectableObject.fields.map((field) => (
            <li key={field} className="property-entry">
              <div className="label">{field}</div>
              <div className="property">
                <InspectorItemPropertyInput property={item.get(field)} />
              </div>
            </li>
          ))
        }
      </ul>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(InspectorItemPropertiesList);