interface BaseErrorMessageProps {
  children: React.ReactNode;
}

function BaseErrorMessage({ children }: BaseErrorMessageProps) {
  return (
    <div
      className="min-h-4 flex items-center px-1 text-xs font-normal text-red-400!"
      style={{
        background:
          "repeating-linear-gradient(135deg, transparent, transparent 8px, rgba(255,255,255,0.07) 8px, rgba(255,255,255,0.07) 9px)",
      }}
      data-testid="error-message"
    >
      {children}
    </div>
  );
}

export default BaseErrorMessage;
