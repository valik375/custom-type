import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import layoutSlice from "@/app/store/layout.slice";

import typeTestReducer from "@/widgets/type-test/model/slice";
import profileSlice from "@/entities/user/model/store";

export const store = configureStore({
  reducer: {
    [typeTestReducer.name]: typeTestReducer.reducer,
    [layoutSlice.name]: layoutSlice.reducer,
    [profileSlice.name]: profileSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
