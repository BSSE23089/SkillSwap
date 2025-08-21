import React from "react";
import SkillForm from "../../components/PostSkill/SkillForm";
import Wrapper from "../../UI/Wrapper";
import styles from "./PostSkill.module.css";
import Text from "../../UI/Text";
const PostSkill = () => {
  return (
    <Wrapper className={styles.container}>
      <Text className={styles.heading}>
        Share Your <span className={styles.highlight}>Skills</span>
      </Text>
      <Text className={styles.subtext}>
        Connect with others by sharing what you can teach or what you'd like to learn
      </Text>
      <div className={styles.content}>
        <SkillForm roles={["learner",'teacher']} />
      </div>
    </Wrapper>
  );
};

export default PostSkill;
