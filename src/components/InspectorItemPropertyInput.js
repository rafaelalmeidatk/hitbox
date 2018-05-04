import React from 'react';
import PropTypes from 'prop-types';

export default class InspectorItemPropertyInput extends React.Component {
  static propTypes = {
    property: PropTypes.any,
    onChange: PropTypes.func,
  };

  textInput = (value, data) => {
    const {onChange} = this.props;
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value, data)}
      />
    );
  }

  numberInput = (value, data) => {
    const {onChange} = this.props;
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value), data)}
      />
    );
  }

  booleanInput = (value, data) => {
    const {onChange} = this.props;
    return (
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked, data)}
      />
    );
  }

  objectInput = (object) => {
    const [...keys] = object.keys();
    return (
      <ul className="innerObject">
        {
          keys.map(key => (
            <li key={key}>
              <div className="label">{key}</div>
              <div className="property">
                {this.inputForInnerProperty(object.get(key), key)}
              </div>
            </li>
          ))
        }
      </ul>
    );
  }

  inputForProperty = (property) => {
    const type = typeof property;
    switch (type) {
      case 'string':
        return this.textInput(property);
      case 'number':
        return this.numberInput(property);
      case 'boolean':
        return this.booleanInput(property);
      case 'object':
        return this.objectInput(property);
      default:
        return property.toString();
    }
  }

  inputForInnerProperty = (property, innerField) => {
    const data = { innerField };
    const type = typeof property;
    switch (type) {
      case 'string':
        return this.textInput(property, data);
      case 'number':
        return this.numberInput(property, data);
      case 'boolean':
        return this.booleanInput(property, data);
      default:
        return property.toString();
    }
  }

  render() {
    const {property} = this.props;
    return this.inputForProperty(property);
  }
}
