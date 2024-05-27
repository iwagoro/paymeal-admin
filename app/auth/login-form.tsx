"use client";

import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { addUser, getUserInfo } from "@/lib/api/user";
import { set, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mute } from "@/components/ui/typography";
import { handleSignUpError } from "./handler";
import { useContext } from "react";
import { AppContext } from "@/provider/app-provider";

export type FormType = { email: string; password: string };
export default function LoginForm({ variation }: { variation?: "outline" | "default" }) {
    const { setUser } = useContext(AppContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormType>();

    const onSubmit = (data: FormType) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(async (userCredential) => {
                const token = await getIdToken(userCredential.user);
                const userInfo = await getUserInfo(token);
                setUser({ email: userInfo.email, id: userInfo.id, token: token, img_url: null });
                window.location.href = "/home";
            })
            .catch((error) => {
                handleSignUpError(error);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">
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
