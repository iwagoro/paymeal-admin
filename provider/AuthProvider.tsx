"use client";
import { UserType } from "@/lib/types";
import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "@/lib/firebase";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useRouter, usePathname } from "next/navigation";

export const AuthContext = createContext(
    {} as {
        user: UserType | null;
        setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
    }
);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserType | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const { data, isLoading, error } = useSWR(user?.token ? ["user/", user.token] : null, ([url, token]) => fetcher(url, token));

    useEffect(() => {
        if (pathname === "/auth") return; // /authページでは認証チェックをスキップ

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                if (user) {
                    const token = await getIdToken(user);
                    setUser({ token: token || "", email: user.email || "", id: user.uid || "", notification_token: "" });
                } else {
                    setUser(null);
                    router.push("/auth");
                }
            } catch {
                setUser(null);
                router.push("/auth");
            }
        });

        return () => unsubscribe();
    }, [pathname, router]);

    if (user === null && pathname !== "/auth") {
        // ログインしていない状態の表示。ただし、/authページではスキップ
        return <div>loading....</div>;
    }

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
