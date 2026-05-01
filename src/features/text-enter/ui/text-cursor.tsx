interface TextCursorProps {
  left: number;
  top: number;
}

export function TextCursor({ left, top }: TextCursorProps) {
  return (
    <div
      style={{ left, top }}
      className="h-10 w-0.75 bg-(--cursor-color) absolute top-1.5 left-1 rounded animate-pulse [animation-duration:1s] transition-all ease-linear"
    ></div>
  );
}
