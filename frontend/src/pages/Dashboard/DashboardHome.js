import React from "react";
import HeroSection from "../../components/Dashboard/HeroSection";
import StatsSection from "../../components/Dashboard/StatsSection";
import Wrapper from "../../UI/Wrapper"; 
const DashboardHome = () => {
  return (
    <Wrapper>
      <HeroSection />
      <StatsSection />
    </Wrapper>
  );
};

export default DashboardHome;
