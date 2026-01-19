// src/components/Chat/ChatSidebar.tsx
import React, { useMemo, useState } from "react";
import { chatDashboardColors as c } from "./dashboardStyles";
import RoomList from "../Room/RoomList";
import useUserList from "../../hooks/useUserList";

interface Props {
  user: {
    name: string;
    username: string;
    avatar?: string;
  };
  selectedRoom: string | null;
  onSelectRoom: (username: string) => void;
  theme?: "dark" | "light";
}

const ChatSidebar: React.FC<Props> = ({ user, selectedRoom, onSelectRoom, theme = "dark" }) => {
  const usersRaw = useUserList();
  const [keyword, setKeyword] = useState("");

  // UI states for enhanced sidebar (hover / focus)
  const [hoverSearch, setHoverSearch] = useState(false);
  const [hoverCreate, setHoverCreate] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);

  // Theme-aware colors
  const sidebarBg = theme === "dark" ? c.bgSidebar : "#f3f5f7";
  const sidebarText = theme === "dark" ? c.text : "#222";
  const sidebarBorder = theme === "dark" ? c.sidebarBorder : "#222";
  const inputBg = theme === "dark" ? c.input : "#fff";
  const inputText = theme === "dark" ? c.inputText : "#222";
  const buttonText = theme === "dark" ? "#fff" : "#222";
  const buttonBorder = theme === "dark" ? "#fff" : "#222";
  const buttonBgHover = "#2196f3";
  const searchBorderFocus = theme === "dark" ? "#fff" : "#222";
  const placeholderColor = theme === "dark" ? "#aaa" : "#666";

  // normalize users thành { id, name }
  const users = useMemo(() => {
    if (!Array.isArray(usersRaw)) return [];
    return usersRaw.map((u: any, idx: number) => {
      if (typeof u === "string" || typeof u === "number") {
        const id = String(u);
        return { id, name: id };
      }
      if (typeof u === "object" && u !== null) {
        const id = String(u.id ?? u.userId ?? u.username ?? idx);
        const name = String(u.name ?? u.username ?? u.user ?? id);
        return { id, name };
      }
      return { id: String(idx), name: String(u) };
    });
  }, [usersRaw]);

  const filteredUsers = useMemo(() => {
    if (!keyword.trim()) return users;
    return users.filter((u) => u.name.toLowerCase().includes(keyword.toLowerCase()));
  }, [users, keyword]);

  return (
    <div
      style={{
        width: 260,
        background: sidebarBg,
        color: sidebarText,
        display: "flex",
        flexDirection: "column",
        padding: "0 18px",
        borderRight: `2px solid ${sidebarBorder}`,
        minWidth: 0,
        maxWidth: 300,
      }}
    >
      <div style={{ height: 18 }} />

      {/* Thanh tìm kiếm */}
      <div style={{ width: "100%", marginBottom: 10, display: "flex", alignItems: "center" }}>
        <img
          src={hoverSearch ? "/icons/search1.svg" : "/icons/search.svg"}
          alt="search"
          width={20}
          style={{
            marginRight: 6,
            transition: "filter 0.22s, transform 0.18s",
            filter: hoverSearch ? "brightness(1.4)" : undefined,
            transform: hoverSearch ? "scale(1.16) translateX(5px)" : undefined,
            cursor: "pointer",
          }}
          onMouseEnter={() => setHoverSearch(true)}
          onMouseLeave={() => setHoverSearch(false)}
        />
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm kiếm"
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
          style={
            {
              background: inputBg,
              color: inputText,
              borderRadius: 28,
              border: searchFocus ? `2px solid ${searchBorderFocus}` : "none",
              padding: "7px 15px",
              outline: "none",
              flex: 1,
              transition: "border 0.16s",
            } as React.CSSProperties
          }
        />
        <style>
          {`
            input::placeholder {
              color: ${placeholderColor};
              opacity: 1;
            }
          `}
        </style>
      </div>

      {/* Nút Tạo phòng */}
      <button
        style={{
          marginBottom: 15,
          border: `2px solid ${hoverCreate ? buttonBgHover : buttonBorder}`,
          background: hoverCreate ? buttonBgHover : "transparent",
          borderRadius: 6,
          color: buttonText,
          padding: "6px 22px",
          fontWeight: 450,
          cursor: "pointer",
          transition: "background 0.17s, border 0.17s",
        }}
        onMouseEnter={() => setHoverCreate(true)}
        onMouseLeave={() => setHoverCreate(false)}
      >
        Tạo phòng
      </button>

      {/* 👥 USER LIST */}
      <div style={{ overflowY: "auto", flex: 1 }}>
        <RoomList
          rooms={filteredUsers.map((u) => ({
            id: u.id,
            name: u.name,
            time: "",
          }))}
          selectedRoomId={selectedRoom}
          onSelectRoom={onSelectRoom}
        />
      </div>
    </div>
  );
};

export default ChatSidebar;