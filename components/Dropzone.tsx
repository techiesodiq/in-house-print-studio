"use client";

import { useRef, useState } from "react";

const ACCEPTED_EXTENSIONS = [".ai", ".pdf", ".jpg", ".jpeg", ".png"];
const MAX_BYTES = 50 * 1024 * 1024;

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface DropzoneProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export function Dropzone({ file, onFileChange }: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validate(candidate: File) {
    const ext = "." + candidate.name.split(".").pop()?.toLowerCase();
    if (!ACCEPTED_EXTENSIONS.includes(ext)) {
      return "We accept .ai, .pdf, .jpg, .jpeg or .png files.";
    }
    if (candidate.size > MAX_BYTES) {
      return "That file is over the 50 MB limit.";
    }
    return null;
  }

  function handleFile(candidate: File | undefined | null) {
    if (!candidate) return;
    const problem = validate(candidate);
    if (problem) {
      setError(problem);
      onFileChange(null);
      return;
    }
    setError(null);
    onFileChange(candidate);
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`flex flex-col items-center gap-3 rounded-2xl border-[1.5px] border-dashed px-5 py-[clamp(28px,4vw,52px)] text-center transition-all duration-200 ${
          file || dragOver ? "border-acc bg-acc-soft" : "border-line bg-bg2"
        }`}
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-acc-soft text-[20px] text-acc-ink">
          {file ? "✓" : "↑"}
        </span>
        <span className="text-[15.5px] font-semibold">
          {file ? `${file.name} · ${formatBytes(file.size)}` : "Drop your artwork here"}
        </span>
        <span className="text-center font-mono text-[11px] leading-[1.6] tracking-[0.06em] text-ink2">
          {file ? "Ready to send with your request" : "AI preferred · PDF and JPG accepted at 300 DPI minimum"}
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS.join(",")}
        className="sr-only"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {error && <span className="text-[13px] text-acc-ink">{error}</span>}
    </div>
  );
}
