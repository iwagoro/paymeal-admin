"use client";

import { createUserWithEmailAndPassword, getIdToken, deleteUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { addUser } from "@/lib/api/user";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mute } from "@/components/ui/typography";
import { handleSignUpError } from "./handler";
import { useContext, useState } from "react";
import { AppContext } from "@/provider/app-provider";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
export type FormType = { email: string; password: string; secret: string };

export default function SignUpForm({ variation }: { variation?: "outline" | "default" }) {
    const { setUser } = useContext(AppContext);
    const [error, setError] = useState<string>("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormType>();

    const onSubmit = async (data: FormType) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const token = await userCredential.user.getIdToken();

            try {
                const response = await addUser(token, data.secret);
                window.location.href = "/home";
            } catch (backendError) {
                await deleteUser(userCredential.user);
            }
        } catch (error) {
            handleSignUpError(error);
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
                <Label htmlFor="secret">Secret</Label>
                <Input
                    id="secret"
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
