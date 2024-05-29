"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCheck } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Switch } from "@/components/ui/switch";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

import useOrder from "./useOrder";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export default function Home() {
    const { selectedOrders, stateNames, completeOrder, selectedState, setSelectedState } = useOrder();
    return (
        <div className="w-full h-full flex flex-col justify-start items-center gap-10">
            <Tabs defaultValue="purchased" className="w-full flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <TabsList className="w-fit">
                        {stateNames.map((state, index) => (
                            <TabsTrigger key={index} value={state} onClick={() => setSelectedState(state)}>
                                {state}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
                <Card className="w-full">
                    <CardHeader className="flex-row justify-between">
                        <CardTitle>Orders</CardTitle>
                        <Badge className="w-fit">{selectedState}</Badge>
                    </CardHeader>
                    <CardContent>
                        <TabsContent value={selectedState}>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-left">No.</TableHead>
                                        <TableHead className="text-left">ID</TableHead>
                                        <TableHead className="text-center">status</TableHead>
                                        <TableHead className="text-right">Date</TableHead>
                                        <TableHead className="text-right">price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                {selectedOrders.length > 0 ? (
                                    selectedOrders.map((item, index) => (
                                        <TableBody key={index}>
                                            <TableRow>
                                                <TableCell className="text-left">{item.number}</TableCell>
                                                <TableCell className="text-left">{item.id}</TableCell>
                                                <TableCell className="text-center">
                                                    <Badge>{item.status}</Badge>
                                                </TableCell>
                                                <TableCell className="text-right">{item.date}</TableCell>
                                                <TableCell className="text-right">¥{item.total}</TableCell>
                                                <TableCell className="text-right">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="outline" className="text-primary border-primary">
                                                                <CheckCheck size={20} />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                                <DialogDescription>This action cannot be undone. This order will permanently be complete.</DialogDescription>
                                                            </DialogHeader>
                                                            <DialogFooter>
                                                                <DialogClose asChild>
                                                                    <Button variant="outline">Cancel</Button>
                                                                </DialogClose>
                                                                <DialogClose asChild>
                                                                    <Button variant="default" onClick={() => completeOrder(item.id)}>
                                                                        Complete Order
                                                                    </Button>
                                                                </DialogClose>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    ))
                                ) : (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">
                                                No orders found
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TabsContent>
                    </CardContent>
                </Card>
            </Tabs>
        </div>
    );
}
