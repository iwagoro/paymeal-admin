import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Schedules from "./Schedules";

export default function Home() {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <Suspense fallback={<Skeleton className="h-80 w-full " />}>
                <Schedules />
            </Suspense>
        </div>
    );
}
