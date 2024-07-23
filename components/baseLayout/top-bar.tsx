"use client";
import Link from "next/link";
import AuthToggle from "./toggles/AuthToggle";
import { ModeToggle } from "./toggles/ModeToggle";
import { NotificationToggle } from "./toggles/NotificationToggle";
import { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
export const TopBar = () => {
    const { user } = useContext(AuthContext);

    if (!user) return null;

    return (
        <div className="absolute top-0 z-50  w-full h-[50px] flex justify-center items-center px-5  bg-background  ">
            <div className="w-full h-full max-w-2xl flex justify-between items-center gap-10">
                <Link href="/home">
                    <div className="flex items-center b">
                        <h2 className="scroll-m-20  text-[24px] font-semibold tracking-tight first:mt-0">Paymeal</h2>
                    </div>
                </Link>
                <div className="w-fit flex gap-5 items-center">
                    {/* <NotificationToggle /> */}
                    <ModeToggle />
                    <AuthToggle />
                </div>
            </div>
        </div>
    );
};
