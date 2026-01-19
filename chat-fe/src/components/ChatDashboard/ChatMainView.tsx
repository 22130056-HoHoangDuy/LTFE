import React, { useEffect } from "react";
import Aurora from "../Common/Aurora";
import ChatLayout from "../Chat/ChatLayout";
import useChat from "../../hooks/useChat";

interface UserProp {
  name: string;
  username: string;
  avatar?: string;
}

interface Props {
  selectedRoom: string | null;
  user?: UserProp;
  theme?: "dark" | "light";
}

const ChatMainView: React.FC<Props> = ({ selectedRoom, user, theme = "dark" }) => {
  const chat = useChat();

  // nếu có selectedRoom thì gọi selectChat để load lịch sử
  useEffect(() => {
    if (selectedRoom) {
      // mặc định chọn kiểu "people"; nếu bạn cần room vs people logic khác, thay đổi ở đây
      chat.selectChat("people", selectedRoom);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoom]);

  const textColor = theme === "dark" ? "#fff" : "#222";

  // khi chưa chọn phòng, hiển thị background Aurora và thông báo
  if (!selectedRoom) {
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Aurora colorStops={["#3A29FF", "#19C1E7", "#10A478"]} blend={0.5} amplitude={1.0} speed={0.5} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: textColor,
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          Hãy chọn phòng hoặc người để bắt đầu trò chuyện
        </div>
      </div>
    );
  }

  // khi đã chọn phòng, render ChatLayout (nơi hiển thị lịch sử và input)
  return (
    <div style={{ flex: 1, color: textColor }}>
      <ChatLayout />
    </div>
  );
};

export default ChatMainView;