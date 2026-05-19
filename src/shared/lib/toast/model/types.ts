export type ToastType = {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
};

export type initialState = {
  toasts: ToastType[];
};
