import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";

import TextInput from "../../InputController/text-input";

import { useAuth } from "@/config/AuthContext";
import { User, LoginResponse } from "@/interface";
import { loginService } from "@/services/Auth/index.ts";


export function LoginCard() {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth(); // <-- use context API


  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (value: string, name?: string) => {
    if (!name) return;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }))

    return;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here
    const response: LoginResponse = await loginService(credentials);
    const result = response;
    
    // console.log("Login Response:", response);

    // const result = {
    //   "data": {
    //     "id": 2,
    //     "email": "Kunal@testing.com",
    //     "password": "08556fb41f9caff5a0a7ce74a4a555ed",
    //     "firstName": "Test",
    //     "lastName": "Team",
    //     "parentId": 1,
    //     "profileStatus": "Approved",
    //     "roleId": 1,
    //     "status": 1,
    //     "lastLogin": null,
    //     "phone": null,
    //     "createdAt": "2025-11-11T09:01:09.723Z",
    //     "updatedAt": "2025-11-11T09:14:45.529Z",
    //     "clientId": 1,
    //     "role": {
    //       "id": 1,
    //       "name": "Client User",
    //       "createdAt": "2025-11-10T10:57:41.097Z",
    //       "updatedAt": "2025-11-10T10:57:41.097Z",
    //       "permissions": [
    //         {
    //           "id": 1,
    //           "module": "mediaManagement",
    //           "canCreate": true,
    //           "canRead": true,
    //           "canUpdate": true,
    //           "canDelete": true,
    //           "roleId": 1,
    //           "createdAt": "2025-11-10T10:58:22.379Z",
    //           "updatedAt": "2025-11-10T10:58:22.379Z"
    //         },
    //         {
    //           "id": 2,
    //           "module": "playlist",
    //           "canCreate": true,
    //           "canRead": true,
    //           "canUpdate": true,
    //           "canDelete": true,
    //           "roleId": 1,
    //           "createdAt": "2025-11-10T10:58:22.379Z",
    //           "updatedAt": "2025-11-10T10:58:22.379Z"
    //         },
    //         {
    //           "id": 3,
    //           "module": "reports",
    //           "canCreate": true,
    //           "canRead": true,
    //           "canUpdate": true,
    //           "canDelete": true,
    //           "roleId": 1,
    //           "createdAt": "2025-11-10T10:58:22.379Z",
    //           "updatedAt": "2025-11-10T10:58:22.379Z"
    //         },
    //         {
    //           "id": 4,
    //           "module": "user",
    //           "canCreate": true,
    //           "canRead": true,
    //           "canUpdate": true,
    //           "canDelete": true,
    //           "roleId": 1,
    //           "createdAt": "2025-11-10T10:58:22.379Z",
    //           "updatedAt": "2025-11-10T10:58:22.379Z"
    //         },
    //         {
    //           "id": 5,
    //           "module": "rolesManagement",
    //           "canCreate": true,
    //           "canRead": true,
    //           "canUpdate": true,
    //           "canDelete": true,
    //           "roleId": 1,
    //           "createdAt": "2025-11-10T10:58:22.379Z",
    //           "updatedAt": "2025-11-10T10:58:22.379Z"
    //         },
    //         {
    //           "id": 6,
    //           "module": "groupManagement",
    //           "canCreate": true,
    //           "canRead": true,
    //           "canUpdate": true,
    //           "canDelete": true,
    //           "roleId": 1,
    //           "createdAt": "2025-11-10T10:58:22.379Z",
    //           "updatedAt": "2025-11-10T10:58:22.379Z"
    //         },
    //         {
    //           "id": 7,
    //           "module": "deviceManagement",
    //           "canCreate": true,
    //           "canRead": true,
    //           "canUpdate": true,
    //           "canDelete": true,
    //           "roleId": 1,
    //           "createdAt": "2025-11-10T10:58:22.379Z",
    //           "updatedAt": "2025-11-10T10:58:22.379Z"
    //         },
    //         {
    //           "id": 8,
    //           "module": "orderManagement",
    //           "canCreate": true,
    //           "canRead": true,
    //           "canUpdate": true,
    //           "canDelete": true,
    //           "roleId": 1,
    //           "createdAt": "2025-11-10T10:58:22.379Z",
    //           "updatedAt": "2025-11-10T10:58:22.379Z"
    //         }
    //       ]
    //     }
    //   },
    //   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJjbGllbnRJZCI6MSwicm9sZSI6Ilt7XCJpZFwiOjEsXCJtb2R1bGVcIjpcIm1lZGlhTWFuYWdlbWVudFwiLFwiY2FuQ3JlYXRlXCI6dHJ1ZSxcImNhblJlYWRcIjp0cnVlLFwiY2FuVXBkYXRlXCI6dHJ1ZSxcImNhbkRlbGV0ZVwiOnRydWUsXCJyb2xlSWRcIjoxLFwiY3JlYXRlZEF0XCI6XCIyMDI1LTExLTEwVDEwOjU4OjIyLjM3OVpcIixcInVwZGF0ZWRBdFwiOlwiMjAyNS0xMS0xMFQxMDo1ODoyMi4zNzlaXCJ9LHtcImlkXCI6MixcIm1vZHVsZVwiOlwicGxheWxpc3RcIixcImNhbkNyZWF0ZVwiOnRydWUsXCJjYW5SZWFkXCI6dHJ1ZSxcImNhblVwZGF0ZVwiOnRydWUsXCJjYW5EZWxldGVcIjp0cnVlLFwicm9sZUlkXCI6MSxcImNyZWF0ZWRBdFwiOlwiMjAyNS0xMS0xMFQxMDo1ODoyMi4zNzlaXCIsXCJ1cGRhdGVkQXRcIjpcIjIwMjUtMTEtMTBUMTA6NTg6MjIuMzc5WlwifSx7XCJpZFwiOjMsXCJtb2R1bGVcIjpcInJlcG9ydHNcIixcImNhbkNyZWF0ZVwiOnRydWUsXCJjYW5SZWFkXCI6dHJ1ZSxcImNhblVwZGF0ZVwiOnRydWUsXCJjYW5EZWxldGVcIjp0cnVlLFwicm9sZUlkXCI6MSxcImNyZWF0ZWRBdFwiOlwiMjAyNS0xMS0xMFQxMDo1ODoyMi4zNzlaXCIsXCJ1cGRhdGVkQXRcIjpcIjIwMjUtMTEtMTBUMTA6NTg6MjIuMzc5WlwifSx7XCJpZFwiOjQsXCJtb2R1bGVcIjpcInVzZXJcIixcImNhbkNyZWF0ZVwiOnRydWUsXCJjYW5SZWFkXCI6dHJ1ZSxcImNhblVwZGF0ZVwiOnRydWUsXCJjYW5EZWxldGVcIjp0cnVlLFwicm9sZUlkXCI6MSxcImNyZWF0ZWRBdFwiOlwiMjAyNS0xMS0xMFQxMDo1ODoyMi4zNzlaXCIsXCJ1cGRhdGVkQXRcIjpcIjIwMjUtMTEtMTBUMTA6NTg6MjIuMzc5WlwifSx7XCJpZFwiOjUsXCJtb2R1bGVcIjpcInJvbGVzTWFuYWdlbWVudFwiLFwiY2FuQ3JlYXRlXCI6dHJ1ZSxcImNhblJlYWRcIjp0cnVlLFwiY2FuVXBkYXRlXCI6dHJ1ZSxcImNhbkRlbGV0ZVwiOnRydWUsXCJyb2xlSWRcIjoxLFwiY3JlYXRlZEF0XCI6XCIyMDI1LTExLTEwVDEwOjU4OjIyLjM3OVpcIixcInVwZGF0ZWRBdFwiOlwiMjAyNS0xMS0xMFQxMDo1ODoyMi4zNzlaXCJ9LHtcImlkXCI6NixcIm1vZHVsZVwiOlwiZ3JvdXBNYW5hZ2VtZW50XCIsXCJjYW5DcmVhdGVcIjp0cnVlLFwiY2FuUmVhZFwiOnRydWUsXCJjYW5VcGRhdGVcIjp0cnVlLFwiY2FuRGVsZXRlXCI6dHJ1ZSxcInJvbGVJZFwiOjEsXCJjcmVhdGVkQXRcIjpcIjIwMjUtMTEtMTBUMTA6NTg6MjIuMzc5WlwiLFwidXBkYXRlZEF0XCI6XCIyMDI1LTExLTEwVDEwOjU4OjIyLjM3OVpcIn0se1wiaWRcIjo3LFwibW9kdWxlXCI6XCJkZXZpY2VNYW5hZ2VtZW50XCIsXCJjYW5DcmVhdGVcIjp0cnVlLFwiY2FuUmVhZFwiOnRydWUsXCJjYW5VcGRhdGVcIjp0cnVlLFwiY2FuRGVsZXRlXCI6dHJ1ZSxcInJvbGVJZFwiOjEsXCJjcmVhdGVkQXRcIjpcIjIwMjUtMTEtMTBUMTA6NTg6MjIuMzc5WlwiLFwidXBkYXRlZEF0XCI6XCIyMDI1LTExLTEwVDEwOjU4OjIyLjM3OVpcIn0se1wiaWRcIjo4LFwibW9kdWxlXCI6XCJvcmRlck1hbmFnZW1lbnRcIixcImNhbkNyZWF0ZVwiOnRydWUsXCJjYW5SZWFkXCI6dHJ1ZSxcImNhblVwZGF0ZVwiOnRydWUsXCJjYW5EZWxldGVcIjp0cnVlLFwicm9sZUlkXCI6MSxcImNyZWF0ZWRBdFwiOlwiMjAyNS0xMS0xMFQxMDo1ODoyMi4zNzlaXCIsXCJ1cGRhdGVkQXRcIjpcIjIwMjUtMTEtMTBUMTA6NTg6MjIuMzc5WlwifV0iLCJpYXQiOjE3NjI4NTI2NTIsImV4cCI6MTc2MjkzOTA1Mn0.v_-ZcnJtFvxh3fZ4KPF0Qjr5z5N6aIrV4tCf7ZfjYAQ"
    // }


    const token = result.token;
    const userData = result.data as unknown as User;

    await loginWithToken(token || "", userData || {});

    navigate("/dashboard");

  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="bg-white w-full max-w-[596px] mx-auto border border-gray-300 rounded-2xl sm:rounded-[30px] px-4 py-6 sm:px-8 sm:px-[38px] sm:py-8 sm:py-[30px] shadow-sm">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
            Welcome back!
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              className="text-primary hover:text-primary/80 font-medium transition-colors"
              to="/register"
            >
              Register now
            </Link>
          </p>
        </div>

        <div className="mt-6 sm:mt-8 md:mt-[58px]">
          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            {/* Email Address */}
            <TextInput
              required
              id="email"
              label="Email address"
              name="email"
              placeholder="mail@example.com"
              type="email"
              validate={(val) => {
                if (!val.includes("@")) return "Invalid email address";

                return null;
              }}
              value={credentials.email}
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
              value={credentials.password}
              onChange={handleChange}
            />

            {/* Forgot Password Link */}
            <div className="flex justify-end -mt-2">
              <Link
                className="text-sm sm:text-base text-primary hover:text-primary/80 font-medium transition-colors"
                to="/forgot-password"
              >
                Forgot your password?
              </Link>
            </div>

            {/* reCAPTCHA */}
            <div className="flex items-start justify-start py-2">
              <div className="flex items-center gap-2 p-2 border border-gray-300 rounded bg-white">
                <input
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                  id="recaptcha"
                  type="checkbox"
                />
                <label
                  className="text-sm text-gray-700 cursor-pointer flex items-center gap-2"
                  htmlFor="recaptcha"
                >
                  <span>I&apos;m not a robot</span>
                  <div className="flex items-center gap-1 ml-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <div className="flex flex-col text-[10px] leading-tight">
                      <span className="text-blue-600 font-semibold">reCAPTCHA</span>
                      <span className="text-gray-500">Privacy - Terms</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Login Button */}
            <Button
              className="w-full rounded-lg sm:rounded text-base sm:text-base font-medium bg-primary text-white hover:bg-primary/90 transition-all"
              type="submit"
            >
              Login Now
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
