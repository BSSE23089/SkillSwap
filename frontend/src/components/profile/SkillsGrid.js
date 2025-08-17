import React from 'react';
import SkillCard from './SkillCard';
import styles from './SkillsGrid.module.css';

const SkillsGrid = ({ skills, type }) => {
  return (
    <div className={styles.grid}>
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} type={type} />
      ))}
    </div>
  );
};

export default SkillsGrid;