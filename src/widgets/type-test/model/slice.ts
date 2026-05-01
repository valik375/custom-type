import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type TypeTestFilters } from "@/shared/model/filters";

export interface TypeTestState {
  filters: TypeTestFilters;
}

const initialState: TypeTestState = {
  filters: {
    time: 30,
  },
};

const typeTestSlice = createSlice({
  name: "typeTest",
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<TypeTestFilters["time"]>) => {
      state.filters.time = action.payload;
    },
  },
});

export const { setTime } = typeTestSlice.actions;
export default typeTestSlice;
