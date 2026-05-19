import { useAppDispatch } from "@/app/store";
import { addToast, removeToast } from "../model/store";
import { type ToastType } from "../model/types";
import { v4 as uuid } from "uuid";

const timers = new Map<string, ReturnType<typeof setTimeout>>();

const useToast = () => {
  const dispatch = useAppDispatch();

  const show = (toast: Omit<ToastType, "id">) => {
    const id = uuid();
    dispatch(addToast({ id, ...toast }));

    const timer = setTimeout(() => {
      dispatch(removeToast(id));
      timers.delete(id);
    }, 5000);

    timers.set(id, timer);
  };

  const hide = (id: string) => {
    const timer = timers.get(id);

    if (timer) {
      clearTimeout(timer);
      timers.delete(id);
    }

    dispatch(removeToast(id));
  };

  return { show, hide };
};

export default useToast;
