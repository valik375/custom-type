import {
  TIME_VALUES,
  type TypeTestFilters,
  type Time,
} from "@/shared/model/filters";
import { useAppSelector } from "@/app/store";
import clsx from "clsx";

interface TextSettingsProps {
  updateFilterTime: (value: Time) => void;
  filters: TypeTestFilters;
}

function TextSettings({ updateFilterTime, filters }: TextSettingsProps) {
  const isTestStarder = useAppSelector((state) => state.layout.isTestStarder);

  return (
    <div className="h-16 border-b border-(--color-primary)">
      <div
        className={clsx(
          isTestStarder
            ? "pointer-events-none opacity-0"
            : "pointer-events-auto",
          "w-full h-16 flex items-center border-b border-(--color-primary)",
        )}
      >
        {TIME_VALUES.map((value) => (
          <div
            key={value}
            className={clsx(
              filters.time === value
                ? "bg-(--color-primary-1) text-(--text-primary)!"
                : "",
              "h-full flex items-center text-(--text-secondary) px-4 border-r border-(--color-primary) cursor-pointer transition-colors hover:text-(--text-primary)",
            )}
            onClick={() => updateFilterTime(value)}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TextSettings;
