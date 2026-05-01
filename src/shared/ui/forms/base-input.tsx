import clsx from "clsx";
import BaseErrorMessage from "./base-error-message";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
}

function Input({ className, error, ...rest }: InputProps) {
  return (
    <div className="w-full flex flex-col border-b border-(--border-primary)">
      <div className={clsx("w-full h-10", className)}>
        <input className="w-full h-full px-2" {...rest} />
      </div>
      <div className="border-t border-(--border-primary)">
        <BaseErrorMessage>{error}</BaseErrorMessage>
      </div>
    </div>
  );
}

export default Input;
