import clsx from "clsx";
import { RefreshCcw } from "lucide-react";
import { type Result } from "@/shared/types";

type AnalitycsDataItem = {
  label: string;
  value: string;
};

interface TextAnalyticsProps {
  result: Result;
  onReset: () => void;
}

export const TextAnalytics = ({ result, onReset }: TextAnalyticsProps) => {
  const analitycsData: AnalitycsDataItem[] = [
    {
      label: "WPM",
      value: result.wpm.toString(),
    },
    {
      label: "RAW",
      value: result.raw.toString(),
    },
    {
      label: "Accuracy",
      value: result.accuracy.toString(),
    },
    {
      label: "Incorrect",
      value: result.incorrect.toString(),
    },
    {
      label: "Time",
      value: result.time + "s",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full relative">
        <div className="w-full flex flex-wrap">
          {analitycsData.map((item, index) => (
            <div
              className={clsx(
                index === analitycsData.length - 1 ? "" : "border-r",
                "w-full max-w-1/5 flex-col gap-2 border-(--color-primary) p-6 border-b",
              )}
            >
              <div className="text-2xl text-(--text-secondary)">
                {item.label}
              </div>
              <div className="text-6xl text-(--text-primary)">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="bottom-10 left-1/2 flex items-center gap-2 text-md text-(--text-secondary) cursor-pointer absolute hover:text-(--color-primary) transition-colors"
        onClick={() => onReset()}
      >
        Reset
        <RefreshCcw width={18} />
      </div>
    </div>
  );
};
