class SocketService {
    static instance = null;
    socket = null;

    static getInstance() {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    connect() {
        if (this.socket) return;

        this.socket = new WebSocket("wss://chat.longapp.site/chat/chat");

        this.socket.onopen = () => {
            console.log(" WebSocket connected");
        };

        this.socket.onclose = () => {
            console.log(" WebSocket closed");
            this.socket = null;
        };

        this.socket.onerror = (err) => {
            console.error(" WebSocket error", err);
        };
    }

    send(data) {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        }
    }

    onMessage(callback) {
        if (!this.socket) return;
        this.socket.onmessage = (event) => {
            callback(JSON.parse(event.data));
        };
    }
}

export default SocketService.getInstance();
