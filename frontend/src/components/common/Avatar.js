import React from "react";
import styles from "./Avatar.module.css";

const Avatar = ({ url, name = "", size = 96 , className}) => {
  // Function to extract initials from name
  const getInitials = (fullName) => {
    if (!fullName) {return "?";}
    const words = fullName.trim().split(" ");
    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }
    return (
      words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase()
    );
  };

  const initials = getInitials(name);

  return (
    <div
      className={`${styles.avatar} ${className || ""}`}
      style={{ width: size, height: size, fontSize: size / 3 }}
    >
      {url && url.trim() !== "" ? (
        <img
          src={url}
          alt={name || "User avatar"}
          className={styles.image}
          style={{ width: size, height: size }}
        />
      ) : (
        <div className={styles.initials}>{initials}</div>
      )}
    </div>
  );
};

export default Avatar;
