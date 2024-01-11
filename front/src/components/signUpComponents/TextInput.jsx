// TextInput.js
import React from "react";

const TextInput = ({ id, name, label, type, placeholder, value, onChange }) => (
  <div className="form-group-container">
    <div className="form-group">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        className="input"
        type={type}
        id={id}
        name={name}
        required
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

export default TextInput;
