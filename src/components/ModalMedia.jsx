import { Dialog, DialogContent, Box, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function ModalMedia({ open, onClose, url }) {
    if (!url) return null;

    const isImage = url.match(/\.(jpg|jpeg|png|gif|webp)$/i);
    const isAudio = url.match(/\.(mp3|ogg|wav)$/i);
    const isVideo = url.match(/\.(mp4|webm)$/i);

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="md" 
            fullWidth
            PaperProps={{
                style: { backgroundColor: 'transparent', boxShadow: 'none', overflow: 'hidden' }
            }}
        >
            {/* Botón para cerrar manualmente si el usuario no hace clic fuera */}
            <IconButton
                onClick={onClose}
                sx={{ position: 'absolute', right: 8, top: 8, color: '#fff', zIndex: 10 }}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0 }}>
                {isImage && (
                    <img src={url} alt="Preview" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '8px' }} />
                )}

                {isVideo && (
                    <video controls autoPlay src={url} style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                )}

                {/* AQUÍ ESTÁ LA SOLUCIÓN PARA EL AUDIO */}
                {isAudio && (
                    <Box sx={{ 
                        backgroundColor: '#222', 
                        p: 5, 
                        borderRadius: '15px', 
                        textAlign: 'center',
                        border: '2px solid #BF953F' 
                    }}>
                        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '20px' }}>🎵</span>
                        <audio controls autoPlay src={url}>
                            Tu navegador no soporta la reproducción de audio.
                        </audio>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default ModalMedia;
