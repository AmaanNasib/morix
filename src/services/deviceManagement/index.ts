export const baseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;
export const versionApi = import.meta.env.VITE_PUBLIC_VERSION_API_URL;
export const TOKEN_KEY = import.meta.env.VITE_PUBLIC_TOKEN_KEY;
import { AddDeviceFormData, UpdateDeviceFormData, AssignPlaylistFormData, SchedulePlaylistFormData, PairDeviceFormData, DeviceControlFormData } from "@/types/services/deviceManagement";
import { apiResponse, apiResponseAdd } from "@/interface/index.ts";


// Get all devices
export const getDevicesService = async (): Promise<apiResponse> => {
  const token = localStorage.getItem(TOKEN_KEY) || "";
  const response = await fetch(
    `${baseUrl}${versionApi}/client/device`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token || "",
      },
    }
  ).then((response) => response.json());

  return response;
};

// Get device by ID
export const getDeviceByIdService = async (
  id: string
): Promise<apiResponse> => {
  const token = localStorage.getItem(TOKEN_KEY) || "";
  const response = await fetch(
    `${baseUrl}${versionApi}/client/device/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token || "",
      },
    }
  ).then((response) => response.json());

  return response;
};

// Get device info
export const getDeviceInfoService = async (
    id: string
): Promise<apiResponse> => {
  const token = localStorage.getItem(TOKEN_KEY) || "";
  const response = await fetch(
    `${baseUrl}${versionApi}/client/device/${id}/info`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token || "",
      },
    }
  ).then((response) => response.json());

  return response;
};

// Add a new device
export const addDeviceService = async (
  formData: AddDeviceFormData
): Promise<apiResponseAdd> => {
  const token = localStorage.getItem(TOKEN_KEY) || "";
  const response = await fetch(
    `${baseUrl}${versionApi}/client/device`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token || "",
      },
      body: JSON.stringify(formData),
    }
  ).then((response) => response.json());

  return response;
};

// Update an existing device
export const updateDeviceService = async (
  id: string,
  formData: UpdateDeviceFormData
): Promise<apiResponse> => {
    const token = localStorage.getItem(TOKEN_KEY) || "";
    const response = await fetch(
        `${baseUrl}${versionApi}/client/device/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token || "",
            },
            body: JSON.stringify(formData),
        }
    ).then((response) => response.json());

    return response;
};

//--------------- Playlist Assignment ------------------

// Assign playlist to multiple devices
export const assignPlaylistToDevicesService = async (
  formData: AssignPlaylistFormData
): Promise<apiResponseAdd> => {
  const token = localStorage.getItem(TOKEN_KEY) || "";
  const response = await fetch(
    `${baseUrl}${versionApi}/client/device/assign-playlist`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token || "",
      },
      body: JSON.stringify(formData),
    }
  ).then((response) => response.json());

  return response;
};

// Get assigned playlists for a device
export const getAssignedPlaylistsService = async (
  deviceId: number
): Promise<apiResponse> => {
  const token = localStorage.getItem(TOKEN_KEY) || "";
  const response = await fetch(
    `${baseUrl}${versionApi}/client/device/${deviceId}/playlists`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token || "",
      },
    }
  ).then((response) => response.json());

  return response;
};

// Schedule playlist for a device
export const schedulePlaylistForDeviceService = async (
  formData: SchedulePlaylistFormData
): Promise<apiResponseAdd> => {
  const token = localStorage.getItem(TOKEN_KEY) || "";
  const response = await fetch(
    `${baseUrl}${versionApi}/client/device/schedule-playlist`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token || "",
      },
      body: JSON.stringify(formData),
    }
  ).then((response) => response.json());

  return response;
};

// ---------------- Device Pairing --------------------

// Pair a device
export const pairDeviceService = async (
  formData: PairDeviceFormData
): Promise<apiResponseAdd> => {
  const token = localStorage.getItem(TOKEN_KEY) || "";
  const response = await fetch(
    `${baseUrl}${versionApi}/client/device/pair-device`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token || "",
      },
      body: JSON.stringify(formData),
    }
  ).then((response) => response.json());

  return response;
};

// Manage device control actions
export const deviceControlService = async (
  formData: DeviceControlFormData
): Promise<apiResponseAdd> => {
  const token = localStorage.getItem(TOKEN_KEY) || "";  
  const response = await fetch(
    `${baseUrl}${versionApi}/client/device/control-device`,
    {
      method: "POST",       
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token || "",
      },
      body: JSON.stringify(formData),
    }
  ).then((response) => response.json());

  return response;
};