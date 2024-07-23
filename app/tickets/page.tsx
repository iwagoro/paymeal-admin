import Tickets from "./Tickets/Tickets";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function TicketsPage() {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <Suspense
                fallback={
                    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-5">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton key={index} className="h-80 w-full " />
                        ))}
                    </div>
                }
            >
                <Tickets />
            </Suspense>
        </div>
    );
}
