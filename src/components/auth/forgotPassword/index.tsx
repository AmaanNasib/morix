import { useState, useMemo } from "react";
import { Button } from "@heroui/button";

import VerifyCode from "./verifyCode";

import TextInput from "@/components/InputController/text-input";


export default function ForgotPassword() {
    const [email, setEmail] = useState<string>("");
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string>("");
    const [showVerifyCode, setShowVerifyCode] = useState<boolean>(false);

    // Optimize validation with useMemo - either email OR mobile number is required
    const isDisabled = useMemo(() => {
        return !email.trim() && !mobileNumber.trim();
    }, [email, mobileNumber]);

    // Email validation
    const validateEmail = (emailValue: string): string | null => {
        if (!emailValue) return null; // Not required if mobile is provided

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailValue)) return "Please enter a valid email address";

        return null;
    };

    // Phone validation
    const validatePhone = (phone: string): string | null => {
        if (!phone) return null; // Not required if email is provided

        const phoneRegex = /^[\d\s\+\-\(\)]+$/;

        if (!phoneRegex.test(phone)) return "Please enter a valid phone number";

        if (phone.replace(/\D/g, "").length < 10) return "Phone number must be at least 10 digits";

        return null;
    };

    // Handle email input change
    const handleEmailChange = (value: string, _name?: string) => {
        setEmail(value);

        // Clear mobile when email is entered
        if (value.trim()) {
            setMobileNumber("");
        }

        // Clear errors when user starts typing
        if (submitError) {
            setSubmitError("");
        }
    };

    // Handle mobile number input change
    const handleMobileChange = (value: string, _name?: string) => {
        setMobileNumber(value);

        // Clear email when mobile is entered
        if (value.trim()) {
            setEmail("");
        }

        // Clear errors when user starts typing
        if (submitError) {
            setSubmitError("");
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError("");

        // Validate that at least one field is provided
        if (!email.trim() && !mobileNumber.trim()) {
            setSubmitError("Please enter either email address or mobile number");

            return;
        }

        // Validate the provided field
        if (email.trim()) {
            const emailError = validateEmail(email);

            if (emailError) {
                setSubmitError(emailError);

                return;
            }
        }

        if (mobileNumber.trim()) {
            const phoneError = validatePhone(mobileNumber);

            if (phoneError) {
                setSubmitError(phoneError);

                return;
            }
        }

        setIsLoading(true);

        try {
            // TODO: Replace with actual API call
            // const response = await forgotPasswordService({ 
            //     email: email.trim() || undefined,
            //     mobileNumber: mobileNumber.trim() || undefined 
            // });
            // if (response.success) {
            //     // Handle success (show success message or redirect)
            // } else {
            //     setSubmitError(response.message || "Failed to send reset link. Please try again.");
            // }

            // Simulated API call for now
            await new Promise((resolve) => setTimeout(resolve, 1500));
            // Show verify code screen after successful submission
            setShowVerifyCode(true);
        } catch (error) {
            setSubmitError("An error occurred. Please try again later.");
            console.error("Forgot password error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Show verify code screen after successful submission
    if (showVerifyCode) {
        return (
            <VerifyCode
                email={email.trim() || undefined}
                mobileNumber={mobileNumber.trim() || undefined}
                onVerify={(_code) => {
                    // TODO: Navigate to reset password page or handle verification
                }}
            />
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12">
            <div className="bg-white w-full max-w-[596px] mx-auto border border-gray-300 rounded-2xl sm:rounded-[30px] px-4 py-6 sm:px-8 sm:px-[38px] sm:py-8 sm:py-[30px] shadow-sm">
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                        Forgot your password?
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                        Don&apos;t worry, we&apos;ll send you a link to reset your password. Not worry we have the way to reset it.
                    </p>
                </div>

                <div className="mt-6 sm:mt-8 md:mt-[58px]">
                    <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                        {/* Email Address */}
                        <TextInput
                            id="email"
                            label="Email address"
                            name="email"
                            placeholder="j.e.dukes@aol.com"
                            type="email"
                            validate={validateEmail}
                            value={email}
                            onChange={handleEmailChange}
                        />

                        {/* OR Separator */}
                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-gray-300"/>
                            <span className="px-4 text-sm font-medium text-gray-500 bg-white">
                                OR
                            </span>
                            <div className="flex-grow border-t border-gray-300"/>
                        </div>

                        {/* Mobile Number */}
                        <TextInput
                            id="mobileNumber"
                            label="Mobile number"
                            name="mobileNumber"
                            placeholder="+91 90909 09090"
                            type="tel"
                            validate={validatePhone}
                            value={mobileNumber}
                            onChange={handleMobileChange}
                        />

                        {/* Submit Error */}
                        {submitError && (
                            <div
                                className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg"
                                role="alert"
                            >
                                {submitError}
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            className={`w-full rounded-lg sm:rounded text-base sm:text-base font-medium transition-all ${
                                isDisabled || isLoading
                                    ? "opacity-50 cursor-not-allowed"
                                    : "bg-primary text-white hover:bg-primary/90"
                            }`}
                            disabled={isDisabled || isLoading}
                            type="submit"
                        >
                            {isLoading ? "Submitting..." : "Submit"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
