import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  type?: string;
  min?: string;
  max?: string;
  step?: string;
  name?: string;
  value?: string;
  onChange?: (value: string, name?: string) => void;
  icon?: React.ReactNode;
  isDropdown?: boolean;
  dropdownOptions?: { label: string; value: string }[];
  dropdownValue?: string;
  onDropdownChange?: (v: string) => void;
  inputGroupText?: string;
  validate?: (value: string) => string | null;
  size?: "sm" | "md" | "lg";
  width?: string;
  required?: boolean;
  id?: string;
}

export default function TextInput({
  label,
  placeholder,
  hint,
  id,
  error,
  type = "text",
  min,
  max,
  step,
  name,
  value,
  onChange,
  icon,
  isDropdown = false,
  dropdownOptions = [],
  dropdownValue,
  onDropdownChange,
  inputGroupText,
  validate,
  size = "md",
  width = "w-full",
  required = false,
}: TextInputProps) {
  const [internalError, setInternalError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  const sizeStyles = {
    sm: "h-9 text-sm",
    md: "h-10 text-sm",
    lg: "h-12 text-base",
  };

  const handleChange = (text: string) => {
    onChange?.(text, name);

    if (validate) {
      const validationMessage = validate(text);

      setInternalError(validationMessage);
    }
    if (!text && validate) {
      setInternalError("");
    }
  };

  const finalError = error || internalError;

  return (
    <div className={clsx("flex flex-col gap-1", width)}>
      {label && (
        <label className="text-sm font-medium text-gray-800">{label}</label>
      )}

      <div
        className={clsx(
          "flex items-center border rounded-lg bg-white transition-all",
          "focus-within:ring-1 focus-within:ring-black/40",
          finalError
            ? "border-red-500"
            : "border-gray-300 hover:border-gray-400",
          sizeStyles[size],
        )}
      >
        {icon && <span className="pl-3 text-gray-500">{icon}</span>}

        {inputGroupText && (
          <div
            className={clsx(
              "h-full px-3 border-r border-gray-300 flex items-center",
              "rounded-l-lg rounded-r-none bg-gray-50 text-gray-700 text-sm font-medium",
            )}
          >
            {inputGroupText}
          </div>
        )}

        {isDropdown && dropdownOptions.length > 0 && (
          <Dropdown className="p-0 min-w-[10px]" placement="bottom-start">
            <DropdownTrigger>
              <div
                className={clsx(
                  "h-full px-3 border-r border-gray-300",
                  "flex items-center gap-2",
                  "rounded-l-lg rounded-r-none",
                  "bg-gray-50 hover:bg-gray-100 transition-colors",
                  "text-gray-800 text-sm font-medium cursor-pointer",
                )}
              >
                <span>{dropdownValue || dropdownOptions[0].label}</span>

                <svg
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </DropdownTrigger>

            <DropdownMenu
              className="min-w-[150px] bg-white rounded-md shadow-md border border-gray-200"
              onAction={(key) => onDropdownChange?.(String(key))}
            >
              {dropdownOptions.map((opt) => (
                <DropdownItem key={opt.value}>{opt.label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}

        <input
          className="w-full px-3 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
          id={id}
          max={max}
          min={min}
          placeholder={placeholder}
          required={required}
          step={step}
          type={inputType}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        />

        {isPasswordField && (
          <button
            className="pr-3 text-gray-500 hover:text-gray-700"
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {!finalError && hint && <p className="text-xs text-gray-500">{hint}</p>}
      {finalError && <p className="text-xs text-red-600">{finalError}</p>}
    </div>
  );
}
