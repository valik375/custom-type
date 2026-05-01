import { useEffect, useState } from "react";

export function useCountdown(
  initialValue: number | null,
  onTimeIsOut: () => void,
) {
  const [timer, setTimer] = useState(initialValue);

  useEffect(() => {
    if (timer === null) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === null) return prev;
        if (prev <= 1) {
          clearInterval(interval);
          onTimeIsOut();
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return { timer, setTimer };
}
