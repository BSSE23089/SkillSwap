import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

const PasswordInput = ({
  name = "password",
  value,
  onChange,
  onBlur,
  placeholder = "Password",
  wrapperClass = "",
  inputClass = "",
  iconClass = "",
  toggleButtonClass = "",
  showLeftIcon = true
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <div className={wrapperClass}>
      {showLeftIcon && <Lock className={iconClass} size={20} />}
      <input
        type={isVisible ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={inputClass}
        autoComplete="current-password"
      />
      <button
        type="button"
        onClick={handleToggleVisibility}
        aria-label={isVisible ? "Hide password" : "Show password"}
        className={toggleButtonClass}
        style={{
          background: "transparent",
          border: 0,
          padding: 0,
          marginLeft: 8,
          cursor: "pointer",
          display: "flex",
          alignItems: "center"
        }}
      >
        {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
    </div>
  );
};

export default PasswordInput;


