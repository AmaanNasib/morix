import type { LucideIcon } from "lucide-react";

import { Trash } from "lucide-react";
import { Card } from "@heroui/react";
import { UploadCloud } from "lucide-react";
import { useCallback, useState } from "react";



interface FileUploadProps {
  value?: File[];
  onChange?: (files: File[]) => void;
  onError?: (message: string) => void;
  accept?: string;
  maxSize?: string;
  size?: FileUploadSize;
  title?: string;
  subTitle?: string;
  icon?: LucideIcon;
  clearable?: boolean;
  name?: string
}

type FileUploadSize = "sm" | "md" | "lg";

export default function FileUpload({
  value = [],
  onChange,
  onError,
  accept = ".jpg,.jpeg,.png,.pdf,.mp4,.mov,.webm",
  maxSize = "10MB",
  size = "sm",
  title = "Upload Files",
  subTitle = "Drag and drop or add files",
  icon: Icon = UploadCloud,
  clearable = true,
  name,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>(value);

  const sizeStyles: Record<FileUploadSize, { container: string; icon: number; iconWrapper: string }> = {
    sm: { container: "p-6", icon: 24, iconWrapper: "p-2 mb-3" },
    md: { container: "p-10", icon: 32, iconWrapper: "p-4 mb-4" },
    lg: { container: "p-14", icon: 40, iconWrapper: "p-6 mb-5" },
  };

  const s = sizeStyles[size]; // ✅

  const styles = {
    container: `
      w-full flex flex-col items-center justify-center 
      border-2 ${files.length > 0 ? "border-primary" : "border-dashed"} rounded-2xl transition relative
      ${s.container}
    `,
    active: "border-primary bg-primary/5",
    inactive: "border-gray-300",
    iconWrapper: `bg-red-50 rounded-full ${s.iconWrapper}`,
  };

  const parseSize = (size: string) => {
    const units: Record<string, number> = {
      B: 1,
      KB: 1024,
      MB: 1024 * 1024,
      GB: 1024 * 1024 * 1024,
    };

    const match = size.toUpperCase().match(/^(\d+(?:\.\d+)?)\s*(B|KB|MB|GB)$/);

    if (!match) return 10 * 1024 * 1024; // 10MB - Default

    const [, value, unit] = match;

    return parseFloat(value) * units[unit];
  };

  const validateFiles = (files: File[]) => {
    const maxBytes = parseSize(maxSize);

    return files.filter((file) => {
      if (file.size > maxBytes) {
        onError?.(`${file.name} exceeds the max file size (${maxSize})`);

        return false;
      }
      const allowedExtensions = accept
        .split(",")
        .map((ext) => ext.toLocaleLowerCase().trim().replace(".", ""));
      const fileExtension: string = file.name.split(".").pop() || "";

      if (!allowedExtensions.includes(fileExtension)) {
        onError?.(`${file.name} has an invalid file format`);

        return false;
      }

      return true;
    });
  };

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    }
    if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = validateFiles(droppedFiles);

      if (validFiles.length > 0) {
        onChange?.([...(value || []), ...validFiles]);
        setFiles((prev) => [...prev, ...validFiles]);
      }
    },
    [onChange, value, maxSize],
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = validateFiles(selectedFiles);

    if (validFiles.length > 0) {
      onChange?.([...(value || []), ...validFiles]);
      setFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const onClear = (index: number | string) => {
    let changedFiles = files.filter((_, i) => i !== index);

    setFiles(changedFiles);

    return;
  }


  return (
    <Card
      className={`${styles.container} ${dragActive ? styles.active : styles.inactive}`}
      onDragEnter={handleDrag}
    >
      <input
        multiple
        accept={accept}
        className="hidden"
        id="file-upload"
        name={name}
        type="file"
        onChange={handleFileSelect}
      />

      {files.length > 0 ? (
        <div className="w-full text-left space-y-2">
          {files.map((file, index) => (
            <>
              <div key={`${file.name}-${index}`} className="flex justify-between">
                <p
                  
                  className="text-sm text-gray-700 truncate"
                  title={file.name}
                >
                  {file.name}
                </p>
                {clearable && (

                  <Trash className="cursor-pointer text-primary" onClick={() => onClear(index)} />

                )}
              </div>
            </>
          ))}
        </div>
      ) : (
        <>
          <label
            className="flex flex-col items-center text-center"
            htmlFor="file-upload"
          >
            <div className={styles.iconWrapper}>
              <Icon className="text-red-500" size={s.icon} />
            </div>

            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-500 mb-3">{subTitle}</p>
            <p className="text-sm text-gray-400">
              • Supported formats {accept.split(",").join(", ").toUpperCase()}
              <br />• Max size: {maxSize}
            </p>
          </label>

          {dragActive && (
            <div
              className="absolute inset-0"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            />
          )}
        </>
      )}
    </Card>

  );
}
