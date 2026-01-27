// src/api/categorias.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9090";

export async function obtenerCategorias() {
    const resp = await fetch(`${API_URL}/categorias/public`);
    if (!resp.ok) throw new Error("Error obteniendo categorías");
    return await resp.json();
}

export async function obtenerNominados() {
    const resp = await fetch(`${API_URL}/nominados/public`);
    if (!resp.ok) throw new Error("Error obteniendo nominados");
    return await resp.json();
}
