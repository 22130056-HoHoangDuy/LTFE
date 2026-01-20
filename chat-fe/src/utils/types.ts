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

export type FileMessage = {
    type: "file";
    sender: string;
    fileName: string;
    fileType: string;
    content: string; // Base64
    time?: string;
};

export type AudioMessage = {
    type: "audio";
    sender: string;
    content: string; // Base64
    time?: string;
};

export type StickerMessage = {
    type: "sticker";
    sender: string;
    content: string; // URL/Path to sticker
    time?: string;
};

export type ImageMessage = {
    type: "image";
    sender: string;
    content: string; // Base64
    time?: string;
};

export type ChatMessage = TextMessage | SystemMessage | FileMessage | AudioMessage | StickerMessage | ImageMessage;