export interface LoginFormData {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    token?: string;
    data?: {
        id?: number;
        email?: string;
        password?: string;
        firstName?: string;
        lastName?: string;
        profileStatus?: string;
        roleId?: number;
        status?: number;
        lastLogin?: string;
        phone?: string;
        createdAt?: string;
        updatedAt?: string;
        clientId?: number;
        role?: {
            id?: number;
            name?: string;
            createdAt?: string;
            updatedAt?: string;
            permissions?: {
                id?: number;
                module?: string;
                canCreate?: boolean;
                canRead?: boolean;
                canUpdate?: boolean;
                canDelete?: boolean;
                roleId?: number;
                createdAt?: string;
                updatedAt?: string;
            }[];
        };
    };
}

export interface apiResponseAdd<T = unknown> {
    urls?: string[];
    success: boolean;
    message?: string;
    data?: T[] | T;
    planDefault?: boolean
}

export interface apiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T[];
    totalPages?: number; // Optional, if pagination is used
    totalTraders?: number; // Optional, if total count is needed
    currentPage?: number;
    totalCount?: number;
    totalRecords?: number;
    total?: number;
    pagination?: {
        totalPages?: number;
        total?: number;
        currentPage?: number;
        callClicks?: number;
        emailClicks?: number;
        totalCount?: number;
        statics?: any
    };
    statistics?: {
        totalCustomers?: number;
        openOrders?: number;
        linkedOrders?: number;
        noOrders?: number;
        totalTeams?: number;
        active?: number;
        totalOrders?: number;
        avgPerformance?: number;
    }
}

export interface User {
    id?: number;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    profileStatus?: string;
    roleId?: number;
    status?: number;
    lastLogin?: string;
    phone?: string;
    createdAt?: string;
    updatedAt?: string;
    clientId?: number;
    role?: {
        id?: number;
        name?: string;
        createdAt?: string;
        updatedAt?: string;
        permissions?: {
            id?: number;
            module?: string;
            canCreate?: boolean;
            canRead?: boolean;
            canUpdate?: boolean;
            canDelete?: boolean;
            roleId?: number;
            createdAt?: string;
            updatedAt?: string;
        }[];
    };
}

export interface OTPFormData {
    userId: number;
    otp: number;
}