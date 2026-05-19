import { createContext, useContext } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { X } from "lucide-react";

interface DrawerContext {
  isOpen: boolean;
  close: () => void;
}

const DrawerContext = createContext<DrawerContext | null>(null);

const useDrawerContext = () => {
  const ctx = useContext(DrawerContext);
  if (!ctx)
    throw new Error("Drawer compound parts must be used inside <Drawer>");
  return ctx;
};

interface DrawerRootProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  close: () => void;
}
const DrawerRoot = ({
  className,
  children,
  isOpen,
  close,
}: DrawerRootProps) => {
  const DrawerRoot = document.getElementById("modal-root");

  if (!DrawerRoot) return null;

  return createPortal(
    <DrawerContext.Provider value={{ isOpen, close }}>
      <div
        className={clsx(
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
          "w-screen h-screen flex justify-end fixed left-0 top-0 bg-gray-800/50 backdrop-blur-sm transition-all",
        )}
      >
        <div
          className={clsx(
            className,
            isOpen ? "translate-x-0" : "translate-x-full",
            "w-1/2 max-w-150 h-full flex flex-col bg-(--modal-bg) border-l border-(--modal-border) overflow-y-auto overflow-x-hidden transition-all duration-400",
          )}
        >
          {children}
        </div>
      </div>
    </DrawerContext.Provider>,

    DrawerRoot,
  );
};

interface DrawerHeaderProps {
  title?: string;
  className?: string;
}
const DrawerHeader = ({ title, className }: DrawerHeaderProps) => {
  const { close } = useDrawerContext();
  return (
    <div
      className={clsx(
        className,
        "w-full min-h-12 border-b border-(--modal-border) pl-4 pr-12 relative",
      )}
    >
      <div className="w-full h-full min-h-12 flex items-center py-2 uppercase text-lg">
        {title}
      </div>
      <X
        className="absolute right-4 top-3 cursor-pointer"
        width={24}
        onClick={close}
      />
    </div>
  );
};

interface DrawerFooterProps {
  className?: string;
  children: React.ReactNode;
}
const DrawerFooter = ({ className, children }: DrawerFooterProps) => {
  return (
    <div
      className={clsx(
        className,
        "mt-auto border-t border-(--modal-border) bg-(--modal-border) gap-[1px]",
      )}
    >
      {children}
    </div>
  );
};

interface DrawerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}
const DrawerButton = ({
  className,
  children,
  onClick,
  ...rest
}: DrawerButtonProps) => {
  return (
    <button
      className={clsx(
        className,
        "w-full h-12 border-r border-b border-(--modal-border) transition-colors cursor-pointer bg-(--modal-bg) hover:bg-(--modal-primary-hover) active:bg-(--modal-primary-active)",
        "disabled:cursor-no-drop",
      )}
      type="button"
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

interface DrawerSectionProps {
  children: React.ReactNode;
  className?: string;
}
const DrawerSection = ({ children, className }: DrawerSectionProps) => {
  return (
    <div className={clsx(className, "px-4 border-b border-(--modal-border)")}>
      <div className="border-x border-(--modal-border)">{children}</div>
    </div>
  );
};

export const Drawer = Object.assign(DrawerRoot, {
  Header: DrawerHeader,
  Section: DrawerSection,
  Button: DrawerButton,
  Footer: DrawerFooter,
});
