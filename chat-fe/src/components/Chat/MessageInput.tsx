import React, { useState } from "react";

type Props = {
    onSend: (mes: any) => void;
    theme: "dark" | "light";
    user: {
        name: string;
        username: string;
        avatar: string;
    };
};

const MessageInput: React.FC<Props> = ({ onSend, theme }) => {

    const [text, setText] = useState("");
    const [isRecording, setIsRecording] = useState(false);

    // Refs
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const imageInputRef = React.useRef<HTMLInputElement>(null);
    const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
    const chunksRef = React.useRef<Blob[]>([]);

    const [showStickers, setShowStickers] = useState(false);

    const STICKERS = [
        "/stickers/smile.svg",
        "/stickers/heart.svg",
        "/stickers/thumb.svg",
        "/stickers/cool.svg"
    ];

    const handleSend = () => {
        if (!text.trim()) return;
      
        onSend(text.trim());

        setText("");
        setShowStickers(false);
    };

    const handleSendSticker = (url: string) => {
        onSend({
            type: "sticker",
            content: url
        });
        setShowStickers(false);
    };

    // --- FILE ---
    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Limit size ~3MB 
        if (file.size > 3 * 1024 * 1024) {
            alert("File quá lớn (>3MB), vui lòng gửi file nhỏ hơn.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result as string;
            // Check if it is image selected via File button -> auto convert to image type
            const isImage = file.type.startsWith("image/");
            onSend({
                type: isImage ? "image" : "file",
                content: base64,
                fileName: file.name,
                fileType: file.type
            });
        };
        reader.readAsDataURL(file);

        // Reset input
        e.target.value = "";
        setShowStickers(false);
    };

    // --- IMAGE ---
    const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 3 * 1024 * 1024) {
            alert("Ảnh quá lớn (>3MB), vui lòng gửi ảnh nhỏ hơn.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result as string;
            onSend({
                type: "image",
                content: base64,
                fileName: file.name,
                fileType: file.type
            });
        };
        reader.readAsDataURL(file);
        e.target.value = "";
        setShowStickers(false);
    };

    // --- AUDIO ---
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (ev) => {
                if (ev.data.size > 0) chunksRef.current.push(ev.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = reader.result as string;
                    onSend({
                        type: "audio",
                        content: base64
                    });
                };
                reader.readAsDataURL(blob);

                // Stop tracks
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setShowStickers(false);
        } catch (err) {
            console.error("Microphone error:", err);
            alert("Không thể truy cập microphone.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    // Màu theo theme
    const bg = theme === "dark" ? "#1E1E1E" : "#fff";
    const borderColor = theme === "dark" ? "#222" : "#e0e0e0";
    const color = theme === "dark" ? "#fff" : "#222";
    const btnBg = theme === "dark" ? "#2196f3" : "#e3eafc";
    const btnColor = theme === "dark" ? "#fff" : "#1565c0";
    const iconColor = theme === "dark" ? "#aaa" : "#666";
    const popoverBg = theme === "dark" ? "#2C2C2C" : "#fff";

    return (
        <div
            style={{
                padding: 12,
                borderTop: `1px solid ${borderColor}`,
                display: "flex",
                gap: 10,
                background: bg,
                alignItems: "center",
                position: "relative" // for popover
            }}
        >
            {/* STICKER POPOVER */}
            {showStickers && (
                <div style={{
                    position: "absolute",
                    bottom: 60,
                    left: 10,
                    background: popoverBg,
                    border: `1px solid ${borderColor}`,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    borderRadius: 8,
                    padding: 10,
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 10,
                    zIndex: 100,
                    width: 220
                }}>
                    {STICKERS.map((s, i) => (
                        <img
                            key={i}
                            src={s}
                            alt="sticker"
                            style={{ width: 40, height: 40, cursor: "pointer", borderRadius: 4, transition: "transform 0.2s" }}
                            onClick={() => handleSendSticker(s)}
                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        />
                    ))}
                </div>
            )}

            {/* Sticker Button */}
            <button
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
                onClick={() => setShowStickers(!showStickers)}
                title="Gửi sticker"
            >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.11101 2.17969C5.26216 1.41052 6.61552 1 7.99999 1C9.85651 1 11.637 1.73754 12.9498 3.05029C14.2625 4.36305 15 6.14348 15 8C15 9.38447 14.5895 10.7379 13.8203 11.889C13.0511 13.0402 11.9578 13.9373 10.6788 14.4672C9.39968 14.997 7.9922 15.1356 6.63433 14.8655C5.27646 14.5954 4.02919 13.9287 3.05022 12.9497C2.07126 11.9707 1.40461 10.7235 1.13451 9.3656C0.864416 8.00773 1.00301 6.60025 1.53283 5.32117C2.06264 4.04208 2.95987 2.94886 4.11101 2.17969ZM4.66656 12.9888C5.65325 13.6481 6.8133 14 7.99999 14C9.59129 14 11.1174 13.3679 12.2426 12.2427C13.3678 11.1175 14 9.5913 14 8C14 6.81331 13.6481 5.65332 12.9888 4.66663C12.3295 3.67993 11.3924 2.91079 10.2961 2.45667C9.19972 2.00254 7.99334 1.88372 6.82946 2.11523C5.66557 2.34675 4.59649 2.91821 3.75738 3.75732C2.91826 4.59644 2.3468 5.66558 2.11529 6.82947C1.88378 7.99335 2.00259 9.19979 2.45672 10.2961C2.91084 11.3925 3.67986 12.3295 4.66656 12.9888ZM6.5 7C6.5 7.55228 6.05228 8 5.5 8C4.94772 8 4.5 7.55228 4.5 7C4.5 6.44772 4.94772 6 5.5 6C6.05228 6 6.5 6.44772 6.5 7ZM11.5 7C11.5 7.55228 11.0523 8 10.5 8C9.94771 8 9.5 7.55228 9.5 7C9.5 6.44772 9.94771 6 10.5 6C11.0523 6 11.5 6.44772 11.5 7ZM8 11C7.45661 11.0013 6.92303 10.8551 6.4563 10.5768C5.98957 10.2985 5.60718 9.89871 5.34998 9.42004L4.47998 9.90002C4.83013 10.548 5.3524 11.0867 5.9892 11.4568C6.62599 11.8269 7.35259 12.0139 8.08893 11.9973C8.82526 11.9808 9.54277 11.7613 10.1623 11.363C10.7818 10.9647 11.2793 10.403 11.6 9.73999L10.7 9.31006C10.454 9.81684 10.0703 10.2441 9.59283 10.543C9.11534 10.8418 8.56332 11.0002 8 11Z" fill={iconColor} />
                </svg>
            </button>

            {/* Image Button */}
            <input
                type="file"
                ref={imageInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageSelect}
            />
            <button
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
                onClick={() => imageInputRef.current?.click()}
                title="Gửi ảnh"
            >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill={iconColor} d="M14 2H2C1.4 2 1 2.4 1 3V13C1 13.6 1.4 14 2 14H14C14.6 14 15 13.6 15 13V3C15 2.4 14.6 2 14 2ZM14 13H2V3H14V13ZM10.5 8.5L8.25 11.5L6.75 9.5L4.5 12.5H11.5L10.5 8.5Z" />
                </svg>
            </button>

            {/* File Button */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelect}
            />
            <button
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
                onClick={() => fileInputRef.current?.click()}
                title="Gửi file"
            >
                {/* Simple Clip Icon SVG */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 6V17.5C16.5 19.71 14.71 21.5 12.5 21.5C10.29 21.5 8.5 19.71 8.5 17.5V5C8.5 3.62 9.62 2.5 11 2.5C12.38 2.5 13.5 3.62 13.5 5V15.5C13.5 16.05 13.05 16.5 12.5 16.5C11.95 16.5 11.5 16.05 11.5 15.5V6H10V15.5C10 16.88 11.12 18 12.5 18C13.88 18 15 16.88 15 15.5V5C15 2.79 13.21 1 11 1C8.79 1 7 2.79 7 5V17.5C7 20.54 9.46 23 12.5 23C15.54 23 18 20.54 18 17.5V6H16.5Z" fill={iconColor} />
                </svg>
            </button>

            {/* Mic Button */}
            <button
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onMouseLeave={stopRecording} // safety
                title="Giữ để ghi âm"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isRecording ? "red" : iconColor} xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14ZM11 5C11 4.45 11.45 4 12 4C12.55 4 13 4.45 13 5V11C13 11.55 12.55 12 12 12C11.45 12 11 11.55 11 11V5ZM17 11H15.5C15.5 12.93 13.93 14.5 12 14.5C10.07 14.5 8.5 12.93 8.5 11H7C7 13.41 8.72 15.41 11 15.82V19H7V20.5H17V19H13V15.82C15.28 15.41 17 13.41 17 11Z" fill={isRecording ? "red" : iconColor} />
                </svg>
            </button>

            {isRecording && <span style={{ color: "red", fontSize: 12, marginRight: 5 }}>Recording...</span>}

            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={isRecording ? "Đang ghi âm..." : "Nhập tin nhắn..."}
                disabled={isRecording}
                style={{
                    flex: 1,
                    background: bg,
                    color: color,
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 12px",
                    outline: "none",
                }}
            />
            <button
                onClick={handleSend}
                style={{
                    background: btnBg,
                    color: btnColor,
                    border: "none",
                    borderRadius: 6,
                    padding: "10px 16px",
                    fontWeight: 600,
                    cursor: "pointer"
                }}
            >
                Gửi
            </button>
        </div>
    );
};

export default MessageInput;

