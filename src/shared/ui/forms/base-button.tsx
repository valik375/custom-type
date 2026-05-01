import clsx from "clsx";

interface BaseButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

function BaseButton({
  className,
  children,
  type = "button",
  ...rest
}: BaseButton) {
  return (
    <button
      className={clsx(
        className,
        "w-full h-10 flex items-center justify-center text-(--text-primary) border-x border-(--border-primary) cursor-pointer transition-colors hover:bg-(--color-primary-1) active:bg-(--color-primary-2)",
      )}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}

export default BaseButton;
