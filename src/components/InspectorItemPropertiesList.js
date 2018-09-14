import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InspectorItemPropertyInput from './InspectorItemPropertyInput';
import { getInspectorEditableFields, getUpdater } from '../inspector';

export default class InspectorItemPropertiesList extends Component {
  static propTypes = {
    item: PropTypes.object,
  };

  get inspectorFields() {
    const { item } = this.props;
    return getInspectorEditableFields(item);
  }

  handleChange = (e) => {
    const { item } = this.props;
    const updater = getUpdater(item);
    console.log('update', updater);
  }

  render() {
    const { item } = this.props;
    return (
      <ul className="properties-list">
        {this.inspectorFields.map(field => (
          <li key={field.fieldKey} className="property-entry">
            <div className="label">{field.displayName}</div>
            <InspectorItemPropertyInput
              property={item[field.fieldKey]}
              onChange={this.handleChange}
            />
          </li>
        ))}
      </ul>
    );
  }
}
