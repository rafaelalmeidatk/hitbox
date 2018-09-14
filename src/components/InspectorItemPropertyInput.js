import React from 'react';
import PropTypes from 'prop-types';

export default class InspectorItemPropertyInput extends React.Component {
  static propTypes = {
    property: PropTypes.any,
    onChange: PropTypes.func,
  };

  textInput = value => {
    const { onChange } = this.props;
    return (
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    );
  };

  numberInput = value => {
    const { onChange } = this.props;
    return (
      <input
        type="number"
        value={value}
        onChange={e => onChange(parseInt(e.target.value))}
      />
    );
  };

  booleanInput = value => {
    const { onChange } = this.props;
    return (
      <input
        type="checkbox"
        checked={value}
        onChange={e => onChange(e.target.checked)}
      />
    );
  };

  inputForProperty = property => {
    const type = typeof property;
    switch (type) {
      case 'string':
        return this.textInput(property);
      case 'number':
        return this.numberInput(property);
      case 'boolean':
        return this.booleanInput(property);
      default:
        return property.toString();
    }
  };

  render() {
    const { property } = this.props;
    return this.inputForProperty(property);
  }
}
