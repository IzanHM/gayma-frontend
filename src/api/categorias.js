export async function obtenerCategorias() {
    const resp = await fetch("http://localhost:9090/categorias/public");
    if (!resp.ok) throw new Error("Error obteniendo categorías");
    return await resp.json();
}

export async function obtenerNominados() {
    const resp = await fetch("http://localhost:9090/nominados/public");
    if (!resp.ok) throw new Error("Error obteniendo nominados");
    return await resp.json();
}
