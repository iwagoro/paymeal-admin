import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Notifications from "./Notifications";
import AddNotification from "./AddNotification";

export default function Page() {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <AddNotification />
            <Suspense fallback={<Skeleton className="h-80 w-full " />}>
                <Notifications />
            </Suspense>
        </div>
    );
}
