import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@heroui/button";

import TextInput from "@/components/InputController/text-input";

interface RegisterProps {
    fullName: string;
    email: string;
    phone: string;
    password: string;
}

export default function Register() {
    // const navigate = useNavigate(); // TODO: Uncomment when implementing navigation after registration
    const [formData, setFormData] = useState<RegisterProps>({
        fullName: "",
        email: "",
        phone: "",
        password: "",
    });
    const [verifyPassword, setVerifyPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string>("");

    // Optimize validation with useMemo
    const isDisabled = useMemo(() => {
        return (
            !formData.fullName.trim() ||
            !formData.email.trim() ||
            !formData.phone.trim() ||
            !formData.password ||
            !verifyPassword ||
            formData.password !== verifyPassword
        );
    }, [formData, verifyPassword]);

    // Handle form input changes
    const handleChange = (value: string, name?: string) => {
        if (!name) return;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear submit error when user starts typing
        if (submitError) {
            setSubmitError("");
        }
    };

    // Email validation
    const validateEmail = (email: string): string | null => {
        if (!email) return "Email is required";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) return "Please enter a valid email address";

        return null;
    };

    // Phone validation
    const validatePhone = (phone: string): string | null => {
        if (!phone) return "Phone number is required";

        const phoneRegex = /^[\d\s\+\-\(\)]+$/;

        if (!phoneRegex.test(phone)) return "Please enter a valid phone number";

        if (phone.replace(/\D/g, "").length < 10) return "Phone number must be at least 10 digits";

        return null;
    };

    // Password validation
    const validatePassword = (password: string): string | null => {
        if (!password) return "Password is required";
        if (password.length < 8) return "Password must be at least 8 characters";

        return null;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError("");

        // Validate all fields
        const emailError = validateEmail(formData.email);
        const phoneError = validatePhone(formData.phone);
        const passwordError = validatePassword(formData.password);

        if (emailError || phoneError || passwordError) {
            setSubmitError("Please fix the errors in the form");

            return;
        }

        if (formData.password !== verifyPassword) {
            setSubmitError("Passwords do not match");

            return;
        }

        setIsLoading(true);

        try {
            // TODO: Replace with actual API call
            // const response = await registerService(formData);
            // if (response.success) {
            //     navigate("/login");
            // } else {
            //     setSubmitError(response.message || "Registration failed. Please try again.");
            // }

            // Simulated API call for now
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // Navigate to login or dashboard after successful registration
            // navigate("/login");
        } catch (error) {
            setSubmitError("An error occurred. Please try again later.");
            console.error("Registration error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12">
            <div className="bg-white w-full max-w-[596px] mx-auto border border-gray-300 rounded-2xl sm:rounded-[30px] px-4 py-6 sm:px-8 sm:px-[38px] sm:py-8 sm:py-[30px] shadow-sm">
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                        Welcome!
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                        Already have an account?{" "}
                        <Link
                            className="text-primary hover:text-primary/80 font-medium transition-colors"
                            to="/"
                        >
                            Login now
                        </Link>
                    </p>
                </div>

                <div className="mt-6 sm:mt-8 md:mt-[58px]">
                    <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <TextInput
                            required
                            id="fullName"
                            label="Full Name"
                            name="fullName"
                            placeholder="John Doe"
                            type="text"
                            validate={(val) => {
                                if (!val.trim()) return "Full name is required";

                                return null;
                            }}
                            value={formData.fullName}
                            onChange={handleChange}
                        />

                        {/* Email Address */}
                        <TextInput
                            required
                            id="email"
                            label="Email address"
                            name="email"
                            placeholder="mail@example.com"
                            type="email"
                            validate={validateEmail}
                            value={formData.email}
                            onChange={handleChange}
                        />

                        {/* Mobile Number */}
                        <TextInput
                            required
                            id="phone"
                            label="Mobile Number"
                            name="phone"
                            placeholder="+91 90909 09090"
                            type="tel"
                            validate={validatePhone}
                            value={formData.phone}
                            onChange={handleChange}
                        />

                        {/* Password */}
                        <TextInput
                            required
                            id="password"
                            label="Password"
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                            validate={validatePassword}
                            value={formData.password}
                            onChange={handleChange}
                        />

                        {/* Re-enter Password */}
                        <TextInput
                            required
                            id="verifyPassword"
                            label="Confirm Password"
                            placeholder="Re-enter your password"
                            type="password"
                            validate={(val) => {
                                if (!val) return "Please confirm your password";
                                if (val !== formData.password) return "Passwords do not match";

                                return null;
                            }}
                            value={verifyPassword}
                            onChange={setVerifyPassword}
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

                        {/* Terms and Conditions */}
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 my-4 sm:my-6 leading-relaxed">
                            By clicking register now button I will accept{" "}
                            <Link
                                className="font-semibold text-primary underline hover:text-primary/80 transition-colors"
                                to="/terms"
                            >
                                terms & conditions
                            </Link>{" "}
                            and{" "}
                            <Link
                                className="font-semibold text-primary underline hover:text-primary/80 transition-colors"
                                to="/privacy"
                            >
                                Privacy policy
                            </Link>
                            .
                        </p>

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
                            {isLoading ? "Registering..." : "Register Now"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

