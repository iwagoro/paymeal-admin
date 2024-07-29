"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from "@/provider/AuthProvider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import modifier from "@/lib/modifier";
import { mutate } from "swr";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function AddNotification() {
    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);

    //!　お知らせの追加処理
    const onSubmit: SubmitHandler<any> = (data) => {
        if (user) {
            modifier
                .post(`/notifications`, user.token, { ...data })
                .then(() => {
                    mutate(["/notifications", user.token]);
                    toast.success("Notification added");
                })
                .catch(() => {
                    toast.error("Failed to add notification");
                });
        }
    };

    return (
        <Card className="w-full border-primary">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <CardHeader>
                    <CardTitle>Add New Notification</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col">
                    <Label className="text-sm mt-4 mb-2">title</Label>
                    <Input {...register("title")} type="text" className="Input" />
                    <Label className="text-sm mt-4 mb-2">body</Label>
                    <Textarea {...register("body")} className="Input" />
                </CardContent>

                <CardFooter className="w-full">
                    <Button type="submit" variant="outline" className="w-full">
                        Add Notification
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
