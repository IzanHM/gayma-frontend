import React from 'react';
import { Box, Typography } from "@mui/material"; // ¡Esto es lo que faltaba!

const MediaRenderer = ({ url }) => {
    if (!url) return null;

    const isImage = url.match(/\.(jpg|jpeg|png|gif|webp)$/i);
    const isAudio = url.match(/\.(mp3|ogg|wav)$/i);
    const isVideo = url.match(/\.(mp4|webm)$/i);
    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

    if (isImage) {
        return <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "6px" }} />;
    }
    
    if (isAudio) {
        return (
            <Box sx={{ textAlign: "center", color: "#fff", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: "2rem" }}>🎵</span>
                <Typography variant="caption" sx={{ mt: 1 }}>Audio</Typography>
            </Box>
        );
    }

    if (isVideo) {
        return (
            <video 
                src={`${url}#t=0.1`} // Forzamos al navegador a buscar el primer frame
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "6px" }}
                preload="metadata"
                muted
            />
        );
    }

    if (isYouTube) {
        let videoId = "";
        try {
            if (url.includes("v=")) {
                videoId = url.split("v=")[1].split("&")[0];
            } else {
                videoId = url.split("/").pop().split("?")[0];
            }
        } catch (e) {
            console.error("Error obteniendo ID de YouTube", e);
        }

        if (videoId) {
            const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            return <img src={thumbUrl} alt="YouTube Preview" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "6px" }} />;
        }
        return <Typography sx={{ color: "#fff" }}>▶ Ver en YouTube</Typography>;
    }

    return <Typography sx={{ color: "#fff" }}>(sin vista previa)</Typography>;
};

export default MediaRenderer;
