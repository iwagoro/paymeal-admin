"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useHorm } from "./useHorm";
import { Large } from "@/components/ui/typography";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
export default function Home() {
    const { user, dailySales, weeklySales, monthlySales, dailyOrders } = useHorm();
    const dailyGoal = Number(process.env.NEXT_PUBLIC_DAILY_GOAL) || 0;
    const weeklyGoal = Number(process.env.NEXT_PUBLIC_WEEKLY_GOAL) || 0;
    const monthlyGoal = Number(process.env.NEXT_PUBLIC_MONTHLY_GOAL) || 0;
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Welcome Back!</CardTitle>
                    <CardDescription className="text-xs">USER : {user.email}</CardDescription>
                    <CardDescription className="text-xs">ID : {user.id}</CardDescription>
                </CardHeader>
            </Card>
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
                <CardHeader className="w-full flex flex-row justify-between items-center">
                    <div>
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>Recent transactions from your store.</CardDescription>
                    </div>
                    <Link href="/orders">
                        <Button>View All</Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left">No.</TableHead>
                                <TableHead className="text-left">ID</TableHead>
                                <TableHead className="text-center">status</TableHead>
                                <TableHead className="text-right">Date</TableHead>
                                <TableHead className="text-right">price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dailyOrders?.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-left">{item.number}</TableCell>
                                    <TableCell className="text-left">{item.id}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge>{item.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{item.date}</TableCell>
                                    <TableCell className="text-right">¥{item.total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
