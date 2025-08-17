import React from "react";
import styles from "./Prompt.module.css";

const Prompt = ({ type = "info", message, onClose }) => {
  if (!message) {
    return null;
  }
  return (
    <div className={`${styles.prompt} ${styles[type]}`}>
      <span>{message}</span>
      {onClose && (
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
      )}
    </div>
  );
};


export default Prompt;
