import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@heroui/button";

interface VerifyCodeProps {
    email?: string;
    mobileNumber?: string;
    onVerify?: (code: string) => void;
}

export default function VerifyCode({ email, mobileNumber, onVerify }: VerifyCodeProps) {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string>("");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Check if all OTP fields are filled
    const isDisabled = useMemo(() => {
        return otp.some((digit) => !digit);
    }, [otp]);

    // Handle OTP input change
    const handleOtpChange = (index: number, value: string) => {
        // Only allow single digit
        if (value.length > 1) {
            return;
        }

        // Only allow numbers
        if (value && !/^\d$/.test(value)) {
            return;
        }

        const newOtp = [...otp];
        
        newOtp[index] = value;
        setOtp(newOtp);

        // Clear error when user starts typing
        if (submitError) {
            setSubmitError("");
        }

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle backspace
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Handle paste
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);

        if (/^\d+$/.test(pastedData)) {
            const newOtp = [...otp];

            pastedData.split("").forEach((digit, index) => {
                if (index < 6) {
                    newOtp[index] = digit;
                }
            });
            setOtp(newOtp);

            // Focus the last filled input or the last input
            const lastFilledIndex = Math.min(pastedData.length - 1, 5);

            inputRefs.current[lastFilledIndex]?.focus();
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError("");

        const code = otp.join("");

        if (code.length !== 6) {
            setSubmitError("Please enter the complete 6-digit code");

            return;
        }

        setIsLoading(true);

        try {
            // TODO: Replace with actual API call
            // const response = await verifyOtpService({ 
            //     code,
            //     email: email || undefined,
            //     mobileNumber: mobileNumber || undefined 
            // });
            // if (response.success) {
            //     onVerify?.(code);
            // } else {
            //     setSubmitError(response.message || "Invalid code. Please try again.");
            // }

            // Simulated API call for now
            await new Promise((resolve) => setTimeout(resolve, 1500));
            onVerify?.(code);
        } catch (error) {
            setSubmitError("An error occurred. Please try again.");
            console.error("Verify code error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Determine the subtitle message based on email or mobile number
    const subtitleMessage = useMemo(() => {
        if (email) {
            return "We have sent you a OTP to your email address.";
        }

        if (mobileNumber) {
            return "We have sent you a OTP to your mobile number.";
        }

        return "We have sent you a OTP to your email address.";
    }, [email, mobileNumber]);

    // Auto-focus first input on mount
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12">
            <div className="bg-white w-full max-w-[596px] mx-auto border border-gray-300 rounded-2xl sm:rounded-[30px] px-4 py-6 sm:px-8 sm:px-[38px] sm:py-8 sm:py-[30px] shadow-sm">
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                        Verify your code
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                        {subtitleMessage}
                    </p>
                </div>

                <div className="mt-6 sm:mt-8 md:mt-[58px]">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* OTP Input Fields */}
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                            {/* First group of 3 digits */}
                            {otp.slice(0, 3).map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                    }}
                                    className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-semibold border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    inputMode="numeric"
                                    maxLength={1}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={index === 0 ? handlePaste : undefined}
                                />
                            ))}

                            {/* Separator */}
                            <span className="text-gray-400 text-xl sm:text-2xl font-medium mx-1 sm:mx-2">
                                -
                            </span>

                            {/* Second group of 3 digits */}
                            {otp.slice(3, 6).map((digit, index) => (
                                <input
                                    key={index + 3}
                                    ref={(el) => {
                                        inputRefs.current[index + 3] = el;
                                    }}
                                    className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-semibold border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    inputMode="numeric"
                                    maxLength={1}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index + 3, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index + 3, e)}
                                />
                            ))}
                        </div>

                        {/* Submit Error */}
                        {submitError && (
                            <div
                                className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg text-center"
                                role="alert"
                            >
                                {submitError}
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            className={`w-full rounded-lg sm:rounded text-base sm:text-base font-medium transition-all ${
                                isDisabled || isLoading
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-primary text-white hover:bg-primary/90"
                            }`}
                            disabled={isDisabled || isLoading}
                            type="submit"
                        >
                            {isLoading ? "Verifying..." : "Submit"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

