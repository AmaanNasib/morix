'use client';

import { CanvasObject } from "./fabricCanvas";

interface PreviewCanvasProps {
    objects: CanvasObject[];
    width: number;
    height: number;
}

export default function PreviewCanvas({ objects, width, height }: PreviewCanvasProps) {
    return (
        <div
            style={{
                width: `${width}px`,
                height: `${height}px`,
                background: "white",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                position: "relative",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
            }}
        >
            {/* Render all objects */}
            {objects.map((obj) => (
                <PreviewObject key={obj.id} object={obj} />
            ))}
        </div>
    );
}

interface PreviewObjectProps {
    object: CanvasObject;
}

function PreviewObject({ object }: PreviewObjectProps) {
    const { x, y, width, height, rotation, type, src } = object;

    const containerStyle: React.CSSProperties = {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center center",
        overflow: "hidden",
        borderRadius: "4px",
    };

    return (
        <div style={containerStyle}>
            {/* ✅ Image */}
            {type === "image" && src && (
                <img
                    src={src}
                    alt="Preview"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                    }}
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                    }}
                />
            )}

            {/* ✅ Video - AUTO PLAY, NO CONTROLS */}
            {type === "video" && src && (
                <video
                    autoPlay
                    muted
                    loop
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        background: "#000",
                    }}
                >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}

            {/* ✅ Audio */}
            {type === "audio" && src && (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px",
                        boxSizing: "border-box",
                    }}
                >
                    <div style={{ color: "white", fontSize: "24px", marginBottom: "8px" }}>
                        🎵
                    </div>
                    <audio
                        controls
                        style={{
                            width: "100%",
                            maxWidth: "100%",
                            height: "30px",
                        }}
                    >
                        <source src={src} type="audio/mpeg" />
                        Your browser does not support the audio tag.
                    </audio>
                </div>
            )}

            {/* ✅ Document */}
            {type === "document" && src && (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px",
                        boxSizing: "border-box",
                        cursor: "pointer",
                    }}
                    onClick={() => window.open(src, "_blank")}
                    title="Click to open document"
                >
                    <div style={{ color: "white", fontSize: "32px", marginBottom: "8px" }}>
                        📄
                    </div>
                    <div
                        style={{
                            color: "white",
                            fontSize: "12px",
                            textAlign: "center",
                            fontWeight: "500",
                        }}
                    >
                        Click to open
                    </div>
                </div>
            )}

            {/* ✅ Fallback (if src is missing) */}
            {!src && (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        background: "#f3f4f6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        color: "#9ca3af",
                    }}
                >
                    {type.toUpperCase()}
                </div>
            )}
        </div>
    );
}
