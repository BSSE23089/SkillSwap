import React from 'react';
import { Users } from 'lucide-react';
import styles from './SkillsTabNavigation.module.css';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import Text from '../../UI/Text'; // Assuming you have a Text component for consistent styling
const SkillsTabNavigation = ({ activeTab, onTabChange, teachingCount, learningCount }) => {
  return (
    <Card className={styles.container}>
      <Button
        onClick={() => onTabChange('teaching')}
        className={`${styles.tab} ${
          activeTab === 'teaching' ? styles.tabActive : styles.tabInactive
        }`}
      >
        <Users className="w-4 h-4" />
        <Text>Teaching ({teachingCount})</Text>
      </Button>

      <Button
        onClick={() => onTabChange('learning')}
        className={`${styles.tab} ${
          activeTab === 'learning' ? styles.tabActive : styles.tabInactive
        }`}
      >
        <Users className="w-4 h-4" />
        <Text>Learning ({learningCount})</Text>
      </Button>
    </Card>
  );
};

export default SkillsTabNavigation;
