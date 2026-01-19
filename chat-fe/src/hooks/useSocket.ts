import { useEffect, useState } from "react";
import socket from "../api/socket";

export default function useSocket<T = any>() {
    const [messages, setMessages] = useState<T[]>([]);

    useEffect(() => {
        socket.connect();

        const unsubscribe = socket.onMessage((msg: T) => {
            console.log("RECEIVE:", msg);
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return {
        send: socket.send.bind(socket),
        messages,
    };
}
