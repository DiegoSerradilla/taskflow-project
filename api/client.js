const URL = "https://taskflow-backend-wjki.onrender.com/api/v1/tasks";

async function obtenerTareas() {
    const respuesta = await fetch(URL);

    const datos = await respuesta.json();

    return datos;
}

async function crearTarea(texto) {
    await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            texto: texto
        })
    });
}

async function borrarTarea(id) {
    await fetch(URL + "/" + id, {
        method: "DELETE"
    });
}

async function completarTarea(id) {
    await fetch(URL + "/" + id, {
        method: "PATCH"
    });
}

async function editarTarea(id, texto) {
    await fetch(URL + "/" + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            texto: texto
        })
    });
}