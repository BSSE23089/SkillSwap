import { addSkill } from "./skillSlice";
import { addTeachingSkill, addLearningSkill } from "./userSlice";

// thunk: add skill and sync with user slice
export const addSkillAndSync = (skill) => (dispatch) => {
  dispatch(addSkill(skill));
  if (skill.type === "teach") {
    dispatch(addTeachingSkill(skill));
  } else if (skill.type === "learn") {
    dispatch(addLearningSkill(skill));
  }
};
