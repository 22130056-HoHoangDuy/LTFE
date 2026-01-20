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

    private reconnectTimeout: NodeJS.Timeout | null = null;
    private isConnecting = false;

    connect() {
        if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
            return;
        }

        if (this.isConnecting) return;
        this.isConnecting = true;

        const wsUrl = process.env.REACT_APP_WS_URL || "wss://chat.longapp.site/chat/chat";
        console.log("Connecting to WebSocket:", wsUrl);

        this.socket = new WebSocket(wsUrl);

        this.socket.onopen = () => {
            console.log("WebSocket connected");
            this.isConnecting = false;
            if (this.reconnectTimeout) {
                clearTimeout(this.reconnectTimeout);
                this.reconnectTimeout = null;
            }

            // gửi các message đang chờ
            this.pendingMessages.forEach((msg) => {
                this.socket?.send(JSON.stringify(msg));
            });
            this.pendingMessages = [];
        };

        this.socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                this.listeners.forEach((cb) => cb(data));
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        this.socket.onclose = () => {
            console.log("WebSocket closed");
            this.socket = null;
            this.isConnecting = false;

            // Auto reconnect after 3 seconds
            if (!this.reconnectTimeout) {
                this.reconnectTimeout = setTimeout(() => {
                    console.log("Attempting to reconnect...");
                    this.reconnectTimeout = null;
                    this.connect();
                }, 3000);
            }
        };

        this.socket.onerror = (err) => {
            console.error("WebSocket error", err);
            // close will be called automatically, triggering reconnect
        };
    }

    send(data: Record<string, any>) {
        if (this.socket?.readyState === WebSocket.OPEN) {
            console.log("SEND:", data);
            this.socket.send(JSON.stringify(data));
        } else {
            console.warn("Socket not open, queue message and attempting connect");
            this.pendingMessages.push(data);
            this.connect();
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
