export type UserType = {
    id: string;
    email: string;
    token: string;
    notification_token: string | null;
};

export type TicketType = {
    id: number;
    name: string;
    description: string;
    img_url: string;
    price: number;
    stock: number;
    sales: number;
    tags: string[];
    contents: string[];
};

export type TicketStockType = {
    ticket_id: number;
    stock: number;
    unit_sales: number;
};

export type TagType = {
    id: number;
    name: string;
};

export type CartType = {
    id: string;
    status: string;
    purchase_date: Date | null;
    order_date: Date | null;
    items: OrderDetailType[];
    number: number;
    total: number;
};

export type OrderType = {
    id: string;
    status: string;
    purchase_date: Date;
    order_date: Date;
    number: number;
    items: OrderDetailType[];
    total: number;
};

export type OrderDetailType = {
    ticket_id: number;
    ticket_name: string;
    ticket_price: number;
    quantity: number;
};
