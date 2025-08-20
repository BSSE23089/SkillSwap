import React from "react";
import styles from "./Wrapper.module.css"; // Import the CSS module

const Wrapper = ({ children, className }) => {
  return (
    <div className={`${styles.wrapper} ${className || ""}`}>
      {children}
    </div>
  );
};

export default Wrapper;
