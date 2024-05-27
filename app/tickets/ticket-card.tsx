"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import TicketDrawer from "./ticket-drawer";
import { useState } from "react";
import { TicketType } from "@/lib/types";

export default function TicketCard({ ticket }: { ticket: TicketType }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Card key={ticket.id}>
            <img src={ticket.img_url} alt={ticket.name} className="w-full aspect-video object-cover" />
            <CardHeader>
                <CardTitle>{ticket.name}</CardTitle>
                <CardDescription>{ticket.description}</CardDescription>
            </CardHeader>

            <CardContent>
                <Badge>¥{ticket.price}</Badge>
                <CardDescription>{ticket.stock} in stock</CardDescription>
            </CardContent>
            <CardContent>
                <Drawer>
                    <DrawerTrigger className="w-full " asChild>
                        <Button className="w-full" onClick={() => setIsOpen((prev) => !prev)}>
                            Detail
                        </Button>
                    </DrawerTrigger>
                    {isOpen && <TicketDrawer ticket={ticket} />}
                </Drawer>
            </CardContent>
        </Card>
    );
}
