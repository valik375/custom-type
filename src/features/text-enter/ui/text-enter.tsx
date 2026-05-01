import { useEffect, useState, useRef, useCallback } from "react";
import { generateWordsArray } from "@/shared/lib/utils/sentence";

import { TextChar, type TextCharState } from "./text-char";
import { TextCursor } from "./text-cursor";

interface TextEnterProps {
  wordList: string[][];
  setWordList: (value: string[][]) => void;
  input: string[];
  setInput: (value: string[]) => void;
  isStarted: boolean;
  onStartTyping: () => void;
}

export function TextEnter({
  wordList,
  setWordList,
  input,
  setInput,
  isStarted,
  onStartTyping,
}: TextEnterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const onKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (
        event.code !== "Space" &&
        !event.code.startsWith("Key") &&
        event.code !== "Backspace"
      ) {
        return;
      }

      if (!isStarted) {
        onStartTyping();
      }

      const pressedKey = event.key;

      if (pressedKey === " ") {
        const newWord = generateWordsArray(1).map((word) => word.split(""));
        setWordList((prev) => [...prev, ...newWord]);
        const nextWordIndex = wordIndex + 1;
        setWordIndex(nextWordIndex);
        setCurrentIndex(0);
        setInput((prev) => {
          const updated = [...prev];
          updated[nextWordIndex] = "";
          return updated;
        });
        return;
      }

      if (pressedKey === "Backspace") {
        if (currentIndex === 0) return;
        setInput((prev) => {
          const updated = [...prev];
          updated[wordIndex] = updated[wordIndex].slice(0, -1);
          return updated;
        });
        setCurrentIndex((prev) => prev - 1);
      } else {
        setInput((prev) => {
          const updated = [...prev];
          updated[wordIndex] = updated[wordIndex] ? updated[wordIndex] : "";
          updated[wordIndex] += pressedKey;
          return updated;
        });
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [
      isStarted,
      wordIndex,
      currentIndex,
      setInput,
      setWordList,
      setWordIndex,
      setCurrentIndex,
      onStartTyping,
    ],
  );

  const getCharState = (wordIdx: number, charIndex: number): TextCharState => {
    if (wordIdx > wordIndex) return "default";

    const currentChar = wordList[wordIdx][charIndex];
    const typedWord = input?.[wordIdx];

    if (!typedWord) return "default";

    const typedChar = typedWord[charIndex];

    if (typedChar === undefined) return "default";

    if (typedChar === currentChar) return "correct";

    return "incorrect";
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyPress);
    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [onKeyPress]);

  const extraCharacters = (wordIdx: number): string[] => {
    if (input?.[wordIdx]?.length > wordList[wordIdx].length) {
      return input?.[wordIdx]
        .slice(wordList[wordIdx].length)
        .replace(" ", "")
        .split("");
    }
    return [];
  };

  const wordListRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<HTMLDivElement[]>([]);
  const charWidth = 18;
  const wordHeight = 52;
  const extraTopPadding = 6;
  const extraLeftPadding = 5;

  useEffect(() => {
    const el = wordsRef.current[wordIndex];
    if (!el) return;

    const topOffset = el.offsetTop;
    const leftOffset = el.offsetLeft;

    setCursorPosition({
      top: topOffset + extraTopPadding,
      left: leftOffset + extraLeftPadding,
    });
  }, [wordIndex]);
  const cursorLeftPosition = cursorPosition.left + currentIndex * charWidth;

  useEffect(() => {
    const prevTopOffset = wordsRef.current[wordIndex - 1]?.offsetTop ?? 1000;
    const currentTopOffset = wordsRef.current[wordIndex]?.offsetTop ?? 0;

    if (currentTopOffset <= wordHeight) {
      return;
    }

    if (currentTopOffset > prevTopOffset && wordListRef.current) {
      wordListRef.current.scrollTop += wordHeight;
    }
  }, [wordIndex]);

  const setWordRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      if (el) wordsRef.current[index] = el;
    },
    [],
  );

  return (
    <div className="w-full h-full flex">
      <div
        className="w-fit h-fit max-h-52 m-auto flex flex-wrap overflow-hidden relative"
        ref={wordListRef}
      >
        <TextCursor top={cursorPosition.top} left={cursorLeftPosition} />
        {!!wordList.length &&
          wordList.map((word, wordIdx) => (
            <div key={wordIdx} className="p-2" ref={setWordRef(wordIdx)}>
              {word.map((char, charIndex) => (
                <TextChar
                  key={wordIdx + "-" + charIndex}
                  char={char}
                  state={getCharState(wordIdx, charIndex)}
                />
              ))}
              {(() => {
                const extras = extraCharacters(wordIdx);
                if (extras.length === 0) return null;

                return extras.map((extraChar, i) => (
                  <TextChar key={i} char={extraChar} state="incorrect" />
                ));
              })()}
            </div>
          ))}
      </div>
    </div>
  );
}
