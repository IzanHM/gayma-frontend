import { Box, Typography, IconButton } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MediaRenderer from "./MediaRenderer";
import ModalMedia from "./ModalMedia";
import { useState } from "react";

function NomineeCard({ nominado, puntos, onUp, onDown, isFirst, isLast }) {
    const [openModal, setOpenModal] = useState(false);

    const handleMediaClick = () => {
        if (!nominado.media) return;
        if (nominado.media.includes("youtube.com") || nominado.media.includes("youtu.be")) {
            window.open(nominado.media, "_blank");
        } else {
            setOpenModal(true);
        }
    };

    return (
        <Box sx={{
            height: "280px", // Subimos de 260 a 280 para dar aire al texto
            backgroundColor: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            border: "1px solid #BF953F",
            display: "flex", 
            flexDirection: "column", 
            p: 1.5, // Un poco más de padding interno
            transition: "0.3s",
            "&:hover": { boxShadow: "0 0 15px rgba(191, 149, 63, 0.6)" }
        }}>
            {/* Título ajustado para mostrar hasta 2 líneas */}
            <Typography sx={{ 
                color: "#fff", 
                fontWeight: "bold", 
                fontSize: "0.85rem", 
                mb: 1,
                textAlign: "center",
                display: "-webkit-box",
                WebkitLineClamp: 2, // Permite 2 líneas
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                height: "2.4rem", // Altura fija para 2 líneas para que todas las cards sigan iguales
                lineHeight: "1.2rem"
            }}>
                {nominado.nombre}
            </Typography>

            <Box 
                onClick={handleMediaClick}
                sx={{ 
                    flexGrow: 1, 
                    cursor: "pointer", 
                    overflow: "hidden", 
                    display: "flex", 
                    borderRadius: "6px", 
                    bgcolor: "#000",
                    alignItems: "center", 
                    justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.1)"
                }}
            >
                <MediaRenderer url={nominado.media} />
            </Box>

            <Typography sx={{ 
                color: "#D4AF37", 
                fontWeight: "900", 
                mt: 1, 
                fontSize: "0.9rem",
                textAlign: "center"
            }}>
                {puntos} PTS
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 0.5 }}>
                <IconButton 
                    onClick={(e) => { e.stopPropagation(); onUp(); }} 
                    disabled={isFirst} 
                    sx={{ color: "#fff", p: 0.5 }}
                >
                    <ArrowUpwardIcon fontSize="small" />
                </IconButton>
                <IconButton 
                    onClick={(e) => { e.stopPropagation(); onDown(); }} 
                    disabled={isLast} 
                    sx={{ color: "#fff", p: 0.5 }}
                >
                    <ArrowDownwardIcon fontSize="small" />
                </IconButton>
            </Box>

            <ModalMedia open={openModal} onClose={() => setOpenModal(false)} url={nominado.media} />
        </Box>
    );
}

export default NomineeCard;