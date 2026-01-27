// src/api/votos.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9090";

export async function enviarVotos(codigo, votos) {
    try {
        const response = await fetch(`${API_URL}/votantes/votos/${codigo}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(votos)
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(errorMsg || "Error al enviar votos");
        }

        return await response.text();
    } catch (error) {
        throw error;
    }
}