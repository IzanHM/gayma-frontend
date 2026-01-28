import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  InputAdornment 
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

import FondoMorado from "../assets/img/FondoMorado.png";
import FondoAzul from "../assets/img/FondoAzul.png";
import LogoPremios from "../assets/img/LogoPremios.png";
import LogoFamilia from "../assets/img/LogoFamilia.png";
import LogoFamilia2 from "../assets/img/LogoFamilia2.png";

function Home() {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validarCodigo = async () => {
    if (!codigo.trim()) {
      setError("Por favor ingresa tu código");
      return;
    }
    try {
      // CORRECCIÓN: Ahora apunta a Render en lugar de localhost
      const res = await fetch(`https://premios-gayma-backend.onrender.com/votantes/${codigo}`);
      
      if (!res.ok) {
        setError("Código inválido");
        return;
      }
      const votante = await res.json();
      if (votante.yaVoto) {
        alert("Este votante ya emitió su voto.");
        return;
      }
      localStorage.setItem("votante", JSON.stringify(votante));
      navigate("/categoria");
    } catch (err) {
      console.error(err);
      setError("Error al validar el código");
    }
  };

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
        margin: 0,
        padding: 0,
      }}
    >
      {/* Logo Izquierda (LogoPremios) */}
      <Box
        component="img"
        src={LogoPremios}
        sx={{
          position: "absolute",
          left: { xs: "5%", md: "10%" },
          height: { xs: "100px", md: "400px" },
          width: "auto",
          objectFit: "contain"
        }}
      />

      {/* Logo Derecha (LogoFamilia) */}
      <Box
        component="img"
        src={LogoFamilia2}
        sx={{
          position: "absolute",
          right: { xs: "5%", md: "0.5%" }, 
          height: { xs: "100px", md: "470px" },
          width: "auto",
          objectFit: "contain"
        }}
      />

      {/* Cuadro Central */}
      <Box
        sx={{
          width: "90%",
          maxWidth: "400px",
          padding: "50px 40px",
          borderRadius: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold", mb: 4, letterSpacing: "1px" }}>
          LOGIN
        </Typography>

        <TextField
          fullWidth
          variant="standard"
          placeholder="Código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && validarCodigo()}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
              </InputAdornment>
            ),
            style: { color: "#fff", fontSize: "1.1rem" }
          }}
          sx={{
            mb: 5,
            "& .MuiInput-underline:before": { borderBottomColor: "rgba(255,255,255,0.3)" },
            "& .MuiInput-underline:after": { borderBottomColor: "#D4AF37" },
          }}
        />

        <Button
          fullWidth
          onClick={validarCodigo}
          sx={{
            py: 1.5,
            borderRadius: "30px",
            background: "linear-gradient(45deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
            color: "#3d1136",
            fontWeight: "900",
            fontSize: "1rem",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            "&:hover": { 
                filter: "brightness(1.1)",
                transform: "scale(1.01)",
                transition: "0.3s"
            }
          }}
        >
          ACCEDER
        </Button>

        {error && (
          <Typography sx={{ color: "#ff8a80", mt: 3, fontWeight: "500" }}>
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Home;