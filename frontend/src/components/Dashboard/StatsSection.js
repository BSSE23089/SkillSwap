import React, { useEffect, useState } from "react";
import styles from "./StatsSection.module.css"; 
import { Users, BookOpen, MessageCircle } from "lucide-react";

const StatsSection = () => {
  const [stats, setStats] = useState({ users: 0, skills: 0, connections: 0 });

  useEffect(() => {
    fetch("http://localhost:5000/api/stats") // backend endpoint
      .then(res => res.json())
      .then(data => {
        setStats({
          users: data.totalUsers || 0,
          skills: data.totalSkills || 0,
          connections: data.totalConnections || 0,
        });
      })
      .catch(() => {
        // fallback values
        setStats({ users: 500, skills: 1200, connections: 800 });
      });
  }, []);

  return (
    <div className={styles.statsRow}>
      <div className={styles.statBox}>
        <div className={styles.statIcon}><Users size={24} /></div>
        <div className={styles.statValue}>{stats.users}+</div>
        <div className={styles.statLabel}>Active Users</div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statIcon}><BookOpen size={24} /></div>
        <div className={styles.statValue}>{stats.skills}+</div>
        <div className={styles.statLabel}>Skills Shared</div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statIcon}><MessageCircle size={24} /></div>
        <div className={styles.statValue}>{stats.connections}+</div>
        <div className={styles.statLabel}>Connections</div>
      </div>
    </div>
  );
};

export default StatsSection;
