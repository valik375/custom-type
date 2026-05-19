import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import layoutSlice from "@/app/store/layout.slice";

import typeTestReducer from "@/widgets/type-test/model/slice";
import toastSlice from "@/shared/lib/toast/model/store";
import editProfileSlice from "@/features/edit-profile/model/store";

export const store = configureStore({
  reducer: {
    [typeTestReducer.name]: typeTestReducer.reducer,
    [layoutSlice.name]: layoutSlice.reducer,
    [toastSlice.name]: toastSlice.reducer,
    [editProfileSlice.name]: editProfileSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
