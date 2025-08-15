import React from "react";
import styles from "./MainNavbar.module.css";
import ThemeToggle from "./ThemeToggle";

const MainNavbar = ({ theme, onToggleTheme }) => (
  <nav className={styles.navbar}>
    <div className={styles.left}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>SS</span>
        <span className={styles.logoText}>SkillSwap</span>
      </div>
      <ul className={styles.navLinks}>
        <li><a href="/dashboard/discover">Discover</a></li>
        <li><a href="/dashboard/postSkill">+ Post Skill</a></li>
        <li><a href="/dashboard/mySkills">My Skills</a></li>
      </ul>
    </div>
    <div className={styles.right}>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      <a href="/login" className={styles.loginBtn}>Login</a>
      <a href="/signup" className={styles.signupBtn}>Sign Up</a>
    </div>
  </nav>
);

export default MainNavbar;
