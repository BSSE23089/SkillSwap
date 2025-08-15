import React from "react";
import styles from "./FormPageBackground.module.css";

const FormPageBackground = ({ children }) => (
  <div className={styles.authBg}>
    <div className={styles.leftContent}>
      <h1 className={styles.heading}>
        Learn Skills,<br />
        <span className={styles.highlight}>Share Knowledge</span>
      </h1>
      <p className={styles.description}>
        Join SkillSwap - the platform where learning meets collaboration. Exchange your expertise, discover new skills, and grow together with a community of passionate learners.
      </p>
      {/* <div className={styles.buttonRow}>
        <button className={styles.getStarted}>Get Started</button>
        <button className={styles.learnMore}>Learn More</button>
      </div> */}
    </div>
    <div className={styles.rightContent}>
      {children}
    </div>
  </div>
);

export default FormPageBackground;
