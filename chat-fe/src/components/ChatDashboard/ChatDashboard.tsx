import React, { useState } from "react";
import SidebarIcon from "./SidebarIcon";
import ChatSidebar from "./ChatSidebar";
import ChatMainView from "./ChatMainView";


// Giả định có UserContext hoặc lấy từ props/hook
const mockUser = {
    name: "Nguyễn Minh Hào",
    username: "22130074",
    avatar: "/icons/avatar.svg", // icon mẫu
};

const ChatDashboard: React.FC = () => {
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);


    // State cho popup avatar/profile/setting
    const [showAccountDialog, setShowAccountDialog] = useState(false);
    const [showSettingDialog, setShowSettingDialog] = useState(false);

    return (
        <div style={{
            height: "100vh",
            background: "#121212",
            display: "flex",
            flexDirection: "column"
        }}>
            {/* HEADER - ngang trên cùng */}
            <div style={{
                width: "100%",
                height: 48,
                background: "#222",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                fontSize: 20,
                fontWeight: 600,
                paddingLeft: 35,
                borderBottom: "2px solid #191919",
                letterSpacing: 0.2,
                zIndex: 2
            }}>
                App chat - {mockUser.name}
            </div>

            {/* BODY - 3 cột dưới (icon | sidebar | main) */}
            <div style={{ display: "flex", flex: 1, minHeight: 0, minWidth: 0 }}>
                {/* Column 1: SidebarIcon */}
                <SidebarIcon
                    user={mockUser}
                    onClickAvatar={() => setShowAccountDialog(true)}
                    onClickSetting={() => setShowSettingDialog(true)}
                />
                {/* Column 2: ChatSidebar */}
                <ChatSidebar
                    user={mockUser}
                    onSelectRoom={setSelectedRoom}
                    selectedRoom={selectedRoom}
                />
                {/* Column 3: MainView */}
                <ChatMainView selectedRoom={selectedRoom} user={mockUser} />
            </div>
            {/* Popup menu/setting */}
            {showAccountDialog && (
                <div
                    style={{
                        position: "fixed", left: 90, top: 60,
                        background: "#232323", color: "#fff", minWidth: 170,
                        borderRadius: 10, boxShadow: "0 4px 16px #0002", zIndex: 10,
                        padding: 12
                    }}>
                    <div style={{ borderBottom: "2px solid #aaa", paddingBottom: 6, marginBottom: 10 }}>
                        <strong>{mockUser.name}</strong>
                    </div>
                    <div style={{ cursor: "pointer", marginBottom: 8 }}>Hồ sơ</div>
                    <div style={{ cursor: "pointer", marginBottom: 8 }}
                         onClick={() => {
                             setShowAccountDialog(false);
                             setShowSettingDialog(true);
                         }}
                    >Cài đặt</div>
                    <div style={{ cursor: "pointer", color: "#ff4d4f" }}>Đăng xuất</div>
                    <div
                        style={{
                            position: "absolute", top: 5, right: 10, fontSize: 18, cursor: "pointer"
                        }}
                        onClick={() => setShowAccountDialog(false)}
                        title="Đóng"
                    >×</div>
                </div>
            )}
            {showSettingDialog && (
                <div
                    style={{
                        position: "fixed", left: 90, bottom: 60,
                        background: "#232323", color: "#fff", minWidth: 190,
                        borderRadius: 10, boxShadow: "0 4px 16px #0002", zIndex: 10,
                        padding: 12
                    }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
                        <img src="/icons/avatar.svg" width={18} alt="" style={{ marginRight: 8 }} />
                        Thông tin tài khoản
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
                        <img src="/icons/setting.svg" width={18} alt="" style={{ marginRight: 8 }} />
                        Cài đặt
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
                        <img src="/icons/database.svg" width={18} alt="" style={{ marginRight: 8 }} />
                        Dữ liệu
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
                        <img src="/icons/help.svg" width={18} alt="" style={{ marginRight: 8 }} />
                        Hỗ trợ
                    </div>
                    <div style={{ display: "flex", alignItems: "center", color: "#ff4d4f", cursor: "pointer" }}>
                        Đăng xuất
                    </div>
                    <div
                        style={{
                            position: "absolute", top: 5, right: 10, fontSize: 18, cursor: "pointer"
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