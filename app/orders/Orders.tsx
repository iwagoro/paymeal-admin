"use client";

import fetcher from "@/lib/fetcher";
import { OrderType } from "@/lib/types";
import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";
import useSWR from "swr";
import OrderCard from "./OrderCard";
import { H2 } from "@/components/ui/typography";

export default function Orders() {
    const { user } = useContext(AuthContext);
    //! 注文の一覧を取得(5秒間隔で更新)
    const { data: orders } = useSWR<OrderType[]>(user?.token ? ["/orders/all/today", user.token] : null, ([url, token]) => fetcher(url, token as string), { refreshInterval: 5000 });

    return (
        <div className="w-full">
            {Array.isArray(orders) && orders.length > 0 ? (
                <div className="grid grid-cols-4 gap-5">
                    {orders.map((order, index) => (
                        <OrderCard key={index} order={order} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <H2 className="text-center mt-5">No orders</H2>
                </div>
            )}
        </div>
    );
}
