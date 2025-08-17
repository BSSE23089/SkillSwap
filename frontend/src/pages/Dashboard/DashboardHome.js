import React from "react";
import styles from "./DashboardHome.module.css";
import HeroSection from "../../components/Dashboard/HeroSection";
import StatsSection from "../../components/Dashboard/StatsSection";

const DashboardHome = () => {
  return (
    <div className={styles.dashboardBg}>
      <HeroSection />
      <StatsSection />
    </div>
  );
};

export default DashboardHome;
