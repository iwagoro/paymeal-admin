"use client";
import { useContext } from "react";
import { BellRing, BellOff } from "lucide-react";
import { postHandler, deleteHandler } from "@/lib/apiHandler";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getToken } from "firebase/messaging";
import { messaging } from "@/lib/firebase";
import { AuthContext } from "@/provider/AuthProvider";

const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        return registration;
    }
    throw new Error("Service worker not supported");
};

export function NotificationToggle() {
    const { user, setUser } = useContext(AuthContext);

    const getNotificationToken = async () => {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            try {
                const registration = await registerServiceWorker();
                const currentToken = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY, serviceWorkerRegistration: registration });
                if (currentToken) {
                    console.log(currentToken);
                    return currentToken;
                } else {
                    throw new Error("No registration token available. Request permission to generate one.");
                }
            } catch (error) {
                throw new Error("An error occurred while retrieving token: " + String(error));
            }
        }
    };

    const setNotificationToken = async () => {
        getNotificationToken().then((token) => {
            user?.token && token && postHandler({ endpoint: "/user/notification", token: user.token, params: { token: token } }).then(() => setUser({ ...user, notification_token: token }));
        });
    };

    const deleteNotifications = async () => {
        user?.token && deleteHandler({ endpoint: "/user/notification", token: user.token }).then(() => setUser({ ...user, notification_token: null }));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {user?.notification_token ? <BellRing className="h-[1.2rem] w-[1.2rem] transition-all" /> : <BellOff className="absolute h-[1.2rem] w-[1.2rem] transition-all" />}
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setNotificationToken()}>Enable Notification</DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteNotifications()}>Disable Notification</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
