export type User = {
    id: string;
    username: string;
    email: string;
};

export type SocketMessage = {
    event: string;
    data: any;
};
