import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { styles } from "./authStyles";
import { User } from "../../utils/types";

type Props = {
    onAuthSuccess: (user: User) => void;
};

export default function AuthPage({ onAuthSuccess }: Props) {
    const [mode, setMode] = useState<"login" | "register">("login");

    return (
        <div style={styles.container}>
            <motion.div
                style={styles.card}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <AnimatePresence mode="wait">
                    {mode === "login" ? (
                        <LoginForm onSuccess={onAuthSuccess} />
                    ) : (
                        <RegisterForm />
                    )}
                </AnimatePresence>

                <div
                    style={styles.switch}
                    onClick={() =>
                        setMode(mode === "login" ? "register" : "login")
                    }
                >
                    {mode === "login"
                        ? "Chưa có tài khoản? Đăng ký"
                        : "Đã có tài khoản? Đăng nhập"}
                </div>
            </motion.div>
        </div>
    );
}
