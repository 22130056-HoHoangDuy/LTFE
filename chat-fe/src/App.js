import { useState } from "react";
import Login from "./components/Login/Login";
import ChatPage from "./pages/ChatPage";

function App() {
    const [user, setUser] = useState(null);

    if (!user) {
        return <Login onLoginSuccess={setUser} />;
    }

    return <ChatPage user={user} />;
}

export default App;
