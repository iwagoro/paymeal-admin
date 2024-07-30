"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import modifier from "@/lib/modifier";
import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";

type FormValues = {
    img_url: string;
    name: string;
    description: string;
    price: number;
    stock: number;
};

export default function AddTicket() {
    const { register, handleSubmit } = useForm<FormValues>();
    const { user } = useContext(AuthContext);

    //! チケットの追加処理
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        user?.token &&
            modifier
                .post(`/tickets-info`, user.token, { ...data })
                .then(() => {
                    mutate(["/tickets-info", user.token]);
                    toast.success("Ticket added");
                })
                .catch(() => {
                    toast.error("Failed to add ticket");
                });
    };

    return (
        <Card className="w-full border-primary">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <CardHeader>
                    <CardTitle>Add New Ticket</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col">
                    <label className="text-sm mt-4 mb-2">img_url</label>
                    <Input {...register("img_url")} type="text" className="input" />
                    <label className="text-sm  mt-4 mb-2">name</label>
                    <Input {...register("name")} type="text" className="input" />
                    <label className="text-sm  mt-4 mb-2">description</label>
                    <Input {...register("description")} type="text" className="input" />
                    <label className="text-sm  mt-4 mb-2">price</label>
                    <Input {...register("price")} type="number" className="input" />
                    <label className="text-sm  mt-4 mb-2">stock</label>
                    <Input {...register("stock")} type="number" className="input" />
                </CardContent>
                <CardFooter>
                    <Button type="submit" variant="outline" className="w-full">
                        Add Ticket
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
