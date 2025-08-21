import React from "react";
import styles from "./Text.module.css";

const Text = ({ children, className = "" }) => {
  return (
    <span className={`${styles.text} ${className}`}>
      {children}
    </span>
  );
};

export default Text;
