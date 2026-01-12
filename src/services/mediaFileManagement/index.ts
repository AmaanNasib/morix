export const baseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;
export const versionApi = import.meta.env.VITE_PUBLIC_VERSION_API_URL;
export const TOKEN_KEY = import.meta.env.VITE_PUBLIC_TOKEN_KEY;
import { apiResponse, apiResponseAdd } from "@/interface/index.ts";

export const getMediaList = async (): Promise<apiResponse> => {
    const token = localStorage.getItem(TOKEN_KEY) || "";

    const response = await fetch(
        `${baseUrl}${versionApi}/client/media/media-list`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token || "",
            },
        }
    ).then((response) => response.json())

    return response;
};

export const addMedia = async (formData: FormData): Promise<apiResponseAdd> => {
    const token = localStorage.getItem(TOKEN_KEY) || "";
    const response = await fetch(
        `${baseUrl}${versionApi}/client/media/add-media`,
        {
            method: "POST", 
            headers: {
                "x-access-token": token || "",
            },
            body: formData,
        }
    ).then((response) => response.json())

    return response;
}

export const deteleMedia = async (id: number): Promise<apiResponse> => {
    const token = localStorage.getItem(TOKEN_KEY) || "";
    const response = await fetch(
        `${baseUrl}${versionApi}/client/media/delete-media/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token || "",
            },
        }
    ).then((response) => response.json())

    return response;
}