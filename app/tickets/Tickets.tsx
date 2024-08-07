"use client";
import TicketCard from "./TicketCard";
import { TagType, TicketType } from "@/lib/types";
import fetcher from "@/lib/fetcher";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import useSWRImmutable from "swr/immutable";
import { Skeleton } from "@/components/ui/skeleton";
import AddTicket from "./AddTicket";

type TicketTag = {
    ticket_id: number;
    tag_id: number;
};

type TicketCardProps = TicketType & {
    stocks?: { stock: number };
    tags?: TicketTag[];
};

export default function Tickets() {
    const { user } = useContext(AuthContext);
    //! チケットの一覧を取得
    const {
        data: tickets,
        error: ticketsError,
        isLoading: ticketsLoading,
    } = useSWRImmutable<TicketCardProps[]>(user?.token ? ["/tickets-info", user.token] : null, ([url, token]) => fetcher(url, token as string));

    if (ticketsLoading || ticketsError) {
        return (
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-5">
                {Array(6)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} className="h-64 w-full" />
                    ))}
            </div>
        );
    }

    return (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-5">
            <AddTicket />
            {Array.isArray(tickets) && tickets.map((ticket, index) => <TicketCard key={index} ticket={ticket}></TicketCard>)}
        </div>
    );
}
