import { useState, useEffect, useContext } from "react";
import { AppContext } from "@/provider/app-provider";
import { getAllTickets, getTags, getRelations, addTicket, deleteTicket, updateTicket, setTagsToTicket } from "@/lib/api/ticket";
import { TicketFormValues, TicketType, RelationType, TagType } from "@/lib/types";
import { toast } from "sonner";

export default function useTicket() {
    const { user } = useContext(AppContext);
    const [tickets, setTickets] = useState<TicketType[]>([]);
    const [tags, setTags] = useState<TagType[]>([]);
    const [ticketTags, setTicketTags] = useState<RelationType[]>([]);
    const [selectedTickets, setSelectedTickets] = useState<TicketType[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>("all");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ticketsRes, tagsRes, ticketTagsRes] = await Promise.all([getAllTickets(), getTags(), getRelations()]);
                setTickets(ticketsRes);
                setTags(tagsRes);
                console.log(tagsRes);
                setTags([{ id: 0, name: "all" }, ...tagsRes]);
                setTicketTags(ticketTagsRes);
                setSelectedTickets(ticketsRes);
            } catch (error) {
                toast.error("Failed to fetch data");
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const selected_tag_id = tags.find((tag) => tag.name === selectedTag)?.id;
        if (selectedTag === "all") {
            setSelectedTickets(tickets);
        } else {
            setSelectedTickets(tickets.filter((ticket) => ticketTags.find((tag) => tag.ticket_id === ticket.id && tag.tag_id === selected_tag_id)));
        }
    }, [selectedTag]);

    const addNewTicket = async (data: TicketFormValues) => {
        try {
            await addTicket(user.token, data);
            toast.success("Ticket added successfully");
        } catch (error) {
            toast.error("Failed to add ticket");
        }
    };

    const updateTicketDetails = async (id: number, ticket: TicketType, tags: string[]) => {
        try {
            await updateTicket(user.token, id, ticket);
            await setTagsToTicket(user.token, id, tags);
            toast.success("Ticket updated successfully");
        } catch (error) {
            toast.error("Failed to update ticket");
        }
    };

    return { tickets, tags, ticketTags, selectedTickets, selectedTag, setSelectedTickets, setSelectedTag, addNewTicket, updateTicketDetails };
}
