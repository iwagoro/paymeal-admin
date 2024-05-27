import axios from "axios";
import { toast } from "sonner";

const url = process.env.NEXT_PUBLIC_API_URL;

//! オーダを完了にする
export const complete = async (token: string, orderId: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        return await axios.post(`${url}/orders/complete/${orderId}`, {}, config);
    } catch (error) {
        console.log(error);
        toast.error("Failed to complete order", { style: { color: "#FFFFFF", background: "#FF0000" } });
    }
};

//?----------------------------------------------------
//! 今日の注文を取得
export const getDailyOrders = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${url}/orders/today`, config);
        return res.data.content.orders;
    } catch {
        toast.error("Failed to get daily orders", { style: { color: "#FFFFFF", background: "#FF0000" } });
    }
};
