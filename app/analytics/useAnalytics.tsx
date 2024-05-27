"use client";
import { useState, useEffect, useContext } from "react";
import { getMonthlyStatics } from "@/lib/api/analytics";

import { getDailySales, getWeelySales, getMonthlySales } from "@/lib/api/analytics";
import { AppContext } from "@/provider/app-provider";

export default function useAnalytics() {
    const { user } = useContext(AppContext);

    const [dailySales, setDailySales] = useState<number>(0);
    const [weeklySales, setWeeklySales] = useState<number>(0);
    const [monthlySales, setMonthlySales] = useState<number>(0);
    const [sales, setSales] = useState<number[]>([]);

    useEffect(() => {
        user.token &&
            Promise.all([getDailySales(user.token), getWeelySales(user.token), getMonthlySales(user.token), getMonthlyStatics(user.token)]).then(([dailySales, weeklySales, monthlySales, sales]) => {
                setDailySales(dailySales);
                setWeeklySales(weeklySales);
                setMonthlySales(monthlySales);
                setSales(sales);
            });
    }, [user.token]);

    return {
        dailySales,
        weeklySales,
        monthlySales,
        sales,
    };
}
