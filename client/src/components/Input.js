import React from "react";

const Input = props => (
  <div className="form-group form-group-lg">
    <label>{props.label}</label>
    <input
      className="form-control"
      type="text"
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    />
  </div>
);

export default Input;
