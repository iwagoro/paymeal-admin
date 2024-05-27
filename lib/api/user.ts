const url = process.env.NEXT_PUBLIC_API_URL;

import axios from "axios";
import { toast } from "sonner";

//! ユーザーのメールアドレスを取得する
export const getUserInfo = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${url}/admin`, config);
        return res.data.content.user;
    } catch {
        toast.error("Failed to get user info", { style: { color: "#FFFFFF", background: "#FF0000" } });
    }
};

//! ユーザーを追加する
export const addUser = async (token: string, secret: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.post(`${url}/admin`, { password: secret }, config);
    } catch {
        toast.error("Failed to add user", { style: { color: "#FFFFFF", background: "#FF0000" } });
    }
};
