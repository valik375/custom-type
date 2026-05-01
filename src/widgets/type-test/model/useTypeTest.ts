import { useState } from "react";
import { generateWordsArray } from "@/shared/lib/utils/sentence";
import { calculateResults } from "@/widgets/type-test/model/calculateResults";

import { type Result } from "@/shared/types";
import { type Time } from "@/shared/model/filters";

type UseTypeTestParams = {
  time: Time;
};

const initialResult = {
  wpm: 0,
  raw: 0,
  accuracy: 0,
  incorrect: 0,
  time: 0,
};

export const useTypeTest = ({ time }: UseTypeTestParams) => {
  const [wordList, setWordList] = useState<string[][]>(
    generateWordsArray(50).map((word: string) => word.split("")),
  );
  const [input, setInput] = useState<string[]>([]);
  const [isTimesUp, setIsTimesUp] = useState(false);
  const [result, setResult] = useState<Result>({
    wpm: 0,
    raw: 0,
    accuracy: 0,
    incorrect: 0,
    time: 0,
  });

  const finish = () => {
    const res = calculateResults({
      wordList: wordList,
      resultList: input,
      time: time,
    });
    setResult(res);
    setIsTimesUp(true);
    setInput([]);
  };

  const reset = () => {
    setWordList(generateWordsArray(50).map((w) => w.split("")));
    setInput([]);
    setIsTimesUp(false);
    setResult(initialResult);
  };

  return {
    wordList,
    setWordList,
    input,
    setInput,
    isTimesUp,
    result,
    reset,
    finish,
  };
};
