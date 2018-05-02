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

  handleOnChange = (newValue, field, data) => {
    const {
      item,
      selectedAnimationIndex,
      selectedFrameIndex,
      selectedColliderIndex,
    } = this.props;
    const property = item.get(field);

    const props = {
      animationIndex: selectedAnimationIndex,
      frameIndex: selectedFrameIndex,
      colliderIndex: selectedColliderIndex,
      property,
      data,
    };
    const updater = getUpdater(item);
    const action = updater(props, field, newValue);
    this.props.dispatch(action);
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
                  onChange={(value, data) => {
                    this.handleOnChange(value, field, data)
                  }}
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