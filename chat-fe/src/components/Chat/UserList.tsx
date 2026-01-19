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