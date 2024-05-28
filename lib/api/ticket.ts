import axios from "axios";
import { toast } from "sonner";
const url = process.env.NEXT_PUBLIC_API_URL;

//! 全てのチケットを取得する
export const getAllTickets = async () => {
    try {
        const res = await axios.get(`${url}/tickets`);
        return res.data.tickets || [];
    } catch {
        return [];
    }
};

//! 全てのタグを取得する
export const getTags = async () => {
    try {
        const res = await axios.get(`${url}/tags`);
        return res.data.tags || [];
    } catch {
        return [];
    }
};

//! チケットとタグの関連を取得する
export const getRelations = async () => {
    try {
        const res = await axios.get(`${url}/relations`);
        return res.data.relations || [];
    } catch {
        return [];
    }
};

//! チケットを追加する
export const addTicket = async (token: string, ticket: any) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.post(`${url}/tickets`, ticket, config);
        toast.success("Ticket added successfully", { style: { color: "#FFFFFF", background: "#00FF00" } });
    } catch {
        toast.error("Failed to add ticket", { style: { color: "#FFFFFF", background: "#FF0000" } });
    }
};

//! チケットを削除する
export const deleteTicket = async (id: number, token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.delete(`${url}/tickets/${id}`, config);
        toast.success("Ticket deleted successfully", { style: { color: "#FFFFFF", background: "#00FF00" } });
    } catch {
        toast.error("Failed to delete ticket", { style: { color: "#FFFFFF", background: "#FF0000" } });
    }
};

//! チケットを更新する
export const updateTicket = async (token: string, id: number, ticket: any) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.put(`${url}/tickets/${id}`, ticket, config);
        toast.success("Ticket updated successfully", { style: { color: "#FFFFFF", background: "#00FF00" } });
    } catch {
        toast.error("Failed to update ticket", { style: { color: "#FFFFFF", background: "#FF0000" } });
    }
};

//! チケットにタグを追加する
export const setTagsToTicket = async (token: string, ticket_id: number, tag_names: string[]) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.post(`${url}/tickets/${ticket_id}`, { tags: tag_names }, config);
        toast.success("Tags set successfully", { style: { color: "#FFFFFF", background: "#00FF00" } });
    } catch {
        toast.error("Failed to set tags to ticket", { style: { color: "#FFFFFF", background: "#FF0000" } });
    }
};
