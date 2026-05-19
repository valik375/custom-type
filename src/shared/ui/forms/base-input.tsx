import { useState } from "react";
import clsx from "clsx";
import { Eye, EyeClosed } from "lucide-react";
import BaseErrorMessage from "./base-error-message";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
}

function Input({ className, error, type, ...rest }: InputProps) {
  const [passwordType, setPasswordType] = useState<InputProps["type"]>(
    type ?? "text",
  );

  return (
    <div className="w-full flex flex-col border-b border-(--border-primary)">
      <div className={clsx("w-full h-10 relative", className)}>
        <input
          className={clsx(
            type === "password" ? "pr-12" : "",
            "w-full h-full px-2",
          )}
          {...rest}
          type={passwordType}
        />
        {type === "password" && (
          <div className="w-10 h-10 flex items-center justify-center absolute right-0 bottom-0">
            {passwordType === "password" ? (
              <Eye onClick={() => setPasswordType("text")} />
            ) : (
              <EyeClosed onClick={() => setPasswordType("password")} />
            )}
          </div>
        )}
      </div>
      <div className="border-t border-(--border-primary)">
        <BaseErrorMessage>{error}</BaseErrorMessage>
      </div>
    </div>
  );
}

export default Input;
