import React from "react";

export type TextCharState = "correct" | "incorrect" | "default";

interface TextCharProps {
  char: string;
  state: TextCharState;
}

export const TextChar = React.memo(({ char, state }: TextCharProps) => {
  const getCharState = () => {
    switch (state) {
      case "correct":
        return "text-(--text-primary)!";
      case "incorrect":
        return "text-red-500!";
      case "default":
        return "text-(--text-secondary)!";
    }
  };

  return (
    <span
      className={`${getCharState()} font-medium whitespace-break-spaces text-3xl`}
    >
      {char}
    </span>
  );
});
