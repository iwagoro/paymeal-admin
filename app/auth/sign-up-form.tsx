"use client";

import { createUserWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { addUser } from "@/lib/api/user";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mute } from "@/components/ui/typography";
import { handleSignUpError } from "./handler";

export type FormType = { email: string; password: string; secret: string };

export default function SignUpForm({ variation }: { variation?: "outline" | "default" }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormType>();
    const onSubmit = (data: FormType) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (userCredential) => {
                const token = await getIdToken(userCredential.user);
                await addUser(token, data.secret);
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
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address",
                        },
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
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
                        },
                    })}
                />
                {errors.password && <Mute className="pt-5 text-primary flex items-center gap-3">{errors.password.message}</Mute>}
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    {...register("secret", {
                        required: "secret key is required",
                    })}
                />
            </div>
            <Button className="w-full" type="submit" variant={variation}>
                Sign Up
            </Button>
        </form>
    );
}
