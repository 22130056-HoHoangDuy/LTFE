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
                                          showSettingDialog
                                      }) => {
    // State chỉ cần cho avatar, các icon còn lại dùng CSS group hover bằng sự kiện onMouseEnter/Leave
    const [hoverIdx, setHoverIdx] = React.useState<number | null>(null);

    // Xác định src cho icon thường và icon hover
    const avatarSrc = hoverIdx === 0 ? user.avatar.replace('.svg', '1.svg') : user.avatar;
    const chatSrc = hoverIdx === 1 ? "/icons/chat1.svg" : "/icons/chat.svg";
    const roomSrc = hoverIdx === 2 ? "/icons/contact1.svg" : "/icons/contact.svg";
    const settingSrc = hoverIdx === 3 ? "/icons/setting1.svg" : "/icons/setting.svg";

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
                    ...iconBoxStyle,
                    background: "#444",
                    marginBottom: 28,
                    ...((hoverIdx === 0 || showAccountDialog) ? iconBoxHoverStyle : {})
                }}
                onMouseEnter={() => setHoverIdx(0)}
                onMouseLeave={() => setHoverIdx(null)}
                title={user.name}
            >
                <img src={avatarSrc} width={30} height={30} alt=""/>
            </div>
            {/* Icon chat */}
            <div
                style={{
                    marginBottom: 18,
                }}
                onMouseEnter={() => setHoverIdx(1)}
                onMouseLeave={() => setHoverIdx(null)}
            >
                <div
                    style={{
                        ...iconBoxStyle,
                        ...(hoverIdx === 1 ? iconBoxHoverStyle : {})
                    }}
                >
                    <img src={chatSrc} width={28} alt="icon-chat"/>
                </div>
            </div>
            {/* Icon room */}
            <div
                style={{
                    marginBottom: 18,
                }}
                onMouseEnter={() => setHoverIdx(2)}
                onMouseLeave={() => setHoverIdx(null)}
            >
                <div
                    style={{
                        ...iconBoxStyle,
                        ...(hoverIdx === 2 ? iconBoxHoverStyle : {})
                    }}
                >
                    <img src={roomSrc} width={28} alt="icon-contact"/>
                </div>
            </div>
            {/* Icon setting */}
            <div
                style={{
                    marginTop: "auto",
                    marginBottom: 16,
                }}
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
                    <img src={settingSrc} width={28} alt="icon-setting"/>
                </div>
            </div>
        </div>
    );
};

export default SidebarIcon;