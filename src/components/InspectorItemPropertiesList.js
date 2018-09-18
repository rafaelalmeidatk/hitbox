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

  handleChange = (newValue, field, data) => {
    const { item, dispatch } = this.props;

    const property = item[field];
    const props = {
      id: item.id,
      property,
      data,
    };

    const updater = getUpdater(item);
    const action = updater(props, field, newValue);
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
              onChange={(value, data) =>
                this.handleChange(value, field.fieldKey, data)
              }
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default connect()(InspectorItemPropertiesList);
