import React from "react";

const FormGroup = ({ label, id, name, type, placeholder, value, onChange, required }) => {
  return (
    <div className="form-group">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="input"
      />
    </div>
  );
};

export default FormGroup;
