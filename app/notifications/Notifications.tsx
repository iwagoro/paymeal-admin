"use client";

import fetcher from "@/lib/fetcher";
import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";
import useSWR from "swr";
import NotificationCard from "./NotificationCard";

type NotificationType = {
    id: number;
    title: string;
    body: string;
    start_date: string;
    end_date: string;
};

export default function Notifications() {
    const { user } = useContext(AuthContext);
    //! お知らせ一覧の取得
    const { data: notifications, isLoading, error } = useSWR<NotificationType[]>(user?.token ? ["/notifications", user.token] : null, ([url, token]) => fetcher(url, token as string));

    return (
        <>
            {Array.isArray(notifications) && notifications.length > 0 ? (
                <div className="w-full grid grid-cols-3 gap-5">
                    {notifications.map((notification, index) => (
                        <NotificationCard key={index} notification={notification} />
                    ))}
                </div>
            ) : (
                <div className="w-full">
                    <div className="text-center mt-5">No notifications</div>
                </div>
            )}
        </>
    );
}
