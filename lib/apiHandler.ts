import { Method } from "axios";
import { toast } from "sonner";

interface RequestOptions {
    method: Method;
    endpoint: string;
    token?: string;
    params?: Record<string, string | number>;
    revalidate?: number;
}

export const baseApiHandler = async ({ method, endpoint, token, params, revalidate = 60 }: RequestOptions) => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const url_params = new URLSearchParams(Object.entries(params || {}).map(([key, value]) => [key, value.toString()]));
    const fullURL = `${baseURL}${endpoint}${url_params ? `?${url_params}` : ""}`;
    const authorization = { Authorization: `Bearer ${token}` };

    const headers = new Headers();
    if (authorization.Authorization) {
        headers.set("Authorization", authorization.Authorization);
    }

    const res = await fetch(fullURL, {
        method,
        next: {
            revalidate: revalidate,
        },
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`${res.status}`);
    }
    const data = await res.json();
    return data;
};

interface GetRequestOptions {
    method: Method;
    endpoint: string;
    token?: string;
    params?: Record<string, string | number>;
    revalidate?: number;
    returnType: string;
}

export const getHandler = async ({ endpoint, token, params, revalidate, returnType }: GetRequestOptions) => {
    try {
        return await baseApiHandler({ method: "GET", endpoint, token, params, revalidate });
    } catch {
        switch (returnType) {
            case "array":
                return [];
            case "object":
                return {};
            case "string":
                return "";
            case "number":
                return 0;
            default:
                return null;
        }
    }
};

interface PostRequestOptions {
    endpoint: string;
    token?: string;
    params?: Record<string, string | number>;
}

export const postHandler = async ({ endpoint, token, params }: PostRequestOptions) => {
    try {
        return await baseApiHandler({ method: "POST", endpoint, token, params });
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const deleteHandler = async ({ endpoint, token, params }: PostRequestOptions) => {
    try {
        return await baseApiHandler({ method: "DELETE", endpoint, token, params });
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const patchHandler = async ({ endpoint, token, params }: PostRequestOptions) => {
    try {
        return await baseApiHandler({ method: "PATCH", endpoint, token, params });
    } catch (error: any) {
        throw new Error(error.message);
    }
};
