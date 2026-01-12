export const baseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;
export const versionApi = import.meta.env.VITE_PUBLIC_VERSION_API_URL;
export const TOKEN_KEY = import.meta.env.VITE_PUBLIC_TOKEN_KEY;
import { apiResponse, apiResponseAdd } from "@/interface/index.ts";



// Function to handle login service
export const teamAdd = async (payload: object): Promise<apiResponseAdd> => {
    const token = localStorage.getItem(TOKEN_KEY) || null;
    const response = await fetch(`${baseUrl}${versionApi}/admin/teams/add-team`, {
        method: "POST",
        headers: {
            "x-access-token": token || "",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    }).then((response) => response.json());

    return response;
}

export const fetchTeamList = async <T = unknown>(payload: Record<string, string>): Promise<apiResponse<T>> => {
    const token = localStorage.getItem(TOKEN_KEY) || null;
    const response = await fetch(`${baseUrl}${versionApi}/admin/teams/team-list?${new URLSearchParams(payload)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token || "",
        },
    }).then((response) => response.json());

    return response;
}

