import React from "react";
import ReactDOM from "react-dom";
import styles from "./Overlay.module.css";
import { X } from "lucide-react";

const Overlay = ({ isOpen, onClose, title, children, className }) => {
  if (!isOpen) {return null;}

  return ReactDOM.createPortal(
    <>
      {/* Dark overlay background */}
      <div className={styles.overlayBackdrop} onClick={onClose}></div>

      {/* Overlay Panel */}
      <div className={`${styles.overlayPanel} ${className || ""}`}>
        {/* Conditional header if title is provided */}
        {title && (
          <div className={styles.overlayHeader}>
            <h2 className={styles.overlayTitle}>{title}</h2>
            <button className={styles.closeBtn} onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        )}

        {/* Content area */}
        <div className={styles.overlayContent}>{children}</div>
      </div>
    </>,
    document.getElementById("overlay-root")
  );
};

export default Overlay;
