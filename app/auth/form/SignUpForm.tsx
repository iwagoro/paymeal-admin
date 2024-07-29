"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormInput } from "./FormInput";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { signUp } from "../handlers";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

type FormType = { email: string; password: string };

export default function SignUpForm({ variation }: { variation?: "outline" | "default" }) {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormType>();
    const router = useRouter();

    const onSubmit = async (data: FormType) => {
        signUp(data.email, data.password)
            .then(() => {
                mutate("/user");
                router.push("/orders");
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">
            {errorMessage && (
                <Alert variant="destructive">
                    <TriangleAlert size={16} />
                    <AlertTitle>Authentication Error</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
            )}
            <FormInput id="email" label="Email" type="email" register={register} errors={errors} validation={{ required: "Email is required" }} />
            <FormInput id="password" label="Password" type="password" register={register} errors={errors} validation={{ required: "Password is required" }} />
            <Button className="w-full" type="submit" variant={variation}>
                Sign Up
            </Button>
        </form>
    );
}
