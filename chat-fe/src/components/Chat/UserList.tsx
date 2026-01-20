<<<<<<< HEAD
// src/components/Chat/UserList.tsx
import React from "react";

type RawUser = any;
type UserItem = { id: string; name: string };

interface Props {
    users: RawUser[]; // có thể là string[] hoặc object[]
    selectedUserId?: string | null;
    onSelectUser: (id: string) => void;
}

const UserList: React.FC<Props> = ({ users, selectedUserId = null, onSelectUser }) => {
    return (
        <>
            {users.map((raw, idx) => {
                const isString = typeof raw === "string" || typeof raw === "number";
                const id = isString ? String(raw) : String(raw?.id ?? raw?.userId ?? raw?.username ?? idx);
                const name = isString ? String(raw) : String(raw?.name ?? raw?.username ?? raw?.user ?? id);
                const key = `${id}-${idx}`;

                return (
                    <div
                        key={key}
                        onClick={() => onSelectUser(id)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "8px 10px",
                            borderRadius: 8,
                            background: selectedUserId === id ? "#244D3D" : "transparent",
                            color: "#fff",
                            cursor: "pointer",
                        }}
                    >
                        <img
                            src="/icons/avatar.svg"
                            alt=""
                            width={32}
                            height={32}
                            style={{ borderRadius: "50%" }}
                        />
                        <span style={{ fontWeight: 500 }}>{name}</span>
                    </div>
                );
            })}
        </>
    );
};

export default UserList;
=======
import { useEffect, useState } from "react";
// @ts-ignore
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
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
