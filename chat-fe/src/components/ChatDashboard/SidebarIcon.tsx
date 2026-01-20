import React from "react";

interface User {
    name: string;
    username: string;
    avatar: string;
}

interface Props {
    user: User,
    onClickAvatar: () => void,
    onClickSetting: () => void,
    showAccountDialog: boolean,
    showSettingDialog: boolean,
<<<<<<< HEAD

=======
    theme: "dark" | "light";
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
}

// Styles cho hiệu ứng hover icon
const iconBoxStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: "transparent",
    transition: "background 0.25s, box-shadow 0.25s, filter 0.22s, transform 0.22s",
    cursor: "pointer"
};
const iconBoxHoverStyle: React.CSSProperties = {
    background: "#2d3a46",
    boxShadow: "0 2px 8px #0003",
    filter: "brightness(1.18)",
    transform: "scale(1.12) translateX(8px)",
};

const SidebarIcon: React.FC<Props> = ({
                                          user,
                                          onClickAvatar,
                                          onClickSetting,
                                          showAccountDialog,
<<<<<<< HEAD
                                          showSettingDialog
                                      }) => {
    // State chỉ cần cho avatar, các icon còn lại dùng CSS group hover bằng sự kiện onMouseEnter/Leave
    const [hoverIdx, setHoverIdx] = React.useState<number | null>(null);

=======
                                          showSettingDialog,
                                          theme
                                      }) => {
    const [hoverIdx, setHoverIdx] = React.useState<number | null>(null);

    // Đổi màu theo theme
    const sidebarBg = theme === "dark" ? "#191919" : "#f3f5f7";
    const sidebarText = theme === "dark" ? "#fff" : "#222";
    const avatarBoxBg = theme === "dark" ? "#444" : "#eaeaeb";

>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
    // Xác định src cho icon thường và icon hover
    const avatarSrc = hoverIdx === 0 ? user.avatar.replace('.svg', '1.svg') : user.avatar;
    const chatSrc = hoverIdx === 1 ? "/icons/chat1.svg" : "/icons/chat.svg";
    const roomSrc = hoverIdx === 2 ? "/icons/contact1.svg" : "/icons/contact.svg";
    const settingSrc = hoverIdx === 3 ? "/icons/setting1.svg" : "/icons/setting.svg";

    return (
        <div
            style={{
                width: 60,
<<<<<<< HEAD
                background: "#191919",
                color: "#fff",
=======
                background: sidebarBg,
                color: sidebarText,
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
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
                    ...iconBoxStyle,
<<<<<<< HEAD
                    background: "#444",
=======
                    background: avatarBoxBg,
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
                    marginBottom: 28,
                    ...((hoverIdx === 0 || showAccountDialog) ? iconBoxHoverStyle : {})
                }}
                onMouseEnter={() => setHoverIdx(0)}
                onMouseLeave={() => setHoverIdx(null)}
                title={user.name}
            >
<<<<<<< HEAD
                <img src={avatarSrc} width={30} height={30} alt=""/>
            </div>
            {/* Icon chat */}
            <div
                style={{
                    marginBottom: 18,
                }}
=======
                <img src={avatarSrc} width={30} height={30} alt="" />
            </div>
            {/* Icon chat */}
            <div
                style={{ marginBottom: 18 }}
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
                onMouseEnter={() => setHoverIdx(1)}
                onMouseLeave={() => setHoverIdx(null)}
            >
                <div
                    style={{
                        ...iconBoxStyle,
                        ...(hoverIdx === 1 ? iconBoxHoverStyle : {})
                    }}
                >
<<<<<<< HEAD
                    <img src={chatSrc} width={28} alt="icon-chat"/>
=======
                    <img src={chatSrc} width={28} alt="icon-chat" />
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
                </div>
            </div>
            {/* Icon room */}
            <div
<<<<<<< HEAD
                style={{
                    marginBottom: 18,
                }}
=======
                style={{ marginBottom: 18 }}
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
                onMouseEnter={() => setHoverIdx(2)}
                onMouseLeave={() => setHoverIdx(null)}
            >
                <div
                    style={{
                        ...iconBoxStyle,
                        ...(hoverIdx === 2 ? iconBoxHoverStyle : {})
                    }}
                >
<<<<<<< HEAD
                    <img src={roomSrc} width={28} alt="icon-contact"/>
=======
                    <img src={roomSrc} width={28} alt="icon-contact" />
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
                </div>
            </div>
            {/* Icon setting */}
            <div
<<<<<<< HEAD
                style={{
                    marginTop: "auto",
                    marginBottom: 16,
                }}
=======
                style={{ marginTop: "auto", marginBottom: 16 }}
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
                onMouseEnter={() => setHoverIdx(3)}
                onMouseLeave={() => setHoverIdx(null)}
                onClick={onClickSetting}
            >
                <div
                    style={{
                        ...iconBoxStyle,
                        ...((hoverIdx === 3 || showSettingDialog) ? iconBoxHoverStyle : {})
                    }}
                >
<<<<<<< HEAD
                    <img src={settingSrc} width={28} alt="icon-setting"/>
=======
                    <img src={settingSrc} width={28} alt="icon-setting" />
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
                </div>
            </div>
        </div>
    );
};

export default SidebarIcon;