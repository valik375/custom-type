import { createSlice } from "@reduxjs/toolkit";
import { type Profile } from "./types";

type State = {
  users: Profile[] | [];
  currentProfile: Profile | null;
};

const initialState: State = {
  users: [],
  currentProfile: null,
};

const profileSlice = createSlice({
  name: "currentUser",
  initialState: initialState,
  reducers: {
    setCurrentProfile: (state, action) => {
      state.currentProfile = action.payload;
    },
    setUsers: (state, action) => {
      state.currentProfile = action.payload;
    },
  },
});

export const { setCurrentProfile } = profileSlice.actions;
export default profileSlice;
