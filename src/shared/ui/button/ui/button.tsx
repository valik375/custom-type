import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button className={clsx(className, "")} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
