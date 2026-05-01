export const TIME_VALUES = [15, 30, 60] as const;
export type Time = (typeof TIME_VALUES)[number];

export type TypeTestFilters = {
  time: Time;
};