import { Box, Typography, Container } from "@mui/material";
import FondoAzul from "../assets/img/FondoAzul.png";

export default function Final() {
  const votante = JSON.parse(localStorage.getItem("votante"));

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${FondoAzul})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: "rgba(26, 26, 26, 0.95)", // Un poco de transparencia para elegancia
            padding: { xs: "50px 20px", md: "60px 40px" },
            textAlign: "center",
            borderRadius: "15px", // Suavizado para que combine con el estilo moderno
            border: "2px solid #BF953F",
            boxShadow: "0px 15px 50px rgba(0,0,0,0.6)",
          }}
        >
          {/* Título con tipografía estilo Master of Custom */}
          <Typography
            variant="h2"
            sx={{
              color: "#fff",
              mb: 3,
              fontFamily: "'Permanent Marker', cursive", // La fuente importada
              textTransform: "none",
              letterSpacing: "1px",
              fontSize: { xs: "2.5rem", md: "3.5rem" }
            }}
          >
            ¡Gracias por votar!
          </Typography>

          {/* Fecha con el degradado dorado exacto del botón */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: "900",
              mb: 4,
              fontSize: { xs: "1.5rem", md: "2rem" },
              background: "linear-gradient(45deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block"
            }}
          >
            ¡Te esperamos el 1 de febrero!
          </Typography>

          {votante && (
            <Box
              sx={{
                mt: 4,
                pt: 3,
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  mb: 1
                }}
              >
                Código utilizado
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontFamily: "monospace" // Estilo código
                }}
              >
                {votante.codigo}
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
