import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HeroSection.module.css";
import { Typewriter } from "react-simple-typewriter";
import { useSelector } from "react-redux"; // ✅ Redux hook
import Prompt from "../../UI/Prompt";

const HeroSection = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // ✅ Get user from Redux
  const [prompt, setPrompt] = useState({ message: "", type: "info" });

  const phrases = [
    "Share knowledge, inspire others ",
    "Teach skills that change lives 📘",
    "Learn together, grow stronger ",
    "Collaborate freely, achieve more 🤝",
    "Empower others through teaching 💡",
    "Build connections that last forever 🔗",
    "Swap skills, unlock potential 🔓",
    "Grow faster, thrive together 🚀",
    "Inspire change, one lesson at a time 🌍",
  ];

  const handleLinkClick = (e) => {
    if (!user) {
      e.preventDefault();
      setPrompt({ message: "⚠️ Please log in first!", type: "error" });

      // Clear after 2s and navigate
      setTimeout(() => {
        setPrompt({ message: "", type: "info" });
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.announcement}>
        <span role="img" aria-label="rocket">🚀</span>{" "}
        Welcome to the future of skill sharing
      </div>

      <Prompt
        type={prompt.type}
        message={prompt.message}
        onClose={() => setPrompt({ message: "", type: "info" })}
      />

      <h1 className={styles.heroTitle}>
        <span className={styles.blue}>Learn, Teach,</span>
        <br />
        <span className={styles.black}>
          <Typewriter
            words={phrases}
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
        Connect with like-minded learners and teachers. Exchange your expertise
        and discover new passions in our vibrant community.
      </p>

      <div className={styles.heroButtons}>
        <Link
          to={user ? "/dashboard/discover" : "/login"}
          className={styles.startLearning}
          onClick={handleLinkClick}
        >
          Start Learning →
        </Link>

        <Link
          to={user ? "/dashboard/postSkill" : "/login"}
          className={styles.shareSkills}
          onClick={handleLinkClick}
        >
          Share Your Skills
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
