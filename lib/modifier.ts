import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const modifier = {
    post: async (url: string, token: string, params?: object, data?: any, contentType = "application/json") => {
        const response = await axios.post(`${baseUrl}${url}`, data, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": contentType,
            },
            params,
        });
        return response.data;
    },
    put: async (url: string, token: string, params?: object, data?: any) => {
        const response = await axios.put(`${baseUrl}${url}`, data, {
            headers: {
                authorization: `Bearer ${token}`,
            },
            params,
        });
        return response.data;
    },
    delete: async (url: string, token: string, params?: object, data?: any) => {
        const response = await axios.delete(`${baseUrl}${url}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
            data,
            params,
        });
        return response.data;
    },
};

export default modifier;
