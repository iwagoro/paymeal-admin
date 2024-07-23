"use client";
import * as React from "react";
import { useContext } from "react";
import { Unlock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/provider/AuthProvider";
import { signOut } from "@/app/auth/handlers";

export default function AuthToggle() {
    const { user } = useContext(AuthContext);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <User size={18} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem disabled className="text-xs">
                    {user?.email}
                </DropdownMenuItem>

                <DropdownMenuItem disabled className="text-xs">
                    {user?.id}
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                    <Unlock size={12} className="mr-2" /> sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
