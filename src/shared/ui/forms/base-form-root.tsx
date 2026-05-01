import clsx from "clsx";

interface BaseFormRootProps {
  className?: string;
  children: React.ReactNode;
}

function BaseFormRoot({ children, className }: BaseFormRootProps) {
  return <div className={clsx("w-full h-full", className)}>{children}</div>;
}

export default BaseFormRoot;
