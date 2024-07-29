"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FormInput } from "./FormInput";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { signIn } from "../handlers";

type FormType = { email: string; password: string };

export default function SignInForm() {
    //! アラートメッセージ
    const [errorMessage, setErrorMessage] = useState<string>("");
    //! フォームの状態を管理
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormType>();
    //! ページ遷移
    const router = useRouter();

    //! ログイン処理
    const onSubmit = async (data: FormType) => {
        signIn(data.email, data.password)
            .then(() => {
                router.push("/orders");
                toast.success("sign in successful");
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">
            {/* //! エラーメッセージ */}
            {errorMessage && (
                <Alert variant="destructive">
                    <TriangleAlert size={16} />
                    <AlertTitle>Authentication Error</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
            )}
            <FormInput id="email" label="Email" type="email" register={register} errors={errors} validation={{ required: "Email is required" }} />
            <FormInput id="password" label="Password" type="password" register={register} errors={errors} validation={{ required: "Password is required" }} />
            <Button className="w-full" type="submit">
                Sign in
            </Button>
        </form>
    );
}
