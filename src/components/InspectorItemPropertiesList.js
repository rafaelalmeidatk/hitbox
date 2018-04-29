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
    dispatch: PropTypes.func,
    animations: PropTypes.object,
    selectedItemId: PropTypes.string,
    selectedAnimationIndex: PropTypes.number,
    selectedFrameIndex: PropTypes.number,
    selectedColliderIndex: PropTypes.number,
  };

  get inspectableObject() {
    const {animations, selectedItemId} = this.props;
    return getInspectableObjectById(animations, selectedItemId);
  }

  get getInspectorFields() {
    const inspectableObject = this.inspectableObject;
    return getInspectorEditableFields(inspectableObject);
  }

  handleOnChange = (e, currentValue, field) => {
    const props = {
      animationIndex: this.props.selectedAnimationIndex,
      frameIndex: this.props.selectedFrameIndex,
      colliderIndex: this.props.selectedColliderIndex,
    };
    const { item } = this.props;
    // edge case for checkboxes
    const inputValue = typeof currentValue === 'boolean' ? e.target.checked : e.target.value;
    const newValue = this.sanitizeValue(currentValue, inputValue);
    const updater = getUpdater(item);
    const action = updater(props, field, newValue);
    this.props.dispatch(action);
  }

  sanitizeValue = (currentValue, newValue) => {
    switch (typeof currentValue) {
      case 'string':
      case 'boolean':
        return newValue;
      case 'number':
        return parseInt(newValue);
    }
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
                  onChange={(e) => this.handleOnChange(e, item.get(field), field)}
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
    selectedAnimationIndex: state['selection'].get('selectedAnimationIndex'),
    selectedFrameIndex: state['selection'].get('selectedFrameIndex'),
    selectedColliderIndex: state['selection'].get('selectedColliderIndex'),
  };
}

export default connect(mapStateToProps)(InspectorItemPropertiesList);