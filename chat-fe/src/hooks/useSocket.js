import { useEffect, useState } from "react";
import socket from "../api/socket";

export default function useSocket() {
    const [lastMessage, setLastMessage] = useState(null);

    useEffect(() => {
        socket.connect();

        socket.onMessage((data) => {
            console.log(" WS message:", data);
            setLastMessage(data);
        });
    }, []);

    return {
        send: socket.send.bind(socket),
        lastMessage,
    };
}
