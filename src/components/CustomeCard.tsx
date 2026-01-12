import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

export interface CardData {
    id: number;
    type: "primary" | "secondary" | "info" | "warning";
    icon: React.ReactNode;
    primaryText: string | number;
    secondaryText: string | number;
    trend?: {
        value: string; // e.g. "12.5%"
        direction: "up" | "down";
    };
    color?: string; // hex or tailwind color
    bottomTag?: string;
}[];

interface CustomCardProps {
    data: CardData;
}

export const CustomCard: React.FC<CustomCardProps> = ({ data }) => {
    const { type, icon, primaryText, secondaryText, trend, color } = data;

    // Default color mapping
    const getDefaultColor = () => {
        switch (type) {
            case "primary":
                return "#16A34A"; // green-600
            case "secondary":
                return "#2563EB"; // blue-600
            case "info":
                return "#0284C7"; // sky-600
            case "warning":
                return "#FACC15"; // yellow-400
            default:
                return "#6B7280"; // gray-500
        }
    };

    const iconColor = color || getDefaultColor();


    const renderTrendBadge = () => {
        if (!trend) return null;

        const isUp = trend.direction === "up";
        const badgeColor = isUp ? "bg-green-500" : "bg-orange-500";
        const Icon = isUp ? TrendingUp : TrendingDown;

        return (
            <div
                className={`absolute -top-2 right-2 flex items-center gap-1 px-2 py-[2px] text-xs font-medium text-white rounded-full ${badgeColor}`}
            >
                <Icon className="w-3 h-3" />
                {trend.value}
            </div>
        );
    };

    // Conditionally render styles based on type
    const renderCard = () => {
        switch (type) {
            case "primary":
                return (
                    <div className="relative bg-white shadow-md rounded-xl p-4 border border-gray-100 flex items-center gap-4 w-full max-w-sm transition-all hover:shadow-lg">
                        {/* Trend Badge */}
                        {renderTrendBadge()}

                        {/* Icon Box */}
                        <div
                            className="flex items-center justify-center min-w-12 h-12 rounded-md text-white"
                            style={{ backgroundColor: iconColor }}
                        >
                            {icon}
                        </div>

                        {/* Text */}
                        <div className="flex flex-col justify-center">
                            <h3 className="text-gray-800 font-semibold text-base">{secondaryText}</h3>
                            <p className="text-2xl font-bold text-gray-900 leading-tight">
                                {primaryText}
                            </p>
                        </div>
                    </div>
                );

            case "secondary":
                return (
                    <div className="relative bg-white rounded-xl p-5 border border-gray-100 shadow-md hover:shadow-lg transition-all max-w-sm flex flex-col overflow-hidden">
                        {/* Left Accent Strip */}
                        <div
                            className="absolute top-0 left-0 h-full w-2 rounded-l-xl"
                            style={{ backgroundColor: iconColor }}
                        />

                        {/* Top Section */}
                        <div className="flex justify-between items-start pl-2">
                            <div>
                                <p className="text-sm font-semibold text-gray-500 tracking-wide">
                                    {secondaryText}
                                </p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{primaryText}</p>
                            </div>
                            <div
                                className="flex items-center justify-center w-12 h-12 rounded-md text-white"
                                style={{ backgroundColor: iconColor }}
                            >
                                {icon}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="my-3 border-t border-gray-200" />

                        {/* Bottom Tag */}
                        {data.bottomTag && (
                            <div
                                className="inline-block px-3 py-1 rounded-full text-sm font-medium ml-2 w-fit"
                                style={{
                                    backgroundColor: `${iconColor}15`, // translucent background
                                    color: iconColor,
                                }}
                            >
                                {data.bottomTag}
                            </div>
                        )}
                    </div>
                );

            case "info":
                return (
                    <div className="flex items-center gap-3 bg-blue-50 text-blue-900 shadow rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-blue-600 text-white">
                            {icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">{primaryText}</h3>
                            <p className="text-sm text-blue-700">{secondaryText}</p>
                        </div>
                    </div>
                );

            case "warning":
                return (
                    <div className="flex items-center gap-3 bg-yellow-50 text-yellow-900 shadow rounded-lg p-4 border border-yellow-200">
                        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-yellow-500 text-white">
                            {icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">{primaryText}</h3>
                            <p className="text-sm text-yellow-700">{secondaryText}</p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return renderCard();
};
