"use client";

import { useState, createContext, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/lib/api/user";
import { userType } from "@/lib/types";

export const AppContext = createContext(
    {} as {
        user: userType;
        setUser: React.Dispatch<React.SetStateAction<userType>>;
    }
);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<userType>({} as userType);
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await getIdToken(user);
                await getUserInfo(token).then((data) => {
                    setUser({ email: data.email, id: data.id, token: token, img_url: null });
                });
            } else {
                setUser({} as userType);
                router.push("/auth");
            }
        });
    }, []);

    const contextValue = { user, setUser };
    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
