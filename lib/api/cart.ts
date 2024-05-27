import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL;
import { toast } from "sonner";

//! not_purchasedカートを取得する
export const getCart = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${url}/cart`, config);
        return res.data.content.cart;
    } catch {
        toast.error("Failed to get cart", { style: { color: "#FFFFFF", background: "#FF0000" } });
    }
};

//! カートに追加する
export const addTicketToCart = async (token: string, ticket_id: number) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        return await axios.post(`${url}/cart/${ticket_id}`, {}, config);
    } catch {
        toast.error("Failed to add ticket to cart", { style: { color: "#FFFFFF", background: "#FF0000" } });
    }
};

//! カートから減らす
export const subTicketFromCart = async (token: string, ticket_id: number) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        return await axios.delete(`${url}/cart/${ticket_id}`, config);
    } catch {
        toast.error("Failed to sub ticket from cart", { style: { color: "#FFFFFF", background: "#FF0000" } });
    }
};
