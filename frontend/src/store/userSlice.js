import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    name: "",
    bio: "",
    location: "",
    rating: 0,
    reviewsCount: 0,
    teachingSessions: 0,
    learningSessions: 0,
    avatarUrl: "",
  },
  teachingSkills: [],   // 👈 added
  learningSkills: [],   // 👈 added
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    updateStats: (state, action) => {
      state.profile.teachingSessions = action.payload.teachingSessions;
      state.profile.learningSessions = action.payload.learningSessions;
    },
    setTeachingSkills: (state, action) => {
      state.teachingSkills = action.payload; // replace entire array
    },
    setLearningSkills: (state, action) => {
      state.learningSkills = action.payload; // replace entire array
    },
    addTeachingSkill: (state, action) => {
      state.teachingSkills.push(action.payload);
    },
    addLearningSkill: (state, action) => {
      state.learningSkills.push(action.payload);
    },
    removeTeachingSkill: (state, action) => {
      state.teachingSkills = state.teachingSkills.filter(
        (skill) => skill.id !== action.payload
      );
    },
    removeLearningSkill: (state, action) => {
      state.learningSkills = state.learningSkills.filter(
        (skill) => skill.id !== action.payload
      );
    },
  },
});

export const {
  setUserProfile,
  updateStats,
  setTeachingSkills,
  setLearningSkills,
  addTeachingSkill,
  addLearningSkill,
  removeTeachingSkill,
  removeLearningSkill,
} = userSlice.actions;

export default userSlice.reducer;
