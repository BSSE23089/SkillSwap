import React, { useState } from 'react';
import SkillsTabNavigation from './SkillsTabNavigation';
import Teaching from './Teaching';
import Learning from './Learning';


const MySkills = ({ teachingSkills, learningSkills }) => {
  const [activeTab, setActiveTab] = useState('teaching');

  return (
    <div >
      <SkillsTabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        teachingCount={teachingSkills.length}
        learningCount={learningSkills.length}
      />

      {activeTab === 'teaching' ? (
        <Teaching skills={teachingSkills} />
      ) : (
        <Learning skills={learningSkills} />
      )}
    </div>
  );
};

export default MySkills;