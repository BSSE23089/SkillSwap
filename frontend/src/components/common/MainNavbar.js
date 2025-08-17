// MainNavbar.jsx
import styles from "./MainNavbar.module.css";
import ThemeToggle from "./ThemeToggle";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const MainNavbar = ({ theme, onToggleTheme }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login"); 
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to='/dashboard' className={styles.logoIcon}>SS</Link>
          <Link to='/dashboard' className={styles.logoText}>SkillSwap</Link>
        </div>
        {user ? (
          <ul className={styles.navLinks}>
            <li><Link to="/dashboard/discover">Discover</Link></li>
            <li><Link to="/dashboard/postSkill">+ Post Skill</Link></li>
            <li><Link to="/dashboard/mySkills">My Skills</Link></li>
          </ul>
        ):(null)}
      </div>

      <div className={styles.right}>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        {user ? (
          <button onClick={handleLogout} className={styles.loginBtn}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className={styles.loginBtn}>Login</Link>
            <Link to="/" className={styles.signupBtn}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default MainNavbar;
