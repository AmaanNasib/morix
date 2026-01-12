export interface AddDeviceFormData {
    deviceName: string;
    deviceUUID: string; 
    pairingCode: string;
    orientation?: "portrait" | "landscape";
    deviceType?: number;
    internetConnection?: boolean;
    internetType?: "WIFI" | "ETHERNET" | "MOBILE_DATA" | "OTHER";
    ipAddress?: string;
    model?: string;
    osVersion?: string;
    appVersion?: string;
    location?: string;
    playListId?: number;
};

export interface UpdateDeviceFormData {
    deviceName?: string;
    orientation?: "portrait" | "landscape";
    deviceType?: number;
    internetConnection?: boolean;
    internetType?: "WIFI" | "ETHERNET" | "MOBILE_DATA" | "OTHER";
    ipAddress?: string;
    model?: string;
    osVersion?: string;
    appVersion?: string;
    location?: string;
    playListId?: number;
};

export interface AssignPlaylistFormData {
    deviceId: number;
    playListId: number;
    startAt?: Date;
    endAt?: Date;
    isActive?: boolean;
};

export interface SchedulePlaylistFormData {
    deviceId: number;
    playListId: number;
    startAt: Date;
    endAt: Date;
    slots: string[];
};

export interface PairDeviceFormData {
    paringCode: string;
    licenseId: number;
};

export interface DeviceControlFormData {
    deviceId: number;
    action: string;
    value?: string;
};