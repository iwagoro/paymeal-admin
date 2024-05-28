"use client";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "@/provider/app-provider";
import { OrderType } from "@/lib/types";
import { getDailyOrders } from "@/lib/api/order";
import { get } from "http";
import { getDailySales, getWeelySales, getMonthlySales } from "@/lib/api/analytics";

export function useHorm() {
    const { user } = useContext(AppContext);
    const [dailySales, setDailySales] = useState<number>(0);
    const [weeklySales, setWeeklySales] = useState<number>(0);
    const [monthlySales, setMonthlySales] = useState<number>(0);
    const [dailyOrders, setDailyOrders] = useState<OrderType[]>([]);

    useEffect(() => {
        user.token &&
            Promise.all([getDailySales(user.token), getWeelySales(user.token), getMonthlySales(user.token), getDailyOrders(user.token)]).then(
                ([dailySales, weeklySales, monthlySales, dailyOrders]) => {
                    setDailySales(dailySales);
                    setWeeklySales(weeklySales);
                    setMonthlySales(monthlySales);
                    setDailyOrders(dailyOrders);
                }
            );
    }, [user]);

    return {
        user,
        dailySales,
        weeklySales,
        monthlySales,
        dailyOrders,
    };
}
