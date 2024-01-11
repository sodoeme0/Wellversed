// CheckboxInput.js
import React from "react";

const CheckboxInput = ({ id, name, label, checked, onChange }) => (
  <div className="form-group-container">
    <label className="checkbox-label">
      <input
        className="box"
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  </div>
);

export default CheckboxInput;
