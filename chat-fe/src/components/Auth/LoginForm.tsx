import { useState } from "react";
import { motion } from "framer-motion";
import socket from "../../api/socket";
import { styles } from "./authStyles";
import { User } from "../../utils/types";

type Props = {
    onSuccess: (user: User) => void;
};

export default function LoginForm({ onSuccess }: Props) {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = () => {
        setLoading(true);
        setError("");

        socket.send({
            action: "onchat",
            data: {
                event: "LOGIN",
                data: { user, pass },
            },
        });

        socket.onMessage((msg) => {
            if (msg.event === "LOGIN" && msg.status === "success") {
                onSuccess({
                    id: msg.data.id ?? "",
                    username: msg.data.user || user,
                });
            } else if (msg.event === "LOGIN") {
                setError("Sai tài khoản hoặc mật khẩu");
                setLoading(false);
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 style={styles.title}>Login</h2>

            <input
                style={styles.input}
                placeholder="Username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
            />

            <input
                style={styles.input}
                type="password"
                placeholder="Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
            />

            {error && <div style={styles.error}>{error}</div>}

            <motion.button
                style={styles.button}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </motion.button>
        </motion.div>
    );
}
