import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

function Card({ children, className }: CardProps) {
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

export default Card;
