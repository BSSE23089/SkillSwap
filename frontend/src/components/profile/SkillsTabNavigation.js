import React from 'react';
import { Users } from 'lucide-react';
import styles from './SkillsTabNavigation.module.css';

const SkillsTabNavigation = ({ activeTab, onTabChange, teachingCount, learningCount }) => {
  return (
    <div className={styles.container}>
      <button
        onClick={() => onTabChange('teaching')}
        className={`${styles.tab} ${
          activeTab === 'teaching' ? styles.tabActive : styles.tabInactive
        }`}
      >
        <Users className="w-4 h-4" />
        <span>Teaching ({teachingCount})</span>
      </button>
      <button
        onClick={() => onTabChange('learning')}
        className={`${styles.tab} ${
          activeTab === 'learning' ? styles.tabActive : styles.tabInactive
        }`}
      >
        <Users className="w-4 h-4" />
        <span>Learning ({learningCount})</span>
      </button>
    </div>
  );
};

export default SkillsTabNavigation;