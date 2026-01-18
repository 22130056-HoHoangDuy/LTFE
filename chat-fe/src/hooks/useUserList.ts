import { useEffect, useState } from "react";
import socket from "../api/socket";

export interface UserItem {
    username: string;
}

export default function useUserList() {
    const [users, setUsers] = useState<UserItem[]>([]);

    useEffect(() => {
        socket.send({
            action: "onchat",
            data: {
                event: "GET_USER_LIST",
            },
        });

        const unsubscribe = socket.onMessage((msg: any) => {
            if (msg.event === "GET_USER_LIST" && Array.isArray(msg.data)) {
                setUsers(
                    msg.data.map((u: any) => ({
                        username: u.user || u.username || u,
                    }))
                );
            }
        });

        return unsubscribe;
    }, []);

    return users;
}
