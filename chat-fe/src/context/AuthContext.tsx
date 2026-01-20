import { createContext, useContext, useState, useEffect } from "react";

export type User = {
    username: string;
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem("chat_user");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem("chat_user");
            }
        }
        setLoading(false);
    }, []);

    const login = (u: User) => {
        setUser(u);
        localStorage.setItem("chat_user", JSON.stringify(u));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("chat_user");
    };

    if (loading) return null; // or a spinner

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
    return ctx;
};
