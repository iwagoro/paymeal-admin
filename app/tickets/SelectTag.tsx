"use client";

import { Popover } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import fetcher from "@/lib/fetcher";
import modifier from "@/lib/modifier";
import { TagType } from "@/lib/types";
import { AuthContext } from "@/provider/AuthProvider";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CirclePlus } from "lucide-react";
import { useContext } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import AddTag from "./AddTag";

export default function SelectTag({ ticket_id, exist_tags }: { ticket_id: number; exist_tags: TagType[] }) {
    const { user } = useContext(AuthContext);
    //! タグの一覧を取得
    const { data: tags } = useSWRImmutable<TagType[]>(user?.token ? ["/tags", user.token] : null, ([url, token]) => fetcher(url, token as string));

    //! タグの追加
    const addTags = (tag: TagType) => {
        if (user) {
            modifier
                .put("/tickets-info/tag", user.token, { ticket_id: ticket_id, tag_id: tag.id })
                .then(() => {
                    mutate(["/tickets-info", user.token]);
                })
                .catch(() => {
                    toast.error("Failed to add tag");
                });
        }
    };

    //! タグの一覧から既存のタグを除外
    const availableTags = tags?.filter((tag) => !exist_tags.some((exist_tag) => exist_tag.id === tag.id));

    return (
        <Popover>
            <PopoverTrigger asChild>
                <CirclePlus size={18} />
            </PopoverTrigger>
            <PopoverContent>
                <ScrollArea className="h-36 w-full ">
                    <AddTag />
                    {Array.isArray(availableTags) &&
                        availableTags.map((tag, index) => {
                            return (
                                <div key={index}>
                                    <div className="cursor-pointer" onClick={() => addTags(tag)}>
                                        {tag.name}
                                    </div>

                                    <Separator className="w-full my-2" />
                                </div>
                            );
                        })}
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
}
