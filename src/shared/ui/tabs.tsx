import clsx from "clsx";

interface TabsProps {
  children: React.ReactNode;
  className?: string;
}

function Tabs({ children, className }: TabsProps) {
  return (
    <div
      className={clsx(
        "w-full bg-(--card-bg) border-solid border-(--card-border) border p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Tabs;
