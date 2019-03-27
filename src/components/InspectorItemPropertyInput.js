import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  InputGroup,
  NumericInput,
  Checkbox,
} from '@blueprintjs/core';

export default class InspectorItemPropertyInput extends React.Component {
  static propTypes = {
    property: PropTypes.any,
    onChange: PropTypes.func,
  };

  textInput = (value, data) => {
    const { onChange } = this.props;
    return (
      <FormGroup>
        <InputGroup
          fill
          value={value}
          onChange={e => onChange(e.target.value, data)}
        />
      </FormGroup>
    );
  };

  numberInput = (value, data) => {
    const { onChange } = this.props;
    return (
      <FormGroup>
        <NumericInput
          fill
          value={value}
          onValueChange={value => !isNaN(value) && onChange(value, data)}
        />
      </FormGroup>
    );
  };

  booleanInput = (value, data) => {
    const { onChange } = this.props;
    return (
      <Checkbox
        type="checkbox"
        checked={value}
        onChange={e => onChange(e.target.checked, data)}
      />
    );
  };

  selectInput = (value, options) => {
    const { onChange } = this.props;
    return (
      <FormGroup className="bp3-select">
        <select value={value} onChange={e => onChange(e.target.value)}>
          {options.map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </FormGroup>
    );
  };

  objectInput = object => {
    const keys = Object.keys(object);

    return (
      <ul className="innerObject">
        {keys.map(key => (
          <li key={key}>
            <div className="label">{key}</div>
            <div className="property">
              {this.inputForInnerProperty(object[key], key)}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  inputForProperty = (property, field) => {
    const type = typeof property;
    if (type === 'string' && field.selection) {
      return this.selectInput(property, field.selection);
    }

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
  };

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
  };

  render() {
    const { property, field } = this.props;
    return this.inputForProperty(property, field);
  }
}
