import React, { useEffect } from "react";
<<<<<<< HEAD
import Aurora from "../Common/Aurora";
=======
import Aurora from "../common/Aurora";
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
import ChatLayout from "../Chat/ChatLayout";
import useChat from "../../hooks/useChat";
import { useAuthContext } from "../../context/AuthContext";

<<<<<<< HEAD

interface Props {
    selectedRoom: string | null;
}

const ChatMainView: React.FC<Props> = ({ selectedRoom }) => {
=======
interface Props {
    selectedRoom: string | null;
    theme: "dark" | "light";
    user: {
        name: string;
        username: string;
        avatar: string;
    };
}

const ChatMainView: React.FC<Props> = ({ selectedRoom, theme, user }) => {
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
    const chat = useChat();

    useEffect(() => {
        if (selectedRoom) {
            chat.selectChat("people", selectedRoom);
        }
    }, [selectedRoom]);

<<<<<<< HEAD
=======
    const textColor = theme === "dark" ? "#fff" : "#222";

>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
    if (!selectedRoom) {
        return (
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <Aurora
                    colorStops={["#3A29FF", "#19C1E7", "#10A478"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
<<<<<<< HEAD
                        color: "#fff",
=======
                        color: textColor,
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
                        fontSize: 22,
                        fontWeight: 600,
                    }}
                >
                    Hãy chọn phòng hoặc người để bắt đầu trò chuyện
                </div>
            </div>
        );
    }

<<<<<<< HEAD
    return <ChatLayout />;
};
export default ChatMainView;

=======
    return (
        <div style={{ flex: 1, color: textColor }}>
            {/* Nếu ChatLayout cần user và selectedRoom, hãy truyền */}
            {/* <ChatLayout roomId={selectedRoom} user={user} /> */}
            <ChatLayout user={{
                name: "",
                username: "",
                avatar: ""
            }} theme={"dark"} />

        </div>

    );
  }

  // khi đã chọn phòng, render ChatLayout (nơi hiển thị lịch sử và input)


export default ChatMainView;
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
