import React from "react";

interface CreateRoomModalProps {
    open: boolean;
    onClose: () => void;
    // Có thể nhận thêm callback tạo phòng
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
                                                             open,
                                                             onClose,
                                                             // props khác
                                                         }) => {
    if (!open) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0, left: 0, right: 0, bottom: 0,
                background: "rgba(0,0,0,0.35)",
                zIndex: 2000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <div
                style={{
                    background: "#191919",
                    color: "#fff",
                    borderRadius: 10,
                    padding: 28,
                    minWidth: 300,
                    minHeight: 180,
                    boxShadow: "0 4px 32px #0005",
                    position: "relative"
                }}
            >
                <div style={{fontWeight: 600, fontSize: 20, marginBottom: 16}}>
                    Tạo phòng mới
                </div>
                {/* Chỗ này để form nhập tên phòng, chọn người tham gia... */}
                {/* Chỗ này để xử lý tạo phòng mới, gọi backend */}

                {/* Đóng modal */}
                <button
                    style={{
                        position: "absolute",
                        top: 10, right: 16,
                        background: "transparent",
                        color: "#fff",
                        fontSize: 22,
                        border: "none",
                        cursor: "pointer"
                    }}
                    onClick={onClose}
                    aria-label="Đóng"
                >×
                </button>
            </div>
        </div>
    );
};

export default CreateRoomModal;