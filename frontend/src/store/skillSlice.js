import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  skills: [], // all skills for discover
  mySkills: [], // skills of logged-in user
};

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
    addSkill: (state, action) => {
      state.mySkills.push(action.payload);
    },
    removeSkill: (state, action) => {
      state.mySkills = state.mySkills.filter(skill => skill.id !== action.payload);
    },
  },
});

export const { setSkills, addSkill, removeSkill } = skillSlice.actions;
export default skillSlice.reducer;
