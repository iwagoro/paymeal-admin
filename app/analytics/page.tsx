"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Large } from "@/components/ui/typography";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useAnalytics from "./useAnalytics";
import { Car } from "lucide-react";
export default function Home() {
    const { sales, dailySales, weeklySales, monthlySales } = useAnalytics();

    const dailyGoal = Number(process.env.NEXT_PUBLIC_DAILY_GOAL) || 0;
    const weeklyGoal = Number(process.env.NEXT_PUBLIC_WEEKLY_GOAL) || 0;
    const monthlyGoal = Number(process.env.NEXT_PUBLIC_MONTHLY_GOAL) || 0;
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <div className="w-full flex gap-5">
                <Card className="flex-1">
                    <CardHeader>
                        <Large>Daily</Large>
                        <CardTitle>¥{dailySales}</CardTitle>
                        <CardDescription>Goal ¥{dailyGoal}</CardDescription>
                        <Progress value={(dailySales / dailyGoal) * 100} />
                    </CardHeader>
                </Card>
                <Card className="flex-1">
                    <CardHeader>
                        <Large>Weekly</Large>
                        <CardTitle>¥{weeklySales}</CardTitle>
                        <CardDescription>Goal ¥{weeklyGoal}</CardDescription>
                        <Progress value={(weeklySales / weeklyGoal) * 100} />
                    </CardHeader>
                </Card>
                <Card className="flex-1">
                    <CardHeader>
                        <Large>Monthly</Large>
                        <CardTitle>¥{monthlySales}</CardTitle>
                        <CardDescription>Goal ¥{monthlyGoal}</CardDescription>
                        <Progress value={(monthlySales / monthlyGoal) * 100} />
                    </CardHeader>
                </Card>
            </div>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Sales for each day of the month</CardTitle>
                </CardHeader>
                <CardContent className="w-full  h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={sales}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip contentStyle={{ backgroundColor: "white", color: "black" }} />
                            <Legend />
                            <Bar dataKey="total" fill="#16a34a" activeBar={<Rectangle fill="#16a34a" stroke="blue" />} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-5">
                    <Card className="w-full">
                        <CardHeader></CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    );
}
