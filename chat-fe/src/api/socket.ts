class SocketService {
    private static instance: SocketService;
    private socket: WebSocket | null = null;
    private listeners: ((data: any) => void)[] = [];
    private pendingMessages: any[] = [];

    static getInstance() {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    connect() {
        if (
            this.socket &&
            this.socket.readyState !== WebSocket.CLOSED
        ) {
            return;
        }

        this.socket = new WebSocket("wss://chat.longapp.site/chat/chat");

        this.socket.onopen = () => {
            console.log("WebSocket connected");

            // gửi các message đang chờ
            this.pendingMessages.forEach((msg) => {
                this.socket?.send(JSON.stringify(msg));
            });
            this.pendingMessages = [];
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.listeners.forEach((cb) => cb(data));
        };

        this.socket.onclose = () => {
            console.log("WebSocket closed");
            this.socket = null;
        };

        this.socket.onerror = (err) => {
            console.error("WebSocket error", err);
        };
    }

    send(data: Record<string, any>) {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            console.warn("Socket not open, queue message");
            this.pendingMessages.push(data);
        }
    }

    onMessage(callback: (data: any) => void) {
        this.listeners.push(callback);

        // cleanup để tránh nhận message trùng
        return () => {
            this.listeners = this.listeners.filter(
                (cb) => cb !== callback
            );
        };
    }
}

export default SocketService.getInstance();
