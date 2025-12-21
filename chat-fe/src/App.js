import React from "react";
import { useState } from "react";
import Login from "./components/Login/Login";
import ChatPage from "./pages/ChatPage";
import ChatBox from "./components/Chat/ChatBox";


function App() {
    // const [user, setUser] = useState(null);
    const user = { name: "MinhHao", id: 1 }; //test Chat

    //Ban đầu
    // if (!user) {
    //     return <Login onLoginSuccess={setUser} />;
    // }
    // return <ChatPage user={user} />

    // Test ChatBox
    return (
        <ChatBox name="Test Chat" />
    );
}

export default App;
