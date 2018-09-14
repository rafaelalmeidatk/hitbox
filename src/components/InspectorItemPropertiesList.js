import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InspectorItemPropertyInput from './InspectorItemPropertyInput';
import { getInspectorEditableFields, getUpdater } from '../inspector';

class InspectorItemPropertiesList extends Component {
  static propTypes = {
    item: PropTypes.object,
    dispatch: PropTypes.func,
  };

  get inspectorFields() {
    const { item } = this.props;
    return getInspectorEditableFields(item);
  }

  handleChange = (e, field) => {
    const { item, dispatch } = this.props;
    const newValue = e.target.value;
    const updater = getUpdater(item);
    const action = updater({ id: item.id }, field, newValue);
    dispatch(action);
  };

  render() {
    const { item } = this.props;
    return (
      <ul className="properties-list">
        {this.inspectorFields.map(field => (
          <li key={field.fieldKey} className="property-entry">
            <div className="label">{field.displayName}</div>
            <InspectorItemPropertyInput
              property={item[field.fieldKey]}
              onChange={e => this.handleChange(e, field.fieldKey)}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default connect()(InspectorItemPropertiesList);