import React from "react";
import { useSelector } from "react-redux"; // 👈 get data from store
import ProfileHeader from "../../components/profile/ProfileHeader";
import MySkills from "../../components/profile/MySkills";
import styles from "./ProfilePage.module.css";
import Wrapper from "../../UI/Wrapper"; 
const ProfilePage = () => {
  // 👇 grab user profile & skills from Redux
  const user = useSelector((state) => state.user.profile);
  const teachingSkills = useSelector((state) => state.user.teachingSkills || []);
  const learningSkills = useSelector((state) => state.user.learningSkills || []);

  if (!user) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  return (
    <Wrapper className={styles.container}>
      <div className={styles.content}>
        <ProfileHeader user={user} />
        <MySkills
          teachingSkills={teachingSkills}
          learningSkills={learningSkills}
        />
      </div>
    </Wrapper>
  );
};

export default ProfilePage;
