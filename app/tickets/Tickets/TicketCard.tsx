"use client";
import { useState, useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { TagType, TicketType } from "@/lib/types";
import modifier from "@/lib/modifier";
import { AuthContext } from "@/provider/AuthProvider";
import { Label } from "@radix-ui/react-context-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { mutate } from "swr";
import { useForm, SubmitHandler } from "react-hook-form";

type TicketTag = {
    ticket_id: number;
    tag_id: number;
};

type TicketCardProps = TicketType & {
    stocks?: { stock: number };
    tags?: TicketTag[];
};

type FormValues = {
    img_url: string;
    name: string;
    description: string;
    price: number;
    stock: number;
};

export default function TicketCard({ ticket, tags }: { ticket: TicketCardProps; tags: TagType[] }) {
    const { user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, setValue } = useForm<FormValues>({
        defaultValues: {
            img_url: ticket.img_url,
            name: ticket.name,
            description: ticket.description,
            price: ticket.price,
            stock: ticket.stocks?.stock ?? 0,
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        user?.token &&
            modifier
                .put(`/tickets-info`, user.token, { ticket_id: ticket.id, ...data })
                .then(() => {
                    mutate(["/tickets-info", user.token]);
                    setIsEditing(false);
                    toast.success("Ticket updated");
                })
                .catch(() => {
                    toast.error("Failed to update ticket");
                });
    };

    return (
        <Card key={ticket.id} className="h-fit">
            <img src={ticket.img_url} alt={ticket.name} className="w-full aspect-video object-cover" />
            <CardHeader className="w-full flex flex-row justify-end items-center gap-2">
                <Label className="mt-1">Edit</Label>
                <Switch checked={isEditing} onCheckedChange={setIsEditing} />
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="flex flex-col gap-5">
                    <Input {...register("img_url")} disabled={!isEditing} className="input" />
                    <Input {...register("name")} disabled={!isEditing} className="input" />
                    <Textarea {...register("description")} disabled={!isEditing} className="input" />
                    <Input {...register("price")} disabled={!isEditing} type="number" className="input" />
                    <Input {...register("stock")} disabled={!isEditing} type="number" className="input" />
                </CardContent>
                <CardFooter>
                    <Button type="submit" variant="outline" disabled={!isEditing} className="w-full">
                        Submit
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
