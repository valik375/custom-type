import clsx from "clsx";

interface BaseTitle {
  children: React.ReactNode;
  className?: string;
}

function BaseTitle({ className, children }: BaseTitle) {
  return (
    <h2
      className={clsx(
        className,
        "font-semibold uppercase border-b border-(--border-primary) p-2",
      )}
    >
      {children}
    </h2>
  );
}

export default BaseTitle;
