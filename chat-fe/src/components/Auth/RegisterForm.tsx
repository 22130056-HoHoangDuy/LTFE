import { useState } from "react";
import { motion } from "framer-motion";
import socket from "../../api/socket";
import { styles } from "./authStyles";

export default function RegisterForm() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = () => {
        setError("");
        setSuccess("");

        socket.send({
            action: "onchat",
            data: {
                event: "REGISTER",
                data: { user, pass },
            },
        });

        socket.onMessage((msg) => {
            if (msg.event === "REGISTER" && msg.status === "success") {
                setSuccess("Đăng ký thành công, hãy đăng nhập");
            } else if (msg.event === "REGISTER") {
                setError("Tài khoản đã tồn tại");
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 style={styles.title}>Register</h2>

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
            {success && <div style={{ color: "green" }}>{success}</div>}

            <motion.button
                style={styles.button}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRegister}
            >
                Register
            </motion.button>
        </motion.div>
    );
}
