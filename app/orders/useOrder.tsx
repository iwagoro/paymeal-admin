"use client";
import { useState, useEffect, useContext } from "react";
import { OrderType } from "@/lib/types";
import { AppContext } from "@/provider/app-provider";
import { complete, getDailyOrders } from "@/lib/api/order";
import { toast } from "sonner";
export default function useOrder() {
    const { user } = useContext(AppContext);
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [stateNames, setStateNames] = useState<string[]>(["purchased", "ordered", "completed"]);
    const [selectedState, setSelectedState] = useState<string>("purchased");
    const [selectedOrders, setSelectedOrders] = useState<OrderType[]>([]);

    //! 注文の取得
    useEffect(() => {
        user.token &&
            getDailyOrders(user.token).then((data) => {
                setOrders(data);
            });
    }, [user]);

    useEffect(() => {
        orders && setSelectedOrders(orders.filter((order) => order.status === selectedState));
    }, [selectedState, orders]);

    const completeOrder = (order_id: string) => {
        complete(user.token, order_id)
            .then(() => {
                toast.success("Order completed");
            })
            .catch((err) => {
                toast.error("Failed to complete order");
            });
    };

    return { orders, stateNames, selectedState, setSelectedState, selectedOrders, completeOrder };
}
