"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mute } from "@/components/ui/typography";

export type FormType = { email: string; password: string };

export default function AuthForm({
    children,
    onSubmit,
    variation,
    type,
}: {
    children: React.ReactNode;
    onSubmit: (data: FormType) => void;
    variation?: "outline" | "default";
    type: "login" | "signup";
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormType>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    {...register("email", {
                        required: type === "signup" ? "Email is required" : false,
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
                        required: type === "signup" ? "Password is required" : false,
                        minLength:
                            type === "signup"
                                ? {
                                      value: 8,
                                      message: "Password must be at least 8 characters",
                                  }
                                : undefined,
                        pattern:
                            type === "signup"
                                ? {
                                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                      message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
                                  }
                                : undefined,
                    })}
                />
                {errors.password && <Mute className="pt-5 text-primary flex items-center gap-3">{errors.password.message}</Mute>}
            </div>
            <Button className="w-full" type="submit" variant={variation}>
                {children}
            </Button>
        </form>
    );
}
