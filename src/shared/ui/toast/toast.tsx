import {
  CircleX,
  X,
  CircleCheck,
  Info,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

import { type ToastType } from "@/shared/lib/toast/model/types";

interface ToastProps extends ToastType {
  onCloseToast: (id: string) => void;
}

const toastIconColor = {
  success: "#308C6D",
  error: "#C70812",
  info: "#3678DA",
  warning: "#EC720B",
};

const Toast = ({ id, title, message, type, onCloseToast }: ToastProps) => {
  const icons: Record<ToastType["type"], LucideIcon> = {
    success: CircleCheck,
    error: CircleX,
    info: Info,
    warning: TriangleAlert,
  };
  const IconComponent = icons[type];

  return (
    <div
      className="w-full h-auto flex border border-(--border-primary) bg-(--main-bg) relative pointer-events-auto"
      style={{ borderColor: toastIconColor[type] }}
    >
      <div className="min-w-12 h-auto min-h-12 flex items-start justify-center pt-2">
        <IconComponent color={toastIconColor[type]} width={22} height={22} />
      </div>
      <div className="w-full py-2 pr-8">
        <div className="leading-5.5 mb-1">{title}</div>
        <div className="text-xs text-[#848989]!">{message}</div>
      </div>

      <div
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => onCloseToast(id)}
      >
        <X width={20} height={20} />
      </div>
    </div>
  );
};

export default Toast;
