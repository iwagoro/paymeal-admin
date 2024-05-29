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
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            //?　ログイン
            if (user) {
                try {
                    const token = await getIdToken(user);
                    const userInfo = await getUserInfo(token);
                    setUser({ ...userInfo, token });
                    setIsLogin(true);
                } catch {
                    setIsLogin(false);
                    router.push("/auth");
                }
                //? ログアウト
            } else {
                setIsLogin(false);
                setUser({} as userType);
                router.push("/auth");
            }
        });
    }, []);

    const contextValue = { user, setUser };
    return <AppContext.Provider value={contextValue}>{isLogin ? children : <div>loading...</div>}</AppContext.Provider>;
};
