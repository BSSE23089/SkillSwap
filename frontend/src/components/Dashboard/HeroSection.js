import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HeroSection.module.css";
import {Typewriter} from "react-simple-typewriter";

const HeroSection = () => {
  const navigate = useNavigate();
  const phrases=[
    "Share knowledge, inspire others ",
    "Teach skills that change lives 📘",
    "Learn together, grow stronger ",
    "Collaborate freely, achieve more 🤝",
    "Empower others through teaching 💡",
    "Build connections that last forever 🔗",
    "Swap skills, unlock potential 🔓",
    "Grow faster, thrive together 🚀",
    "Inspire change, one lesson at a time 🌍"
  ];
  return (
    <div className={styles.heroWrapper}>
      <div className={styles.announcement}>
        <span role="img" aria-label="rocket">🚀</span> Welcome to the future of skill sharing
      </div>
      <h1 className={styles.heroTitle}>
        <span className={styles.blue}>Learn, Teach,</span><br />
        <span className={styles.black}>
          <Typewriter
            words= {phrases}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={90}
            deleteSpeed={80}
            delaySpeed={1500}
          />
        </span>
      </h1>
      <p className={styles.heroDesc}>
        Connect with like-minded learners and teachers. Exchange your expertise and discover new passions in our vibrant community.
      </p>
      <div className={styles.heroButtons}>
        <button 
          className={styles.startLearning} 
          onClick={() => navigate("/discover")}
        >
          Start Learning →
        </button>
        <button 
          className={styles.shareSkills} 
          onClick={() => navigate("/postSkill")}
        >
          Share Your Skills
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
