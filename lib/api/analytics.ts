import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL;
import { toast } from "sonner";

//!過去１ヶ月の各日の売り上げを取得
export const getMonthlyStatics = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${url}/analytics/sales/monthly`, config);
        return res.data.sales;
    } catch {
        return [];
    }
};

//!今日の売り上げを取得
export const getDailySales = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${url}/sales/daily`, config);
        return res.data.total;
    } catch {
        return 0;
    }
};

//!週間の売り上げを取得
export const getWeelySales = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${url}/sales/weekly`, config);
        return res.data.total;
    } catch {
        return 0;
    }
};

//!月間の売り上げを取得
export const getMonthlySales = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${url}/sales/monthly`, config);
        return res.data.total;
    } catch {
        return 0;
    }
};
