import React from "react";

interface User {
    name: string;
    username: string;
    avatar: string;
}
interface Props {
    user: User;
    onClickAvatar: () => void;
    onClickSetting: () => void;
}

const SidebarIcon: React.FC<Props> = ({
                                          user,
                                          onClickAvatar,
                                          onClickSetting,
                                      }) => {
    return (
        <div
            style={{
                width: 60,
                background: "#191919",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 16,
                paddingBottom: 16,
            }}
        >
            {/* Avatar top */}
            <div
                onClick={onClickAvatar}
                style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "#444",
                    marginBottom: 28,
                    cursor: "pointer",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex"
                }}
                title={user.name}
            >
                <img src={user.avatar} width={30} height={30} alt="" />
            </div>
            {/* Icon chat */}
            <div style={{ marginBottom: 18, cursor: "pointer" }}>
                <img src="/icons/chat.svg" width={28} alt="icon-chat" />
            </div>
            {/* Icon room */}
            <div style={{ marginBottom: 18, cursor: "pointer" }}>
                <img src="/icons/contact.svg" width={28} alt="icon-contact" />
            </div>
            {/* Icon setting */}
            <div
                style={{
                    marginTop: "auto",
                    marginBottom: 16,
                    cursor: "pointer"
                }}
                onClick={onClickSetting}
            >
                <img src="/icons/setting.svg" width={28} alt="icon-setting" />
            </div>
        </div>
    );
};

export default SidebarIcon;