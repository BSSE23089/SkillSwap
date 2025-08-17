import React from 'react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import MySkills from '../../components/profile/MySkills';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const user = {
    initials: 'AJ',
    name: 'Alex Johnson',
    bio: 'Passionate learner and teacher with 5+ years of experience in web development and design.',
    location: 'San Francisco, CA',
    joinedDate: 'March 2023',
    rating: '4.8',
    reviewCount: '42',
    sessionsCompleted: '67'
  };

  const teachingSkills = [
    {
      id: 1,
      title: 'React & Next.js Development',
      description: 'Learn modern React development with hooks and Next.js.',
      tags: ['Programming', 'Intermediate'],
      duration: '2-3 hours',
      studentCount: '15'
    },
    {
      id: 2,
      title: 'JavaScript ES6+ & TypeScript',
      description: 'Deep dive into modern JavaScript and TypeScript.',
      tags: ['Programming', 'Advanced'],
      duration: '4-5 hours',
      studentCount: '12'
    }
  ];

  const learningSkills = [
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      description: 'Learn the basics of UI/UX Design using Figma.',
      tags: ['Design', 'Beginner'],
      duration: '3-4 hours',
      studentCount: '8'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ProfileHeader user={user} />
        <MySkills teachingSkills={teachingSkills} learningSkills={learningSkills} />
      </div>
    </div>
  );
};

export default ProfilePage;