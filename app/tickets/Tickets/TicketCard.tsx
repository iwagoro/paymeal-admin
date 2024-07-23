"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { TagType, TicketType } from "@/lib/types";
import React, { useContext } from "react";
import modifier from "@/lib/modifier";
import { AuthContext } from "@/provider/AuthProvider";
import { Label } from "@radix-ui/react-context-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { mutate } from "swr";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

type TicketTag = {
    ticket_id: number;
    tag_id: number;
};

type TicketCardProps = TicketType & {
    stocks?: { stock: number };
    tags?: TicketTag[];
};

export default function TicketCard({ ticket, tags }: { ticket: TicketCardProps; tags: TagType[] }) {
    const { user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState(ticket.name);
    const [description, setDescription] = useState(ticket.description);
    const [price, setPrice] = useState(ticket.price);
    const [stock, setStock] = useState(ticket.stocks?.stock ?? 0);

    const submitChange = async () => {
        user?.token &&
            modifier
                .put(`/tickets-info`, user.token, { ticket_id: ticket.id, name, description, price, stock })
                .then(() => {
                    mutate(["/tickets-info", user.token]);
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
            <CardContent className="flex flex-col gap-5">
                <Input value={name} disabled={!isEditing} onChange={(e) => setName(e.target.value)} />
                <Textarea value={description} disabled={!isEditing} onChange={(e) => setDescription(e.target.value)} />
                <Input value={price} disabled={!isEditing} type="number" onChange={(e) => setPrice(Number(e.target.value))} />
                <Input value={stock} disabled={!isEditing} type="number" onChange={(e) => setStock(Number(e.target.value))} />
            </CardContent>
            {/* <CardFooter className="w-full flex-wrap gap-2">
                {Array.isArray(ticket.tags) && ticket.tags?.map((tag: TicketTag, index) => <Badge key={index}>{tags[tag.tag_id].name}</Badge>)}

                <div className="cursor-pointer border p-1 rounded-full" onClick={() => {}}>
                    <Plus size="14" />
                </div>
            </CardFooter> */}
            <CardFooter>
                <Button variant="outline" disabled={!isEditing} className="w-full" onClick={submitChange}>
                    Submit
                </Button>
            </CardFooter>
        </Card>
    );
}
