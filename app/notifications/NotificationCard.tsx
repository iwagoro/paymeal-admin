"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NotificationType } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import modifier from "@/lib/modifier";
import { mutate } from "swr";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import remarkGfm from "remark-gfm";
import { Check, Trash } from "lucide-react";

export default function NotificationCard({ notification }: { notification: NotificationType }) {
    //! 編集モード
    const [isEditing, setIsEditing] = useState(false);
    //! ダイアログの表示
    const [isOpen, setIsOpen] = useState(false);
    //! お知らせの本文
    const [body, setBody] = useState(notification.body);
    //! お知らせのタイトル
    const [title, setTitle] = useState(notification.title);
    const { user } = useContext(AuthContext);
    const cardRef = useRef<HTMLDivElement>(null);

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
    }, [cardRef]);

    //! お知らせの更新処理
    const updateNotification = () => {
        if (user && notification.id) {
            modifier
                .put(`/notifications`, user.token, { id: notification.id, title, body })
                .then(() => {
                    mutate(["/notifications", user.token]);
                    setIsEditing(false);
                    toast.success("Notification updated");
                })
                .catch(() => {
                    toast.error("Failed to update notification");
                });
        }
    };

    //!　お知らせの削除処理
    const deleteNotification = () => {
        if (user && notification.id) {
            modifier
                .delete(`/notifications`, user.token, { id: notification.id })
                .then(() => {
                    mutate(["/notifications", user.token]);
                    toast.success("Notification deleted");
                })
                .catch(() => {
                    toast.error("Failed to delete notification");
                });
        }
    };

    return (
        <>
            <div ref={cardRef}>
                <Card className="w-full h-fit">
                    <CardHeader>{isEditing ? <Input value={title} onChange={(e) => setTitle(e.target.value)} /> : <CardTitle>{title}</CardTitle>}</CardHeader>
                    <CardContent>
                        {isEditing ? (
                            <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
                        ) : (
                            <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
                                {body}
                            </ReactMarkdown>
                        )}
                    </CardContent>

                    <CardFooter className="gap-5">
                        {isEditing ? (
                            <>
                                <Button variant="outline" type="button" onClick={() => setIsOpen(true)} className="w-full border-red-600">
                                    <Trash size={18} className=" text-red-600 mr-2" />
                                    Delete
                                </Button>
                                <Button variant="outline" type="submit" onClick={() => updateNotification} className="w-full border-green-600">
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
                </Card>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>This action cannot be undone.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={deleteNotification}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
