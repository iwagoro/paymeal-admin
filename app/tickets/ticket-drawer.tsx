import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

import TicketForm from "./ticket-form";

export default function TicketDrawer({ ticket }: any, isOpen: boolean) {
    return (
        <DrawerContent className="w-full flex justify-center items-center">
            <DrawerHeader className="w-full max-w-4xl">
                <DrawerTitle className="my-5">Update Ticket Details</DrawerTitle>
                <DrawerClose />
            </DrawerHeader>
            <TicketForm ticket={ticket} />
        </DrawerContent>
    );
}
