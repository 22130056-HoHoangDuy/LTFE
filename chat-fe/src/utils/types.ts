// ===== USER =====
export type User = {
    id: string;
    username: string;
};

// ===== SOCKET =====
export type SocketMessage = {
    event: string;
    status?: "success" | "error";
    data?: any;
    mes?: string;
};

// Chuẩn hoá: frontend chỉ dùng content là string
export type TextMessage = {
    type: "text";
    sender: string;
    content: string;
    time?: string;
};

export type SystemMessage = {
    type: "system";
    content: string; // đã format thành string
    time?: string;
};

export type ChatMessage = TextMessage | SystemMessage;