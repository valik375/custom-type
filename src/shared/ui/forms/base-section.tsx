import clsx from "clsx";

interface BaseSectionProps {
  className?: string;
  children: React.ReactNode;
}

function BaseSection({ children, className }: BaseSectionProps) {
  return (
    <div
      className={clsx(
        "w-full border-b border-(--border-primary) px-4",
        className,
      )}
    >
      <div className="w-full h-full border-x border-(--border-primary)">
        {children}
      </div>
    </div>
  );
}

export default BaseSection;
