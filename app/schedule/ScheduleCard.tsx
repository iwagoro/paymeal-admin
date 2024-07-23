import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { List } from "@/components/ui/typography";
import modifier from "@/lib/modifier";
import { AuthContext } from "@/provider/AuthProvider";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { mutate } from "swr";

interface MenuProps {
    menu: {
        id: number;
        name: string;
        contents: string[];
    };
    date: string;
}

export default function ScheduleCard({ menu, date }: MenuProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [contents, setContents] = useState(menu.contents.join("\n"));
    const { user } = useContext(AuthContext);
    const month = new Date(date).getMonth();
    const cardRef = useRef<HTMLDivElement>(null);

    const deleteMenu = useCallback(async () => {
        if (user && date) {
            await modifier.delete(`/tickets/daily`, user.token, { ticket_id: menu.id, date });
            mutate(["/tickets/daily/month", user.token]);
        }
    }, [user, date, menu.id, month]);

    const submitChange = useCallback(async () => {
        if (user && date) {
            await modifier.put(`/tickets/daily`, user.token, { ticket_id: menu.id, contents, date });
            mutate(["/tickets/daily/month", user.token]);
        }
    }, [user, date, contents, menu.id, month]);

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

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div ref={cardRef} className="relative">
                    <Card className="flex flex-col rounded-sm">
                        <CardHeader className="w-full flex flex-row items-center justify-between">
                            <CardDescription className="w-fit">{menu.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isEditing ? (
                                <Textarea defaultValue={contents} onChange={(e) => setContents(e.target.value)} />
                            ) : (
                                <List>
                                    {menu.contents.map((content: string, index: number) => (
                                        <li key={index}>{content}</li>
                                    ))}
                                </List>
                            )}
                        </CardContent>
                        {isEditing && (
                            <CardFooter>
                                <Button variant="outline" className="w-full" onClick={submitChange}>
                                    Save
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onClick={() => setIsEditing((prev) => !prev)}>Edit</ContextMenuItem>
                <ContextMenuItem onClick={deleteMenu}>Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}
