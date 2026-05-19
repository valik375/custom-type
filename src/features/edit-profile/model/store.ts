import { createSlice } from "@reduxjs/toolkit";
import { type EditProfileState } from "./types";

const initialState: EditProfileState = {
  isEditModalOpen: false,
};

const editProfileSlice = createSlice({
  name: "editProfile",
  initialState: initialState,
  reducers: {
    openEditModal: (state) => {
      state.isEditModalOpen = true;
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
    },
  },
});

export const { openEditModal, closeEditModal } = editProfileSlice.actions;
export default editProfileSlice;
