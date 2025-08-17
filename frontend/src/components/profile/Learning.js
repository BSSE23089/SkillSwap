import React from 'react';
import SkillsGrid from './SkillsGrid';

const Learning = ({ skills }) => {
  return <SkillsGrid skills={skills} type="learning" />;
};

export default Learning;