import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [], // all session requests
};

const sessionSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    addRequest: (state, action) => {
      state.requests.push(action.payload);
    },
    updateRequestStatus: (state, action) => {
      const { id, status } = action.payload;
      const req = state.requests.find((r) => r.id === id);
      if (req) {
        req.status = status;
      }
    },
  },
});

export const { addRequest, updateRequestStatus } = sessionSlice.actions;
export default sessionSlice.reducer;
