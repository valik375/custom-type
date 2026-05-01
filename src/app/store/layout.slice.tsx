import { createSlice } from "@reduxjs/toolkit";

export type LayoutSliceState = {
  isTestStarder: boolean;
};

const initialState: LayoutSliceState = {
  isTestStarder: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setIsTestStarder: (state, action) => {
      state.isTestStarder = action.payload;
    },
  },
});

export const { setIsTestStarder } = layoutSlice.actions;
export default layoutSlice;
