import { createContext, useContext, useRef, useState } from "react";
import clsx from "clsx";

import { ChevronDown } from "lucide-react";

interface DropdownContextValue {
  open: boolean;
  toggle: () => void;
  close: () => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

const useDropdownContext = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx)
    throw new Error("Dropdown compound parts must be used inside <Dropdown>");
  return ctx;
};

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
}
const DropdownRoot = ({ children, className }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  const toggle = () => {
    setOpen((v) => {
      if (!v) document.addEventListener("mousedown", handleClickOutside);
      return !v;
    });
  };

  const close = () => setOpen(false);

  return (
    <DropdownContext.Provider value={{ open, toggle, close }}>
      <div ref={ref} className={clsx(className, "relative inline-block")}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

interface TriggerProps {
  children: React.ReactNode;
  className?: string;
}
const Trigger = ({ children, className }: TriggerProps) => {
  const { toggle, open } = useDropdownContext();
  return (
    <div
      onClick={toggle}
      className={clsx(className, "flex items-center gap-2")}
    >
      <div className="cursor-pointer inline-flex items-center">{children}</div>
      <ChevronDown
        className={clsx(
          open ? "rotate-180" : "",
          "transition-transform duration-300",
        )}
        width={24}
        height={24}
      />
    </div>
  );
};

interface BodyProps {
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}
const Body = ({ children, align = "left", className }: BodyProps) => {
  const { open } = useDropdownContext();
  if (!open) return null;

  return (
    <div
      className={clsx(
        className,
        align === "right" ? "right-0" : "left-0",
        "w-full absolute top-[calc(100%+5px)] z-50 bg-(--dropdown-bg) border border-(--border-primary) overflow-hidden",
      )}
    >
      {children}
    </div>
  );
};

interface ItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
const Item = ({ children, onClick, className }: ItemProps) => {
  const { close } = useDropdownContext();

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        className,
        "text-sm p-3 cursor-pointer hover:bg-(--dropdown-item-hover)",
      )}
    >
      {children}
    </div>
  );
};

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger,
  Body,
  Item,
});
