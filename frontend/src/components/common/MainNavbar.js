
import styles from "./MainNavbar.module.css";
import ThemeToggle from "./ThemeToggle";
import {Link} from "react-router-dom";
const MainNavbar = ({ theme, onToggleTheme }) => (
  <nav className={styles.navbar}>
    <div className={styles.left}>
      <div className={styles.logo}>
        <Link to='/dashboard' className={styles.logoIcon}>SS</Link>
        <Link to='/dashboard' className={styles.logoText}>SkillSwap</Link>
      </div>
      <ul className={styles.navLinks}>
        <li><Link to="/dashboard/discover">Discover</Link></li>
        <li><Link to="/dashboard/postSkill">+ Post Skill</Link></li>
        <li><Link to="/dashboard/mySkills">My Skills</Link></li>
      </ul>
    </div>
    <div className={styles.right}>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      <Link to="/login" className={styles.loginBtn}>Login</Link>
      <Link to="/" className={styles.signupBtn}>Sign Up</Link>
    </div>
  </nav>
);

export default MainNavbar;
