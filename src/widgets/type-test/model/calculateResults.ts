import { type Result } from "@/shared/types";
import { type Time } from "@/shared/model/filters";

type CalculateResultsProps = {
  resultList: string[];
  wordList: string[][];
  time: Time;
};

export const calculateResults = ({
  resultList,
  wordList,
  time,
}: CalculateResultsProps): Result => {
  let correct = 0;
  let incorrect = 0;
  let totalTyped = 0;

  wordList.forEach((word, i) => {
    const typed = resultList[i] || "";

    for (let j = 0; j < typed.length; j++) {
      totalTyped++;

      if (word[j] === typed[j]) {
        correct++;
      } else {
        incorrect++;
      }
    }
  });

  const minutes = time / 60;

  return {
    wpm: Math.round(correct / 5 / minutes),
    raw: Math.round(totalTyped / 5 / minutes),
    accuracy: Math.round((correct / totalTyped) * 100),
    incorrect: incorrect,
    time: time,
  };
};
