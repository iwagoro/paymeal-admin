"use client";

import { useState, createContext, useEffect, useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TicketFormValues, TicketType } from "@/lib/types";
import { addTicket } from "@/lib/api/ticket";
import useTicket from "./useTicket";
import { AppContext } from "@/provider/app-provider";

export default function AddTicket() {
    const { user } = useContext(AppContext);
    const { tags, ticketTags, updateTicketDetails } = useTicket();
    const [tagsWithTicket, setTagsWithTicket] = useState<number[]>([]);
    const { register, handleSubmit, control } = useForm<TicketFormValues>({
        defaultValues: {
            name: "",
            description: "",
            img_url: "",
            price: 0,
            stock: 0,
            contents: [],
        },
    });

    const { fields, append } = useFieldArray({
        control,
        name: "contents",
    });

    const onSubmit = async (data: TicketFormValues) => {
        console.log(data);
        addTicket(user.token, data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="w-full grid grid-cols-3 gap-8">
                <div className="w-full flex flex-col gap-3">
                    <Label>Image URL</Label>
                    <Input type="text" {...register("img_url")} />
                    <Label>Name</Label>
                    <Input type="text" {...register("name")} />
                    <Label>Description</Label>
                    <Input type="text" {...register("description")} />
                    <Label>Price</Label>
                    <Input type="text" {...register("price")} />
                    <Label>Stock</Label>
                    <Input type="text" {...register("stock")} />
                </div>
                <div className="w-full flex flex-col gap-3">
                    <Label>Contents</Label>
                    {fields.map((field, index) => (
                        <Input type="text" key={field.id} {...register(`contents.${index}.value`)} />
                    ))}
                    <Button variant="outline" type="button" onClick={() => append({ value: "" })}>
                        Add Content
                    </Button>
                </div>
                <div className="w-full">
                    {Array.isArray(tags) &&
                        tags.length > 0 &&
                        tags.map((tag) => (
                            <Badge
                                key={tag.id}
                                className="m-1"
                                variant={tagsWithTicket.includes(tag.id) || tag.name == "all" ? "default" : "outline"}
                                onClick={() => {
                                    if (tagsWithTicket.includes(tag.id)) {
                                        setTagsWithTicket((prev) => prev.filter((id) => id !== tag.id));
                                    } else {
                                        setTagsWithTicket((prev) => [...prev, tag.id]);
                                    }
                                }}
                            >
                                {tag.name}
                            </Badge>
                        ))}
                </div>
            </div>

            <Button className="my-5 w-full " type="submit">
                Confirm
            </Button>
        </form>
    );
}
