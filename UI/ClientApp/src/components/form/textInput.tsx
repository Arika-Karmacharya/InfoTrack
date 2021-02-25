import React from "react";
import PropTypes from "prop-types";
import {otherInputInterface} from 'ts/interfaces/formInterface'

const TextInput = (props:otherInputInterface): JSX.Element => {
  const {
    name,
    type,
    value,
    autoFocus,
    disabled,
    placeholder,
    minValue,
    maxValue,
  } = props;

  const handleChange = (event) => {
    const { name, value } = event.target;
    props.onChange && props.onChange(name, value);
  };

  const handleKeyUp = (event) => {
    const { name, value } = event.target;
    props.onKeyUp && props.onKeyUp(event);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    props.onBlur && props.onBlur(name, value);
  };
  const handleFocus = (event) =>{
    if (type === 'number'){
      event.target.select();
    }
  }
  return (
    <input
      className="genericForm-group__input"
      placeholder={placeholder}
      value={value}
      type={type}
      name={name}
      min={minValue}
      max={maxValue}
      autoFocus={autoFocus}
      disabled={disabled}
      onKeyUp={handleKeyUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
};

TextInput.defaultProps = {
  name: "",
  type: "text",
  autoFocus: false,
  placeholder: "",
};

export default TextInput;
