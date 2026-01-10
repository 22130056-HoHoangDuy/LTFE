import { useAuthContext } from "../context/AuthContext";

export default function useAuth() {
    const { user, login, logout, isAuthenticated } = useAuthContext();

    return {
        user,
        login,
        logout,
        isAuthenticated,
    };
}
