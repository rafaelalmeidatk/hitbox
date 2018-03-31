import React from 'react';
import PropTypes from 'prop-types';

export default class InspectorItemPropertyInput extends React.Component {
  static propTypes = {
    property: PropTypes.any,
  };

  textInput = (value) => {
    return <input type="text" value={value} />;
  }

  numberInput = (value) => {
    return <input type="number" value={value} />;
  }

  booleanInput = (value) => {
    return <input type="checkbox" checked={value} />;
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
      default:
        return property.toString();
    }
  }

  render() {
    const {property} = this.props;
    const input = this.inputForProperty(property);
    return (
      <div>{input}</div>
    );
  }
}
