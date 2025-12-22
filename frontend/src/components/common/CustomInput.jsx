import React from "react";
import "./CustomInput.css";

export default function CustomInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled = false,
  placeholder = "",
  children // for select or custom elements
}) {
  return (
    <div className={`custom-input-row ${disabled ? "disabled" : ""}`}>
      <label className="ci-label" htmlFor={name}>{label}</label>
      {children ? (
        React.cloneElement(children, {
          className: `ci-field ${children.props.className || ""}`,
          id: name,
          name,
          value,
          onChange,
          disabled,
        })
      ) : (
        <input
          className="ci-field"
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
