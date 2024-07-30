"use client";
import { useState, useContext, useEffect, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TagType, TicketType } from "@/lib/types";
import modifier from "@/lib/modifier";
import { AuthContext } from "@/provider/AuthProvider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { mutate } from "swr";
import { useForm, SubmitHandler } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import SelectTag from "./SelectTag";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, CircleX, Trash, X } from "lucide-react";

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

export default function TicketCard({ ticket }: { ticket: TicketCardProps }) {
    const { user } = useContext(AuthContext);
    //! ダイアログの開閉
    const [isOpen, setIsOpen] = useState(false);
    //! 編集モード
    const [isEditing, setIsEditing] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    //! フォームの初期値を設定
    const { register, handleSubmit, setValue } = useForm<FormValues>({
        defaultValues: {
            img_url: ticket.img_url,
            name: ticket.name,
            description: ticket.description,
            price: ticket.price,
            stock: ticket.stock ?? 0,
        },
    });

    //! チケットの削除処理
    const deleteTicket = () => {
        if (user && ticket.id) {
            modifier
                .delete(`/tickets-info`, user.token, { ticket_id: ticket.id })
                .then(() => {
                    mutate(["/tickets-info", user.token]);
                    setIsOpen(false);
                })
                .catch(() => {
                    toast.error("Failed to delete ticket");
                });
        }
    };

    //! タグの削除処理
    const deleteTag = (tag: TagType) => {
        if (user) {
            modifier
                .delete("/tickets-info/tag", user.token, { ticket_id: ticket.id, tag_id: tag.id })
                .then(() => {
                    mutate(["/tickets-info", user.token]);
                })
                .catch(() => {
                    toast.error("Failed to delete tag");
                });
        }
    };

    //! チケットの更新処理
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (user && ticket.id) {
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
        }
    };

    //! マウント時にクリックイベントを追加
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setIsEditing(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [cardRef, isOpen]);

    return (
        <>
            <div ref={cardRef}>
                <Card key={ticket.id} className="h-fit">
                    <img src={ticket.img_url} alt={ticket.name} className="w-full aspect-video object-cover" />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="flex flex-col ">
                            <Label className="text-sm mt-4 mb-2">img_url</Label>
                            <Input {...register("img_url")} disabled={!isEditing} className="input" />
                            <Label className="text-sm mt-4 mb-2">name</Label>
                            <Input {...register("name")} disabled={!isEditing} className="input" />
                            <Label className="text-sm mt-4 mb-2">description</Label>
                            <Textarea {...register("description")} disabled={!isEditing} className="input" />
                            <Label className="text-sm mt-4 mb-2">price</Label>
                            <Input {...register("price")} disabled={!isEditing} type="number" className="input" />
                            <Label className="text-sm mt-4 mb-2">stock</Label>
                            <Input {...register("stock")} disabled={!isEditing} type="number" className="input" />
                            <Label className="text-sm mt-4 mb-2">tag</Label>
                            <div className="flex flex-row flex-wrap gap-2 items-center">
                                {ticket.tags.map((tag) => (
                                    <Badge key={tag.id} className="p-1 px-2  hover:bg-primary ">
                                        {tag.name}
                                        {isEditing && <CircleX size={18} onClick={() => deleteTag(tag)} className="ml-2 cursor-pointer" />}
                                    </Badge>
                                ))}
                                {isEditing && <SelectTag ticket_id={ticket.id} exist_tags={ticket.tags} />}
                            </div>
                        </CardContent>
                        <CardFooter className="gap-5">
                            {isEditing ? (
                                <>
                                    <Button variant="outline" type="button" onClick={() => setIsOpen(true)} className="w-full border-red-600">
                                        <Trash size={18} className=" text-red-600 mr-2" />
                                        Delete
                                    </Button>
                                    <Button variant="outline" type="submit" className="w-full border-green-600">
                                        <Check size={18} className=" text-green-600 mr-2" />
                                        Save
                                    </Button>
                                </>
                            ) : (
                                <Button variant="outline" type="button" onClick={() => setIsEditing(!isEditing)} className="w-full">
                                    Edit
                                </Button>
                            )}
                        </CardFooter>
                    </form>
                </Card>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>This action cannot be undone.</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={deleteTicket}>
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
