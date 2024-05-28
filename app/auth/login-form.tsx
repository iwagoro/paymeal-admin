"use client";

import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { addUser, getUserInfo } from "@/lib/api/user";
import { set, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mute } from "@/components/ui/typography";
import { handleLoginError } from "./handler";
import { useContext, useState } from "react";
import { AppContext } from "@/provider/app-provider";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export type FormType = { email: string; password: string };
export default function LoginForm({ variation }: { variation?: "outline" | "default" }) {
    const { setUser } = useContext(AppContext);
    const [error, setError] = useState<string>("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormType>();

    const onSubmit = async (data: FormType) => {
        try {
            setError("");
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            const token = await userCredential.user.getIdToken();
            try {
                const userInfo = await getUserInfo(token);
                setUser(userInfo);
                window.location.href = "/home";
            } catch {
                setError("Failed to get user info");
            }
        } catch (error) {
            setError(handleLoginError(error));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">
            {error != "" && (
                <Alert variant="destructive">
                    <TriangleAlert size={16} />
                    <AlertTitle>Authentication Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                    })}
                />
                {errors.email && <Mute className="pt-5 text-primary flex items-center gap-3">{errors.email.message}</Mute>}
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                    })}
                />
                {errors.password && <Mute className="pt-5 text-primary flex items-center gap-3">{errors.password.message}</Mute>}
            </div>
            <Button className="w-full" type="submit" variant={variation}>
                Login
            </Button>
        </form>
    );
}
