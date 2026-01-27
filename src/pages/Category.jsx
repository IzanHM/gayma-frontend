import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { obtenerCategorias } from "../api/categorias";
import NomineeCard from "../components/NomineeCard";
import { enviarVotos } from "../api/votos";
import FondoMorado from "../assets/img/FondoMorado.png";

function Category() {
    const navigate = useNavigate();
    const votante = JSON.parse(localStorage.getItem("votante"));
    const [categorias, setCategorias] = useState([]);
    const [indice, setIndice] = useState(0);
    const [nominados, setNominados] = useState([]);
    const [votos, setVotos] = useState({});
    const [cargando, setCargando] = useState(false);

    const getCategoryColor = (nombre) => {
        const n = nombre ? nombre.toLowerCase() : "";
        if (n.includes("compra") || n.includes("mensaje") || n.includes("meme")) return "#804A00"; // Bronce Real
        if (n.includes("imagen") || n.includes("clip") || n.includes("edit")) return "#C0C0C0"; // Plata
        if (n.includes("canción") || n.includes("vídeo") || n.includes("evento") || n.includes("momento") || n.includes("ia")) return "#D4AF37"; // Oro
        if (n.includes("gracioso")) return "#9b292b"; // Rubí
        if (n.includes("leal")) return "#9d4edd"; // Morado
        if (n.includes("gayma")) return "#0f0f80"; // Azul
        return "#fff";
    };

    useEffect(() => {
        obtenerCategorias().then(data => {
            const categoriasRestringidas = [2, 15, 14, 13, 11, 12, 9];
            let filtradas = votante?.puedeVotarTodo ? data : data.filter(c => !categoriasRestringidas.includes(c.id));
            setCategorias(filtradas);
            setNominados(filtradas[0]?.nominados || []);
        }).catch(err => console.error("Error cargando categorías:", err));
    }, []);

    const handleConfirmarVoto = async () => {
        const puntosMax = categorias[indice].maxPuntos;
        const votoCategoria = nominados.map((n, i) => ({
            categoriaId: categorias[indice].id,
            nominadoId: n.id,
            puntos: puntosMax - i
        }));

        const nuevosVotos = { ...votos, [categorias[indice].id]: votoCategoria };
        setVotos(nuevosVotos);

        if (indice < categorias.length - 1) {
            setIndice(indice + 1);
            setNominados(categorias[indice + 1].nominados);
            window.scrollTo(0, 0);
            return;
        }

        setCargando(true);
        try {
            await enviarVotos(votante.codigo, Object.values(nuevosVotos).flat());
            navigate("/final");
        } catch (err) {
            setCargando(false);
            alert("Error al enviar: " + err.message);
        }
    };

    if (categorias.length === 0) return null;
    const cat = categorias[indice];

    return (
        <Box sx={{ 
            minHeight: "100vh", width: "100%",
            backgroundImage: `url(${FondoMorado})`, backgroundSize: "cover",
            backgroundAttachment: "fixed", display: "flex", flexDirection: "column", alignItems: "center",
            pb: 4
        }}>
            <Container maxWidth="xl" sx={{ textAlign: "center", pt: 2 }}>
                <Typography sx={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Permanent Marker', cursive", fontSize: "1rem" }}>
                    {cat.tipo}
                </Typography>
                <Typography variant="h3" sx={{ 
                    color: getCategoryColor(cat.nombre), 
                    fontFamily: "'Permanent Marker', cursive", 
                    mb: 2,
                    textShadow: "2px 2px 8px rgba(0,0,0,0.7)"
                }}>
                    {cat.nombre}
                </Typography>

                <Grid container spacing={1.5} justifyContent="center">
                    {nominados.map((n, i) => (
                        <Grid item key={n.id} sx={{ width: { xs: "50%", sm: "33.3%", md: "20%" } }}>
                            <NomineeCard
                                nominado={n}
                                puntos={cat.maxPuntos - i}
                                onUp={() => {
                                    if (i === 0) return;
                                    const nvo = [...nominados];
                                    [nvo[i - 1], nvo[i]] = [nvo[i], nvo[i - 1]];
                                    setNominados(nvo);
                                }}
                                onDown={() => {
                                    if (i === nominados.length - 1) return;
                                    const nvo = [...nominados];
                                    [nvo[i + 1], nvo[i]] = [nvo[i], nvo[i + 1]];
                                    setNominados(nvo);
                                }}
                                isFirst={i === 0}
                                isLast={i === nominados.length - 1}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ mt: 4 }}>
                    <Button
                        onClick={handleConfirmarVoto}
                        sx={{
                            width: "280px", py: 1.5, borderRadius: "30px",
                            background: "linear-gradient(45deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
                            color: "#3d1136", fontWeight: "900", fontSize: "1.1rem",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.4)"
                        }}
                    >
                        {cargando ? "ENVIANDO..." : "CONFIRMAR VOTOS"}
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default Category;



