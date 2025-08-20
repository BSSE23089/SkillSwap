import React from 'react';
import { Clock, Users } from 'lucide-react';
import styles from './SkillCard.module.css';
import Button from '../../UI/Button';
import Text from '../../UI/Text'; // Assuming you have a Text component for consistent styling
const SkillCard = ({ skill, type }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Text className={styles.title}>{skill.title}</Text>
        <span
          className={`${styles.badge} ${
            type === 'teaching' ? styles.teachingBadge : styles.learningBadge
          }`}
        >
          {type === 'teaching' ? 'Teaching' : 'Learning'}
        </span>
      </div>

      <Text className={styles.description}>{skill.description}</Text>

      <div className={styles.tags}>
        {skill.tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.metadata}>
        <div className={styles.metadataLeft}>
          <div className={styles.metadataItem}>
            <Clock className="w-4 h-4" />
            <Text>{skill.duration}</Text>
          </div>
          <div className={styles.metadataItem}>
            <Users className="w-4 h-4" />
            <Text>{skill.studentCount} students</Text>
          </div>
        </div>
      </div>

      <Button className={styles.requestBtn}>
        Request Session
      </Button>
    </div>
  );
};

export default SkillCard;