import { useAppSelector, useAppDispatch } from "@/app/store";
import { removeToast } from "@/shared/lib/toast/model/store";
import Toast from "./toast";

const ToastContainer = () => {
  const dispatch = useAppDispatch();

  const toasts = useAppSelector((state) => state.toast.toasts);

  const handleCloseToast = (id: string) => {
    dispatch(removeToast(id));
  };

  return (
    <div className="fixed right-0 top-0 w-full max-w-100 h-full bg-transparent z-10 pointer-events-none">
      <div className="flex flex-col justify-end gap-2 w-full h-full py-4 pr-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onCloseToast={(id) => handleCloseToast(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ToastContainer;
