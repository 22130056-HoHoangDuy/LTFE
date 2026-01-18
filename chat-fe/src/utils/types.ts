// ===== USER =====
export type User = {
    id: string;
    username: string;
};

// ===== MESSAGE =====
export type TextMessage = {
    type: "text";
    sender: string;
    content: string;
    time?: string;
};

export type SystemMessage = {
    type: "system";
    content: {
        name: string;
        action: string;
        actionTime: string;
    };
};

export type ChatMessage = TextMessage | SystemMessage;

// ===== SOCKET =====
export type SocketMessage = {
    event: string;
    status?: "success" | "error";
    data?: any;
    mes?: string;
};
