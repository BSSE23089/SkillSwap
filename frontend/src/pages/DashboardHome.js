import React, { useEffect, useState } from "react";
import styles from "./DashboardHome.module.css";
import { useNavigate } from "react-router-dom";
import { Users, BookOpen, MessageCircle } from "lucide-react";

const DashboardHome = () => {
  const [stats, setStats] = useState({ users: 0, skills: 0, connections: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch stats from backend (placeholder for now)
    fetch("/api/dashboard/stats")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => setStats({ users: 500, skills: 1200, connections: 800 }));
  }, []);

  return (
    <div className={styles.dashboardBg}>
      <div className={styles.heroWrapper}>
        <div className={styles.announcement}>
          <span role="img" aria-label="rocket">🚀</span> Welcome to the future of skill sharing
        </div>
        <h1 className={styles.heroTitle}>
          <span className={styles.blue}>Learn, Teach,</span><br />
          <span className={styles.black}>Swap Skills!</span>
        </h1>
        <p className={styles.heroDesc}>
          Connect with like-minded learners and teachers. Exchange your expertise and discover new passions in our vibrant community.
        </p>
        <div className={styles.heroButtons}>
          <button className={styles.startLearning} onClick={() => navigate("/discover")}>Start Learning →</button>
          <button className={styles.shareSkills} onClick={() => navigate("/postSkill")}>Share Your Skills</button>
        </div>
        <div className={styles.statsRow}>
          <div className={styles.statBox}>
            <div className={styles.statIcon}>
              <Users size={24} />
            </div>
            <div className={styles.statValue}>{stats.users}+</div>
            <div className={styles.statLabel}>Active Users</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statIcon}>
              <BookOpen size={24} />
            </div>
            <div className={styles.statValue}>{stats.skills}+</div>
            <div className={styles.statLabel}>Skills Shared</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statIcon}>
              <MessageCircle size={24} />
            </div>
            <div className={styles.statValue}>{stats.connections}+</div>
            <div className={styles.statLabel}>Connections</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
