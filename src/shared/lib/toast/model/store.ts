import { createSlice } from "@reduxjs/toolkit";
import { type initialState, type ToastType } from "./types";

const initialState: initialState = {
  toasts: [],
};

type AddToastAction = {
  payload: ToastType;
};

type RemoveToastAction = {
  payload: string;
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: AddToastAction) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action: RemoveToastAction) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload,
      );
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice;
