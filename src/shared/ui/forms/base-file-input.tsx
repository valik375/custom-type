import { useMemo, useEffect, useState } from "react";
import clsx from "clsx";
import { v4 as uuid } from "uuid";
import { Plus } from "lucide-react";
import BaseErrorMessage from "./base-error-message";

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  avatarUrl?: string | null | undefined;
  error?: string;
}

function FileInput({
  className,
  error,
  id,
  avatarUrl,
  onChange,
  ...rest
}: FileInputProps) {
  const inputId = id ?? uuid();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const previewUrl = selectedFile
    ? URL.createObjectURL(selectedFile)
    : avatarUrl;

  useEffect(() => {
    return () => {
      if (previewUrl && selectedFile) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, selectedFile]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0] ?? null;
    setSelectedFile(file);
    onChange?.(event);
  };

  return (
    <div className="border-b border-(--color-primary)">
      <div className="flex gap-4 p-2">
        <label
          className={clsx(
            className,
            "min-w-20 w-20 h-20 flex items-center justify-center border border-(--color-primary) rounded overflow-hidden cursor-pointer",
          )}
          htmlFor={inputId}
        >
          <input
            className="w-0 h-0 pointer-events-none opacity-0"
            type="file"
            id={inputId}
            onChange={handleChange}
            {...rest}
          />
          {previewUrl ? (
            <img className="w-full h-full object-cover" src={previewUrl} />
          ) : (
            <Plus
              className="stroke-(--text-secondary)!"
              width={48}
              height={48}
            />
          )}
        </label>
        <div className="min-w-0 flex-1">
          {!previewUrl && (
            <span className="text-sm font-light">No file selected</span>
          )}
          {selectedFile?.name && (
            <div>
              <div className="w-full flex items-center gap-2">
                <span className="text-md font-semibold">Name: </span>
                <span className="truncate text-sm font-light">
                  {selectedFile.name}
                </span>
              </div>
            </div>
          )}
          {selectedFile?.size && (
            <div className="min-w-0 flex-1">
              <div className="w-full flex items-center gap-2">
                <span className="text-md font-semibold">Size: </span>
                <span className="truncate text-sm font-light">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-(--border-primary)">
        <BaseErrorMessage>{error}</BaseErrorMessage>
      </div>
    </div>
  );
}

export default FileInput;
