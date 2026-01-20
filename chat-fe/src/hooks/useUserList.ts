// src/hooks/useUserList.ts
import { useEffect, useState } from "react";
import socket from "../api/socket";

export type UserItem = {
    id: string;
    name: string;
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
                    return { id, name: id };
                }

                // nếu server trả về object
                if (typeof u === "object" && u !== null) {
                    const id = String(u.id ?? u.userId ?? u.username ?? idx);
                    const name = String(u.name ?? u.username ?? u.user ?? id);
                    return { id, name };
                }

                // fallback
                return { id: String(idx), name: String(u) };
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