// src/components/Auth/AuthPage.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { styles } from "./authStyles";
import { User } from "../../utils/types";
import LiquidEther from "../common/LiquidEther";
import "../common/LiquidEther.css";

type Props = {
    onAuthSuccess: (user: User) => void;
};

const AuthPage: React.FC<Props> = ({ onAuthSuccess }) => {
    const [mode, setMode] = useState<"login" | "register">("login");

    return (
        <div
            style={{
                ...styles.container,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Nền động LiquidEther */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                }}
            >
                <LiquidEther
                    colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />
            </div>
            <motion.div
                style={{
                    ...styles.card,
                    position: "relative",
                    zIndex: 1,
                }}
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
};
export default AuthPage;


