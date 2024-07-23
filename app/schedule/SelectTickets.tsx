"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import fetcher from "@/lib/fetcher";
import { TicketType } from "@/lib/types";
import { AuthContext } from "@/provider/AuthProvider";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useContext } from "react";
import useSWR, { mutate } from "swr";
import modifier from "@/lib/modifier";

export default function SelectTickets({ date }: { date: string }) {
    const { user } = useContext(AuthContext);
    const { data: tickets, error, isLoading } = useSWR<TicketType[]>(user?.token ? ["/tickets", user.token] : null, ([url, token]) => fetcher(url, token as string));
    const addMenu = async (ticket_id: number) => {
        user &&
            ticket_id &&
            date &&
            modifier.post(`/tickets/daily`, user.token, { ticket_id: ticket_id, date: date }).then(() => {
                mutate(["/tickets/daily/month", user.token]);
            });
    };
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                    <Plus size={18} />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <ScrollArea className="h-72 w-full ">
                    {Array.isArray(tickets) &&
                        tickets.map((ticket, index) => {
                            return (
                                <div key={index}>
                                    <div className=" cursor-pointer" onClick={() => addMenu(ticket.id)}>
                                        {ticket.name}
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
