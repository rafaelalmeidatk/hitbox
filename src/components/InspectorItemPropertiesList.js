import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  getInspectableObjectById,
  getInspectorEditableFields,
  getUpdater,
} from '../inspector';
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

  get getInspectorFields() {
    const inspectableObject = this.inspectableObject;
    return getInspectorEditableFields(inspectableObject);
  }

  handleOnChange = (e) => {
    const {item} = this.props;
    const updater = getUpdater(item);
    //console.log('update', property);
    console.log('on change', e, e.target.value);
  }

  render() {
    const {item} = this.props;
    const inspectableObject = this.inspectableObject;

    return (
      <ul className="properties-list">
        {
          this.getInspectorFields.map((field) => (
            <li key={field} className="property-entry">
              <div className="label">{field}</div>
              <div className="property">
                <InspectorItemPropertyInput 
                  property={item.get(field)}
                  onChange={this.handleOnChange}
                />
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