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
  };

  get inspectableObject() {
    const {animations, selectedItemId} = this.props;
    return getInspectableObjectById(animations, selectedItemId);
  }

  get getInspectorFields() {
    const inspectableObject = this.inspectableObject;
    return getInspectorEditableFields(inspectableObject);
  }

  handleOnChange = (e, field) => {
    const {item, selectedAnimationIndex} = this.props;
    const newValue = e.target.value;
    const updater = getUpdater(item);
    const action = updater(selectedAnimationIndex, field, newValue);
    this.props.dispatch(action);

    console.log(`animation: `, this.props.dispatch);


    //console.log('updater', field);
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
                  onChange={(e) => this.handleOnChange(e, field)}
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
  };
}

export default connect(mapStateToProps)(InspectorItemPropertiesList);