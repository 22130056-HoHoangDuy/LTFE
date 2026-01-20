import React, { useState } from "react";
import ChatMainView from "./ChatMainView";
import { useAuthContext } from "../../context/AuthContext";


const ChatDashboard: React.FC = () => {
    // Lấy user từ backend/context/api
    const { user } = useAuthContext();
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

    if (!user) return null;

    // --- Theme state và xử lý theme ---
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));

    // Các màu nền theo theme (kết hợp biến cũ)
    const backgroundColor = theme === "dark" ? "#121212" : "#fff";
    const headerBg = theme === "dark" ? "#222" : "#f8f9fa";
    const headerColor = theme === "dark" ? "#fff" : "#222";

    // Popup color theo theme
    const popupBg = theme === "dark" ? "#232323" : "#fff";
    const popupText = theme === "dark" ? "#fff" : "#222";
    const popupBorder = theme === "dark" ? "#aaa" : "#d6d6d6";

    // Nếu chưa có user từ backend/context thì không render
    if (!user) return null;

    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            background: backgroundColor,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative"
        }}>
            {/* HEADER - ngang trên cùng */}
            <div style={{
                width: "100%",
                height: 48,
                background: headerBg,
                color: headerColor,
                display: "flex",
                alignItems: "center",
                fontSize: 20,
                fontWeight: 600,
                paddingLeft: 35,
                borderBottom: theme === "dark" ? "2px solid #191919" : "2px solid #eee",
                letterSpacing: 0.2,
                zIndex: 2,
                position: "relative"
            }}>
                App chat - {user.username}
                {/* ICON đổi theme */}
                <img
                    src={theme === "dark" ? "/icons/night.svg" : "/icons/light.svg"}
                    alt={theme === "dark" ? "Night Mode" : "Light Mode"}
                    width={26}
                    height={26}
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: 96,
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        transition: "filter 0.14s, transform 0.14s"
                    }}
                    onClick={toggleTheme}
                    title={theme === "dark" ? "Chuyển theme sáng" : "Chuyển theme tối"}
                />
            </div>
            {/* BODY - 3 cột dưới (icon | sidebar | main) */}
            <div style={{ display: "flex", flex: 1, minHeight: 0, minWidth: 0 }}>
                {/* Column 1: SidebarIcon */}
                <SidebarIcon
                    user={{
                        name: user.username || user.username,
                        username: user.username,
                        avatar: "",
                    }}
                    onClickAvatar={() => setShowAccountDialog(true)}
                    onClickSetting={() => setShowSettingDialog(true)}
                    showAccountDialog={showAccountDialog}
                    showSettingDialog={showSettingDialog}
                    theme={theme}
                />
                {/* Column 2: ChatSidebar */}
                <ChatSidebar
                    user={{
                        name: user.username || user.username,
                        username: user.username,
                        avatar: "",
                    }}
                    onSelectRoom={setSelectedRoom}
                    selectedRoom={selectedRoom}
                    theme={theme}
                />
                {/* Column 3: MainView */}
                <ChatMainView selectedRoom={selectedRoom} user={{
                    name: user.username || user.username,
                    username: user.username,
                    avatar: "",
                }} theme={theme} />
            </div>
            {/* Popup menu/setting */}
            {showAccountDialog && (
                <div
                    style={{
                        position: "fixed", left: 65, top: 60,
                        background: popupBg,
                        color: popupText,
                        minWidth: 170,
                        borderRadius: 10,
                        boxShadow: "0 4px 16px #0002",
                        zIndex: 10,
                        padding: 12
                    }}>
                    <div style={{ borderBottom: `2px solid ${popupBorder}`, paddingBottom: 6, marginBottom: 10 }}>
                        <strong>{user.username}</strong>
                    </div>
                    <div
                        style={{
                            cursor: "pointer",
                            marginBottom: 8,
                            transition: "transform 0.18s",
                            color: popupText,
                            ...(hoverPopupIdx === 0 ? { transform: "scale(1.1) translateX(8px)" } : {})
                        }}
                        onMouseEnter={() => setHoverPopupIdx(0)}
                        onMouseLeave={() => setHoverPopupIdx(null)}
                    >Hồ sơ</div>
                    <div
                        style={{
                            cursor: "pointer",
                            marginBottom: 8,
                            transition: "transform 0.18s",
                            color: popupText,
                            ...(hoverPopupIdx === 1 ? { transform: "scale(1.1) translateX(8px)" } : {})
                        }}
                        onMouseEnter={() => setHoverPopupIdx(1)}
                        onMouseLeave={() => setHoverPopupIdx(null)}
                        onClick={() => {
                            setShowAccountDialog(false);
                            setShowSettingDialog(true);
                        }}
                    >Cài đặt</div>
                    <div
                        style={{
                            cursor: "pointer",
                            color: "#ff4d4f",
                            transition: "transform 0.18s",
                            ...(hoverPopupIdx === 2 ? { transform: "scale(1.1) translateX(8px)" } : {})
                        }}
                        onMouseEnter={() => setHoverPopupIdx(2)}
                        onMouseLeave={() => setHoverPopupIdx(null)}
                    >Đăng xuất</div>
                    <div
                        style={{
                            position: "absolute", top: 5, right: 10, fontSize: 18, cursor: "pointer",
                            color: popupText
                        }}
                        onClick={() => setShowAccountDialog(false)}
                        title="Đóng"
                    >×</div>
                </div>
            )}
            {showSettingDialog && (
                <div
                    style={{
                        position: "fixed", left: 65, bottom: 60,
                        background: popupBg,
                        color: popupText,
                        minWidth: 190,
                        borderRadius: 10,
                        boxShadow: "0 4px 16px #0002",
                        zIndex: 10,
                        padding: 12
                    }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
                        <img src="/icons/avatar.svg" width={18} alt="" style={{ marginRight: 8 }} />
                        Thông tin tài khoản
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 10,
                            cursor: "pointer",
                            transition: "transform 0.18s",
                            color: popupText,
                            ...(hoverPopupIdx === 10 ? { transform: "scale(1.1) translateX(8px)" } : {})
                        }}
                        onMouseEnter={() => setHoverPopupIdx(10)}
                        onMouseLeave={() => setHoverPopupIdx(null)}
                    >
                        <img src="/icons/setting.svg" width={18} alt="" style={{ marginRight: 8 }} />
                        Cài đặt
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 10,
                            cursor: "pointer",
                            transition: "transform 0.18s",
                            color: popupText,
                            ...(hoverPopupIdx === 11 ? { transform: "scale(1.1) translateX(8px)" } : {})
                        }}
                        onMouseEnter={() => setHoverPopupIdx(11)}
                        onMouseLeave={() => setHoverPopupIdx(null)}
                    >
                        <img src="/icons/database.svg" width={18} alt="" style={{ marginRight: 8 }} />
                        Dữ liệu
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 10,
                            cursor: "pointer",
                            transition: "transform 0.18s",
                            color: popupText,
                            ...(hoverPopupIdx === 12 ? { transform: "scale(1.1) translateX(8px)" } : {})
                        }}
                        onMouseEnter={() => setHoverPopupIdx(12)}
                        onMouseLeave={() => setHoverPopupIdx(null)}
                    >
                        <img src="/icons/help.svg" width={18} alt="" style={{ marginRight: 8 }} />
                        Hỗ trợ
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            color: "#ff4d4f",
                            cursor: "pointer",
                            transition: "transform 0.18s",
                            ...(hoverPopupIdx === 13 ? { transform: "scale(1.1) translateX(8px)" } : {})
                        }}
                        onMouseEnter={() => setHoverPopupIdx(13)}
                        onMouseLeave={() => setHoverPopupIdx(null)}
                    >
                        Đăng xuất
                    </div>
                    <div
                        style={{
                            position: "absolute", top: 5, right: 10, fontSize: 18, cursor: "pointer",
                            color: popupText
                        }}
                        onClick={() => setShowSettingDialog(false)}
                        title="Đóng"
                    >×</div>
                </div>
            )}
        </div>
    );
};

export default ChatDashboard;
