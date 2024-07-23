"use client";

import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { H1, P } from "@/components/ui/typography";
import fetcher from "@/lib/fetcher";
import { AuthContext } from "@/provider/AuthProvider";
import { useContext, useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import SelectTickets from "./SelectTickets";
import ScheduleCard from "./ScheduleCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Schedules() {
    const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [month, setMonth] = useState(new Date().getMonth());
    const [monthName, setMonthName] = useState("");
    const { user } = useContext(AuthContext);

    const { data: menu, error, isLoading } = useSWR<any>(user?.token ? ["/tickets/daily/month", user.token] : null, ([url, token]) => fetcher(url, token as string, { month: month }));

    useEffect(() => {
        if (!user) return;
        setMonthName(monthNames[month]);

        mutate(["/tickets/daily/month", user.token]);
    }, [month]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full flex flex-col gap-5 items-center">
                <div className="w-fit flex items-center justify-between gap-5">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setMonth(month - 1);
                        }}
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <H1 className="w-full text-center">{monthName}</H1>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setMonth(month + 1);
                        }}
                    >
                        <ArrowRight size={18} />
                    </Button>
                </div>
                <div className="w-full grid grid-cols-5 gap-4">
                    <div className="col-span-1 text-center">Monday</div>
                    <div className="col-span-1 text-center">Tuesday</div>
                    <div className="col-span-1 text-center">Wednesday</div>
                    <div className="col-span-1 text-center">Thursday</div>
                    <div className="col-span-1 text-center">Friday</div>
                </div>
            </div>
            <div className="w-full grid grid-cols-5 gap-2">
                {Object.keys(menu || {}).map((key, index) => {
                    return (
                        <Card key={index} className="flex flex-col rounded-sm">
                            <CardHeader className="bg-secondary">
                                <CardDescription className="w-full text-center">{key}</CardDescription>
                            </CardHeader>
                            <CardHeader>
                                <div className="w-full flex flex-col gap-2">
                                    {Array.isArray(menu[key]) && menu[key].length > 0 ? (
                                        menu[key].map((item: any, index: number) => {
                                            return <ScheduleCard key={index} menu={item} date={key} />;
                                        })
                                    ) : (
                                        <P className="text-center">No Content</P>
                                    )}
                                </div>
                            </CardHeader>
                            <CardFooter className="w-full flex justify-center">
                                <SelectTickets date={key} />
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
