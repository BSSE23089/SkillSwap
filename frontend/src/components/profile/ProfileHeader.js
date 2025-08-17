import React from 'react';
import { Star, MapPin, Calendar, MessageCircle, Users } from 'lucide-react';
import styles from './ProfileHeader.module.css';

const ProfileHeader = ({ user }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.avatar}>
          <div className={styles.avatarCircle}>
            {user.initials}
          </div>
        </div>

        <div className={styles.info}>
          <h1 className={styles.name}>{user.name}</h1>
          <p className={styles.bio}>{user.bio}</p>

          <div className={styles.metadata}>
            <div className={styles.metadataItem}>
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
            <div className={styles.metadataItem}>
              <Calendar className="w-4 h-4" />
              <span>Joined {user.joinedDate}</span>
            </div>
            <div className={styles.metadataItem}>
              <Star className={`w-4 h-4 ${styles.starIcon}`} />
              <span>{user.rating} ({user.reviewCount} reviews)</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.messageBtn}>
              <MessageCircle className="w-4 h-4" />
              <span>Message</span>
            </button>
            <div className={styles.sessionsInfo}>
              <Users className="w-4 h-4" />
              <span>{user.sessionsCompleted} sessions completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;