// 1. VARIABLES
let tareas = [];
let filtro = "todas";
let busqueda = "";

const boton = document.getElementById("addBtn");
const input = document.getElementById("taskInput");
const listaTareas = document.getElementById("listaTareas");
const estadisticas = document.getElementById("estadisticas");
const busquedaInput = document.getElementById("busquedaInput");
const mensajeEstado = document.getElementById("mensajeEstado");

// 2. FUNCIONES
function pintarEstadisticas() {
    let completadas = 0;

    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].completada) {
            completadas++;
        }
    }

    let pendientes = tareas.length - completadas;

    estadisticas.innerHTML = `
        <div class="card-stat">
            <span class="label">Total</span>
            <span class="valor">${tareas.length}</span>
        </div>

        <div class="card-stat">
            <span class="label">Completadas</span>
            <span class="valor">${completadas}</span>
        </div>

        <div class="card-stat">
            <span class="label">Pendientes</span>
            <span class="valor">${pendientes}</span>
        </div>
    `;
}

function pintarTareas() {
    listaTareas.innerHTML = "";

    for (let i = 0; i < tareas.length; i++) {
        if (filtro === "completadas" && !tareas[i].completada) {
            continue;
        }

        if (filtro === "pendientes" && tareas[i].completada) {
            continue;
        }

        if (!tareas[i].texto.toLowerCase().includes(busqueda.toLowerCase())) {
            continue;
        }

        const contenedorTarea = document.createElement("div");
        contenedorTarea.classList.add("tarea");

        const nuevaTarea = document.createElement("p");
        nuevaTarea.textContent = tareas[i].texto;
        nuevaTarea.addEventListener("dblclick", async function () {
         const nuevoTexto = prompt("Editar tarea:", tareas[i].texto);

        if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
         await editarTarea(tareas[i].id, nuevoTexto);
         cargarTareas();
}
});

        if (tareas[i].completada) {
        contenedorTarea.classList.add("completada");
}

        nuevaTarea.addEventListener("click", async function () {
        
        await completarTarea(tareas[i].id);

        cargarTareas();
        });

        const botonBorrar = document.createElement("button");
        botonBorrar.textContent = "Borrar";

        botonBorrar.addEventListener("click", async function (event) {
         event.stopPropagation();

        await borrarTarea(tareas[i].id);
        
         cargarTareas();
        });

        contenedorTarea.appendChild(nuevaTarea);
        contenedorTarea.appendChild(botonBorrar);
        listaTareas.appendChild(contenedorTarea);
    }

    pintarEstadisticas();
}

    async function cargarTareas() {

    mensajeEstado.textContent = "Conectando con el servidor...";

    try {
        const datos = await obtenerTareas();

        tareas = datos;

        mensajeEstado.textContent = "";

        pintarTareas();

    } catch (error) {

        mensajeEstado.textContent = "El servidor está iniciándose, espera unos segundos...";

        console.warn("Servidor probablemente dormido:", error);

        // Reintenta automáticamente después de 5 segundos
        setTimeout(cargarTareas, 5000);
    }
}

// 3. EVENTOS
boton.addEventListener("click", async function () {
    const texto = input.value.trim();

    if (texto === "") {
        return;
    }
    await crearTarea(texto);

    input.value = "";
    cargarTareas();
});

document.getElementById("btnTodas").addEventListener("click", function () {
    filtro = "todas";
    pintarTareas();
});

document.getElementById("btnPendientes").addEventListener("click", function () {
    filtro = "pendientes";
    pintarTareas();
});

document.getElementById("btnCompletadas").addEventListener("click", function () {
    filtro = "completadas";
    pintarTareas();
});

document.getElementById("btnCompletarTodas").addEventListener("click", async function () {

    for (let i = 0; i < tareas.length; i++) {
        if (!tareas[i].completada) {
            await completarTarea(tareas[i].id);
        }
    }

    cargarTareas();
});

document.getElementById("btnBorrarCompletadas").addEventListener("click", async function () {

    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].completada) {
            await borrarTarea(tareas[i].id);
        }
    }

    cargarTareas();
});

busquedaInput.addEventListener("input", function () {
    busqueda = busquedaInput.value;
    pintarTareas();
});

// 4. INICIO
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        boton.click();
    }
});

const modoOscuroBtn = document.getElementById("modoOscuroBtn");

modoOscuroBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("modoOscuro", "activo");
    } else {
        localStorage.setItem("modoOscuro", "inactivo");
    }
});

cargarTareas();
