//? user
export type userType = {
    email: string;
    id: string;
    token: string;
    img_url: string | null;
};
//? ticket
export type TicketType = {
    id: number;
    name: string;
    description: string;
    img_url: string;
    price: number;
    stock: number;
    contents: string[];
};

export type RelationType = {
    ticket_id: number;
    tag_id: number;
};

export type TagType = {
    id: number;
    name: string;
};

export type TicketFormValues = {
    name: string;
    description: string;
    img_url: string;
    price: number;
    stock: number;
    contents: { value: string }[];
};

//? cart
export type OrderType = {
    id: string;
    status: string;
    items: {
        ticket: TicketType;
        quantity: number;
    }[];

    date: string;
    number: number;
    total: number;
};
