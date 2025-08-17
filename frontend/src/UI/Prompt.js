import React from "react";
import PropTypes from "prop-types";
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

Prompt.propTypes = {
  type: PropTypes.oneOf(["success", "error", "info"]),
  message: PropTypes.string,
  onClose: PropTypes.func,
};

export default Prompt;
