import React from "react";
import styles from "./FormPageBackground.module.css";
import {Typewriter} from "react-simple-typewriter";

const FormPageBackground = ({ 
  children, 
  phrases = [
  "Share Knowledge",
  "Teach Skills",
  "Learn Together",
  "Collaborate Freely",
  "Grow Faster",
  "Empower Others",
  "Inspire Change",
  "Exchange Expertise",
  "Build Connections",
  "Unlock Potential",
  "Elevate Each Other",
  "Create Opportunities",
  "Strengthen Communities",
  "Swap Skills",
  "Learn by Doing",
  "Mutual Growth",
  "Teach & Thrive",
  "Knowledge for All",
  "Skills Without Limits",
  "Connect. Learn. Grow."
]
}) => (
  <div className={styles.authBg}>
    <div className={styles.leftContent}>
      <h1 className={styles.heading}>
        Learn Skills,<br />
        <span className={styles.highlight}>
          <Typewriter
            words={phrases}   // ✅ pass array here
            loop={true}       // keeps looping forever
            cursor
            cursorStyle="|"
            typeSpeed={70}    // typing speed
            deleteSpeed={50}  // backspace speed
            delaySpeed={1500} // pause before next word
          />
        </span>
      </h1>
      <p className={styles.description}>
        Join SkillSwap - the platform where learning meets collaboration. Exchange your expertise, discover new skills, and grow together with a community of passionate learners.
      </p>
    </div>
    <div className={styles.rightContent}>
      {children}
    </div>
  </div>
);

export default FormPageBackground;
