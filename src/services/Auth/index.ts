export const baseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;
export const versionApi = import.meta.env.VITE_PUBLIC_VERSION_API_URL;
export const TOKEN_KEY = import.meta.env.VITE_PUBLIC_TOKEN_KEY;
import { LoginFormData, LoginResponse, OTPFormData } from "@/interface/index.ts";

// Function to handle login service
export const loginService = async (
  formData: LoginFormData
): Promise<LoginResponse> => {
  const response = await fetch(`${baseUrl}${versionApi}/client/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((response) => response.json());

  return response;
};

// export const notificationList = async <T = unknown>(payload: Record<string, string>): Promise<apiResponse<T>> => {
//     const token = localStorage.getItem(TOKEN_KEY) || null;
//     const response = await fetch(`${baseUrl}${versionApi}/admin/auth/notifications?${new URLSearchParams(payload)}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "x-access-token": token || "",
//         },
//     }).then((response) => response.json());
//     return response;
// }

export const verifyOTPService = async (
  formData: OTPFormData
): Promise<LoginResponse> => {
  const response = await fetch(
    `${baseUrl}${versionApi}/client/auth/VerifyOTP`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  ).then((response) => response.json());

  return response;
};
