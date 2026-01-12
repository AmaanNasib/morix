import { Button, Chip } from "@heroui/react";
import { ReactNode } from "react";

export interface ButtonConfig {
  label: string;
  icon?: ReactNode;
  variant?: "white" | "outline" | "transparent";
  onClick?: () => void;
}

interface ChipConfig {
  label: string;
  color?: string; // dot color
}

interface GradientBannerProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  buttons?: ButtonConfig[];
  chips?: ChipConfig[];
  totalLabel?: string;
  gradientColors?: string[]; // e.g., ['#BA0007', '#A30F78', '#6509A3']
  backgroundImage?: string;
}

export default function GradientBanner({
  icon,
  title,
  subtitle,
  buttons = [],
  chips = [],
  totalLabel,
  gradientColors = ["#BA0007", "#A30F78", "#6509A3"],
  backgroundImage,
}: GradientBannerProps) {
  const gradient = `linear-gradient(to right, ${gradientColors.join(", ")})`;

  return (
    <div
      className={`relative w-full rounded-b-[28px] ${chips?.length > 0 ? "min-h-[13rem]" : "min-h-[11rem]"
        }`}
    >
      {/* === Background Layer === */}
      <div className="absolute inset-0 rounded-b-[28px] overflow-hidden pointer-events-none">
        {/* Background Image */}
        {backgroundImage && (
          <img
            alt="Banner Background"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            src={backgroundImage}
          />
        )}
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 opacity-80"
          style={{ background: gradient }}
        />
      </div>

      {/* === Foreground Layer === */}
      <div className="relative z-[1] pb-4 sm:pb-6">
        {/* === Header Section === */}
        <div className="px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-2 sm:pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
            {/* LEFT SIDE (Icon + Title + Subtitle) */}
            <div className="flex items-start sm:items-center gap-3 flex-1">
              <div className="flex items-center justify-center bg-white w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex-shrink-0">
                {icon}
              </div>
              <div className="text-white">
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold leading-tight">
                  {title}
                </h1>
                <p className="text-sm sm:text-base font-medium opacity-90 leading-snug">
                  {subtitle}
                </p>
              </div>
            </div>

            {/* RIGHT SIDE (Buttons) */}
            <div className="flex flex-wrap gap-3 justify-start md:justify-end w-full md:w-auto">
              {buttons.map((btn, idx) => (
                <Button
                  key={idx}
                  className={`rounded-full py-2 px-4 sm:px-6 flex items-center gap-2 border transition-colors text-sm sm:text-base ${btn.variant === "white"
                    ? "border-white bg-white text-primary hover:bg-gray-50"
                    : btn.variant === "outline"
                      ? "border-white bg-transparent text-white hover:bg-white/10"
                      : "bg-transparent text-white hover:bg-white/10"
                    }`}
                  onPress={btn.onClick}
                >
                  {btn.icon}
                  <span>{btn.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* === Chips Section (Optional) === */}
        {chips?.length > 0 && (
          <div className="px-4 sm:px-6 md:px-8 py-2 flex flex-wrap items-center gap-2">
            {chips.map((chip, idx) => (
              <Chip
                key={idx}
                className="bg-white/10 border border-white/20 text-white px-3 py-1 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2 relative">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: chip.color || "#4ade80" }}
                  />
                  <span>{chip.label}</span>
                </div>
              </Chip>
            ))}

            {totalLabel && (
              <p className="text-white text-xs sm:text-sm md:text-base font-medium">
                {totalLabel}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );

}

