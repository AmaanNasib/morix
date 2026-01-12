import { Button } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextInput from "../InputController/text-input";

import { useAuth } from "@/config/AuthContext";
// import { User } from "@/interface";
export interface LoginResponse {
  data: User;
  token: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  parentId: number;
  profileStatus: string; // or: "Approved" | "Pending" | ...
  roleId: number;
  status: number;
  lastLogin: string | null;
  phone: string | null;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  clientId: number;
  role: Role;
}

export interface Role {
  id: number;
  name: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  permissions: Permission[];
}

export interface Permission {
  id: number;
  module: string; // or a union of known modules
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  roleId: number;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}


export function LoginCard() {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth(); // <-- use context API


  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (value: string, name?: string) => {
    if (!name) return;
    setCredentials({
      ...credentials,
      [name]: value,
    })
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Credentials:", credentials);
    // const response: LoginResponse = await loginService(credentials);
    // // if (!response.success) return;

    const result: LoginResponse = {
      "data": {
        "id": 2,
        "email": "Kunal@testing.com",
        "password": "08556fb41f9caff5a0a7ce74a4a555ed",
        "firstName": "Test",
        "lastName": "Team",
        "parentId": 1,
        "profileStatus": "Approved",
        "roleId": 1,
        "status": 1,
        "lastLogin": null,
        "phone": null,
        "createdAt": "2025-11-11T09:01:09.723Z",
        "updatedAt": "2025-11-11T09:14:45.529Z",
        "clientId": 1,
        "role": {
          "id": 1,
          "name": "Client User",
          "createdAt": "2025-11-10T10:57:41.097Z",
          "updatedAt": "2025-11-10T10:57:41.097Z",
          "permissions": [
            {
              "id": 1,
              "module": "mediaManagement",
              "canCreate": true,
              "canRead": true,
              "canUpdate": true,
              "canDelete": true,
              "roleId": 1,
              "createdAt": "2025-11-10T10:58:22.379Z",
              "updatedAt": "2025-11-10T10:58:22.379Z"
            },
            {
              "id": 2,
              "module": "playlist",
              "canCreate": true,
              "canRead": true,
              "canUpdate": true,
              "canDelete": true,
              "roleId": 1,
              "createdAt": "2025-11-10T10:58:22.379Z",
              "updatedAt": "2025-11-10T10:58:22.379Z"
            },
            {
              "id": 3,
              "module": "reports",
              "canCreate": true,
              "canRead": true,
              "canUpdate": true,
              "canDelete": true,
              "roleId": 1,
              "createdAt": "2025-11-10T10:58:22.379Z",
              "updatedAt": "2025-11-10T10:58:22.379Z"
            },
            {
              "id": 4,
              "module": "user",
              "canCreate": true,
              "canRead": true,
              "canUpdate": true,
              "canDelete": true,
              "roleId": 1,
              "createdAt": "2025-11-10T10:58:22.379Z",
              "updatedAt": "2025-11-10T10:58:22.379Z"
            },
            {
              "id": 5,
              "module": "rolesManagement",
              "canCreate": true,
              "canRead": true,
              "canUpdate": true,
              "canDelete": true,
              "roleId": 1,
              "createdAt": "2025-11-10T10:58:22.379Z",
              "updatedAt": "2025-11-10T10:58:22.379Z"
            },
            {
              "id": 6,
              "module": "groupManagement",
              "canCreate": true,
              "canRead": true,
              "canUpdate": true,
              "canDelete": true,
              "roleId": 1,
              "createdAt": "2025-11-10T10:58:22.379Z",
              "updatedAt": "2025-11-10T10:58:22.379Z"
            },
            {
              "id": 7,
              "module": "deviceManagement",
              "canCreate": true,
              "canRead": true,
              "canUpdate": true,
              "canDelete": true,
              "roleId": 1,
              "createdAt": "2025-11-10T10:58:22.379Z",
              "updatedAt": "2025-11-10T10:58:22.379Z"
            },
            {
              "id": 8,
              "module": "orderManagement",
              "canCreate": true,
              "canRead": true,
              "canUpdate": true,
              "canDelete": true,
              "roleId": 1,
              "createdAt": "2025-11-10T10:58:22.379Z",
              "updatedAt": "2025-11-10T10:58:22.379Z"
            }
          ]
        }
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJjbGllbnRJZCI6MSwicm9sZSI6Ilt7XCJpZFwiOjEsXCJtb2R1bGVcIjpcIm1lZGlhTWFuYWdlbWVudFwiLFwiY2FuQ3JlYXRlXCI6dHJ1ZSxcImNhblJlYWRcIjp0cnVlLFwiY2FuVXBkYXRlXCI6dHJ1ZSxcImNhbkRlbGV0ZVwiOnRydWUsXCJyb2xlSWRcIjoxLFwiY3JlYXRlZEF0XCI6XCIyMDI1LTExLTEwVDEwOjU4OjIyLjM3OVpcIixcInVwZGF0ZWRBdFwiOlwiMjAyNS0xMS0xMFQxMDo1ODoyMi4zNzlaXCJ9LHtcImlkXCI6MixcIm1vZHVsZVwiOlwicGxheWxpc3RcIixcImNhbkNyZWF0ZVwiOnRydWUsXCJjYW5SZWFkXCI6dHJ1ZSxcImNhblVwZGF0ZVwiOnRydWUsXCJjYW5EZWxldGVcIjp0cnVlLFwicm9sZUlkXCI6MSxcImNyZWF0ZWRBdFwiOlwiMjAyNS0xMS0xMFQxMDo1ODoyMi4zNzlaXCIsXCJ1cGRhdGVkQXRcIjpcIjIwMjUtMTEtMTBUMTA6NTg6MjIuMzc5WlwifSx7XCJpZFwiOjMsXCJtb2R1bGVcIjpcInJlcG9ydHNcIixcImNhbkNyZWF0ZVwiOnRydWUsXCJjYW5SZWFkXCI6dHJ1ZSxcImNhblVwZGF0ZVwiOnRydWUsXCJjYW5EZWxldGVcIjp0cnVlLFwicm9sZUlkXCI6MSxcImNyZWF0ZWRBdFwiOlwiMjAyNS0xMS0xMFQxMDo1ODoyMi4zNzlaXCIsXCJ1cGRhdGVkQXRcIjpcIjIwMjUtMTEtMTBUMTA6NTg6MjIuMzc5WlwifSx7XCJpZFwiOjQsXCJtb2R1bGVcIjpcInVzZXJcIixcImNhbkNyZWF0ZVwiOnRydWUsXCJjYW5SZWFkXCI6dHJ1ZSxcImNhblVwZGF0ZVwiOnRydWUsXCJjYW5EZWxldGVcIjp0cnVlLFwicm9sZUlkXCI6MSxcImNyZWF0ZWRBdFwiOlwiMjAyNS0xMS0xMFQxMDo1ODoyMi4zNzlaXCIsXCJ1cGRhdGVkQXRcIjpcIjIwMjUtMTEtMTBUMTA6NTg6MjIuMzc5WlwifSx7XCJpZFwiOjUsXCJtb2R1bGVcIjpcInJvbGVzTWFuYWdlbWVudFwiLFwiY2FuQ3JlYXRlXCI6dHJ1ZSxcImNhblJlYWRcIjp0cnVlLFwiY2FuVXBkYXRlXCI6dHJ1ZSxcImNhbkRlbGV0ZVwiOnRydWUsXCJyb2xlSWRcIjoxLFwiY3JlYXRlZEF0XCI6XCIyMDI1LTExLTEwVDEwOjU4OjIyLjM3OVpcIixcInVwZGF0ZWRBdFwiOlwiMjAyNS0xMS0xMFQxMDo1ODoyMi4zNzlaXCJ9LHtcImlkXCI6NixcIm1vZHVsZVwiOlwiZ3JvdXBNYW5hZ2VtZW50XCIsXCJjYW5DcmVhdGVcIjp0cnVlLFwiY2FuUmVhZFwiOnRydWUsXCJjYW5VcGRhdGVcIjp0cnVlLFwiY2FuRGVsZXRlXCI6dHJ1ZSxcInJvbGVJZFwiOjEsXCJjcmVhdGVkQXRcIjpcIjIwMjUtMTEtMTBUMTA6NTg6MjIuMzc5WlwiLFwidXBkYXRlZEF0XCI6XCIyMDI1LTExLTEwVDEwOjU4OjIyLjM3OVpcIn0se1wiaWRcIjo3LFwibW9kdWxlXCI6XCJkZXZpY2VNYW5hZ2VtZW50XCIsXCJjYW5DcmVhdGVcIjp0cnVlLFwiY2FuUmVhZFwiOnRydWUsXCJjYW5VcGRhdGVcIjp0cnVlLFwiY2FuRGVsZXRlXCI6dHJ1ZSxcInJvbGVJZFwiOjEsXCJjcmVhdGVkQXRcIjpcIjIwMjUtMTEtMTBUMTA6NTg6MjIuMzc5WlwiLFwidXBkYXRlZEF0XCI6XCIyMDI1LTExLTEwVDEwOjU4OjIyLjM3OVpcIn0se1wiaWRcIjo4LFwibW9kdWxlXCI6XCJvcmRlck1hbmFnZW1lbnRcIixcImNhbkNyZWF0ZVwiOnRydWUsXCJjYW5SZWFkXCI6dHJ1ZSxcImNhblVwZGF0ZVwiOnRydWUsXCJjYW5EZWxldGVcIjp0cnVlLFwicm9sZUlkXCI6MSxcImNyZWF0ZWRBdFwiOlwiMjAyNS0xMS0xMFQxMDo1ODoyMi4zNzlaXCIsXCJ1cGRhdGVkQXRcIjpcIjIwMjUtMTEtMTBUMTA6NTg6MjIuMzc5WlwifV0iLCJpYXQiOjE3NjI4NTI2NTIsImV4cCI6MTc2MjkzOTA1Mn0.v_-ZcnJtFvxh3fZ4KPF0Qjr5z5N6aIrV4tCf7ZfjYAQ"
    }


    const token = result.token;
    const userData: any = result.data;

    await loginWithToken(token || "", userData || {});

    navigate("/dashboard");

  };

  return (
    <div className="max-w-[596px] max-h-[582px] min-w-[400px] min-h-[400px] mx-auto mt-12 p-8 shadow-lg rounded-[20px] bg-white">
      <h2 className="text-xl font-bold mb-2 text-center">Welcome back!</h2>

      <p className="mb-4 text-gray-700 text-center">
        Don’t have an account?{" "}
        <a className="text-blue-500" href="/">
          Register now
        </a>
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <TextInput
            required
            // className="mt-2 block w-full"
            label="Email address"
            name="email"
            placeholder="Email address"
            type="email"
            validate={(val) => {
              if (!val.includes("@")) return "Invalid email address";

              return null;
            }}
            value={credentials.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <TextInput
            required
            // className="mt-2 block w-full"
            label="Password"
            name="password"
            placeholder="Password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end -mt-3">
          <a className="text-sm text-blue-500" href="/">
            Forgot your password?
          </a>
        </div>

        <Button
          className="w-full bg-primary text-white py-2 rounded"
          type="submit"
        >
          Login Now
        </Button>
      </form>
    </div>
  );
}
