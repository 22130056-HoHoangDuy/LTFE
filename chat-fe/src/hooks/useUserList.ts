// src/hooks/useUserList.ts
import { useEffect, useState } from "react";
import socket from "../api/socket";

export type UserItem = {
    id: string;
    name: string;
    type?: "room" | "people";
};

export default function useUserList() {
    const [users, setUsers] = useState<UserItem[]>([]);

    useEffect(() => {
        const unsub = socket.onMessage((msg: any) => {
            // chỉ quan tâm GET_USER_LIST
            if (msg?.event !== "GET_USER_LIST") return;
            if (msg?.status === "error") return;

            const raw = msg.data;
            if (!Array.isArray(raw)) {
                setUsers([]);
                return;
            }

            const normalized = raw.map((u: any, idx: number) => {
                // nếu server trả về string hoặc number
                if (typeof u === "string" || typeof u === "number") {
                    const id = String(u);
                    // Default to people if just a string, unless we have convention. 
                    // But usually simple strings are usernames.
                    return { id, name: id, type: "people" as const };
                }

                // nếu server trả về object
                if (typeof u === "object" && u !== null) {
                    const id = String(u.id ?? u.userId ?? u.username ?? idx);
                    const name = String(u.name ?? u.username ?? u.user ?? id);
                    // Try to detect type or use existing
                    let type: "room" | "people" = "people";
                    
                    if (u.type === "room" || u.type === "people") {
                        type = u.type;
                    } else if (u.roomId || u.roomName) {
                        type = "room";
                    }

                    return { id, name, type };
                }

                // fallback
                return { id: String(idx), name: String(u), type: "people" as const };
            });

            setUsers(normalized);
        });

        // khi mount, có thể chủ động yêu cầu danh sách
        try {
            socket.send({
                action: "onchat",
                data: { event: "GET_USER_LIST" },
            });
        } catch {
            // ignore send error in hook
        }

        return unsub;
    }, []);

    return users;
}