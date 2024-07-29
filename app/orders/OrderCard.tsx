import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import modifier from "@/lib/modifier";
import { OrderType } from "@/lib/types";
import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";
import { mutate } from "swr";

export default function OrderCard({ order }: { order: OrderType }) {
    const { user } = useContext(AuthContext);
    const completeOrder = () => {
        if (user) {
            modifier.put("/orders/", user.token, { order_id: order.id }).then(() => mutate(["/orders/all/today", user.token]));
        }
    };
    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>No.{order.number}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">ticket</TableHead>
                            <TableHead className="text-right">quantity</TableHead>
                        </TableRow>
                    </TableHeader>

                    {order.items.map((item: any, index: number) => {
                        return (
                            <TableBody key={index}>
                                <TableRow>
                                    <TableHead className="text-left">{item.ticket.name}</TableHead>
                                    <TableHead className="text-right">{item.quantity}</TableHead>
                                </TableRow>
                            </TableBody>
                        );
                    })}
                </Table>
            </CardContent>
            <CardFooter className="mt-auto">
                <Button variant="outline" className="w-full" onClick={completeOrder}>
                    Complete
                </Button>
            </CardFooter>
        </Card>
    );
}
