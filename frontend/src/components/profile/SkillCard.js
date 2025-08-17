import React from 'react';
import { Clock, Users } from 'lucide-react';
import styles from './SkillCard.module.css';

const SkillCard = ({ skill, type }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{skill.title}</h3>
        <span
          className={`${styles.badge} ${
            type === 'teaching' ? styles.teachingBadge : styles.learningBadge
          }`}
        >
          {type === 'teaching' ? 'Teaching' : 'Learning'}
        </span>
      </div>

      <p className={styles.description}>{skill.description}</p>

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
            <span>{skill.duration}</span>
          </div>
          <div className={styles.metadataItem}>
            <Users className="w-4 h-4" />
            <span>{skill.studentCount} students</span>
          </div>
        </div>
      </div>

      <button className={styles.requestBtn}>
        Request Session
      </button>
    </div>
  );
};

export default SkillCard;