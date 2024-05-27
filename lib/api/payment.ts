import axios from "axios";
import { toast } from "sonner";

const url = process.env.NEXT_PUBLIC_API_URL;

//! 決済をする
export const purchase = async (token: string, order_id: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.post(`${url}/payment/create/${order_id}`, {}, config);

        window.open(res.data.content.url, "_blank");
    } catch {
        toast.error("Failed to purchase", { style: { color: "#FFFFFF", background: "#FF0000" } });
    }
};

//!決済リンクを削除する
export const deleteCart = async (token: string, order_id: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.delete(`${url}/payment/delete/${order_id}`, config);
        toast.success("Cart deleted", { style: { color: "#FFFFFF", background: "#00ff7f" } });
        return;
    } catch {
        toast.error("Failed to delete cart", { style: { color: "#FFFFFF", background: "#FF0000" } });
    }
};

//! 注文状態をリッスンする
export const completeOrder = async (token: string, order_id: string) => {
    const maxRetries = 5;
    const retryInterval = 5000;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    let retries = 0;

    const makeRequest = async (): Promise<any> => {
        try {
            const res = await axios.post(`${url}/payment/confirm/${order_id}`, {}, config);
            console.log("Request successful:", res.data);
            return res.data;
        } catch (error) {
            retries++;
            if (retries >= maxRetries) {
                console.error("Failed after 5 retries:", error);
                throw new Error("Failed to complete order after 5 retries");
            } else {
                console.log(`Retrying... (${retries}/${maxRetries})`);
                await new Promise((resolve) => setTimeout(resolve, retryInterval));
                return makeRequest();
            }
        }
    };

    try {
        await makeRequest();
        toast.success("Order completed", { style: { color: "#FFFFFF", background: "#00FF00" } });
    } catch {
        toast.error("Failed to complete order", { style: { color: "#FFFFFF", background: "#FF0000" } });
        throw new Error("Failed to complete order");
    }
};
