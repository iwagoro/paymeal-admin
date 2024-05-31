"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TicketCard from "./ticket-card";
import useTicket from "./useTicket";
import TicketForm from "./ticket-form";
import { TicketType } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus } from "lucide-react";
import AddTicket from "./add-ticket";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";

import * as AccordionPrimitive from "@radix-ui/react-accordion";

export default function Home() {
    const { tags, selectedTickets, selectedTag, setSelectedTag } = useTicket();
    const [columns, setColumns] = useState<TicketType[][]>([[], [], []]);

    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <div className="flex gap-5 w-full">
                <Card className="flex-[2] h-fit">
                    <CardHeader>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <div className="w-full flex justify-between ">
                                    <CardTitle>Add Tickets</CardTitle>
                                    <AccordionPrimitive.Trigger>
                                        <Switch />
                                    </AccordionPrimitive.Trigger>
                                </div>
                                <AccordionContent>
                                    <AddTicket />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardHeader>
                </Card>
                <Card className="flex-1 h-fit">
                    <CardHeader>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <div className="w-full flex justify-between ">
                                    <CardTitle>Edit Schedule</CardTitle>
                                    <AccordionPrimitive.Trigger>
                                        <Switch />
                                    </AccordionPrimitive.Trigger>
                                </div>
                                <AccordionContent className="w-full flex justify-center items-center">
                                    <Calendar mode="single" className="rounded-md border" />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardHeader>
                </Card>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList>
                    {Array.isArray(tags) &&
                        tags.length > 0 &&
                        tags.map((tag) => (
                            <TabsTrigger key={tag.name} value={tag.name} onClick={() => setSelectedTag(tag.name)}>
                                {tag.name}
                            </TabsTrigger>
                        ))}
                </TabsList>
                <TabsContent value={selectedTag} className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-3">
                    {selectedTickets.map((ticket) => (
                        <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}
