import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Resumen() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const votos = state?.votos;

    const votante = JSON.parse(localStorage.getItem("votante"));

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    async function handleConfirmarVoto() {
        if (!votante) {
            setError("No hay votante activo");
            return;
        }

        setCargando(true);
        setError("");

        try {
            const res = await fetch(`http://localhost:9090/votantes/votos/${votante.codigo}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(votos)
            });

            if (!res.ok) {
                setError("Error al enviar voto");
                setCargando(false);
                return;
            }

            // marcar como votado en frontend
            votante.yaVoto = true;
            localStorage.setItem("votante", JSON.stringify(votante));
            localStorage.removeItem("votosTemp");

            navigate("/final");
        } catch (e) {
            console.error(e);
            setError("No se pudo conectar con el servidor");
            setCargando(false);
        }
    }

    if (!votos) return <p>No hay votos cargados.</p>;

    return (
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h1>Resumen de votos</h1>

            <pre style={{ background: "#eee", padding: 20 }}>
                {JSON.stringify(votos, null, 2)}
            </pre>

            <button
                disabled={cargando}
                onClick={handleConfirmarVoto}
                style={{
                    padding: "12px 20px",
                    fontSize: 18,
                    marginTop: 20,
                    borderRadius: 8,
                    background: cargando ? "#aaa" : "#1976d2",
                    color: "white",
                    cursor: cargando ? "not-allowed" : "pointer"
                }}
            >
                {cargando ? "Enviando votos..." : "Confirmar voto"}
            </button>

            {error && (
                <p style={{ color: "red", marginTop: 10 }}>
                    {error}
                </p>
            )}
        </div>
    );
}

export default Resumen;
