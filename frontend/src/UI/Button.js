import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

const Button = ({ to, onClick, children, className ,variant }) => {
  const ClassName = `${styles.Button} ${styles[variant] || ""} ${className || ""}`;

  if (to) {
    return (
      <Link to={to} className={ClassName} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={ClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
