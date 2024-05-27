"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useOrder from "./useOrder";
import { OrderType } from "@/lib/types";

export const OrderCard = ({ order }: { order: OrderType }) => {
    const { completeOrder } = useOrder();
    return (
        <div className="w-full h-full flex flex-col justify-start items-center gap-10">
            <div className="w-full flex gap-5">
                <Card className="flex-[2]">
                    <CardHeader>
                        <CardTitle>Orders</CardTitle>
                        <CardDescription>Recent Orders</CardDescription>
                    </CardHeader>
                </Card>
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>No.{order?.number}</CardTitle>
                        <CardDescription>{order?.id}</CardDescription>
                        <Badge className="w-fit">{order?.status}</Badge>
                    </CardHeader>
                </Card>
            </div>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left">Name</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-right">amount</TableHead>
                                <TableHead className="text-right">total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.isArray(order?.items) &&
                                order.items.length > 0 &&
                                order.items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.ticket.name}</TableCell>
                                        <TableCell className="text-center">{item.quantity}</TableCell>
                                        <TableCell className="text-right">¥{item.ticket.price}</TableCell>
                                        <TableCell className="text-right">¥{item.ticket.price * item.quantity}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Button className="w-full" onClick={() => completeOrder(order.id)}>
                Order Now
            </Button>
        </div>
    );
};
