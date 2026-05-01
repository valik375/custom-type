import { TextEnter } from "@/features/text-enter";
import { TextSettings } from "@/features/text-settings";
import { TextAnalytics } from "@/features/text-analytics";

import { useAppDispatch, useAppSelector } from "@/app/store";
import { setIsTestStarder } from "@/app/store/layout.slice";
import { setTime } from "../model/slice";

import { useCountdown } from "@/shared/lib/hooks/useCountdown";
import { useTypeTest } from "../model/useTypeTest";

import { type Time } from "@/shared/model/filters";

function TypeTest() {
  const filters = useAppSelector((state) => state.typeTest.filters);
  const isTestStarder = useAppSelector((state) => state.layout.isTestStarder);
  const dispatch = useAppDispatch();

  const updateFilterTime = (time: Time) => {
    dispatch(setTime(time));
  };

  const {
    wordList,
    setWordList,
    input,
    setInput,
    isTimesUp,
    result,
    reset,
    finish,
  } = useTypeTest({ time: filters.time });

  const { timer, setTimer } = useCountdown(null, finish);

  const onStartTyping = () => {
    setTimer(filters.time);
    dispatch(setIsTestStarder(true));
  };

  const onReset = () => {
    reset();
    dispatch(setIsTestStarder(false));
  };

  return (
    <div className="w-full h-full flex flex-col">
      <TextSettings filters={filters} updateFilterTime={updateFilterTime} />

      {!isTimesUp ? (
        <div className="w-full h-full px-16 relative">
          {timer !== null && (
            <div className="absolute left-16 top-8 text-5xl text-(--text-primary)">
              {timer}
            </div>
          )}

          <TextEnter
            wordList={wordList}
            setWordList={setWordList}
            input={input}
            setInput={setInput}
            isStarted={isTestStarder}
            onStartTyping={onStartTyping}
          />
        </div>
      ) : (
        <TextAnalytics result={result} onReset={onReset} />
      )}
    </div>
  );
}

export default TypeTest;
