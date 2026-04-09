// 1. VARIABLES
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let filtro = "todas";
let busqueda = "";

const boton = document.getElementById("addBtn");
const input = document.getElementById("taskInput");
const listaTareas = document.getElementById("listaTareas");
const estadisticas = document.getElementById("estadisticas");
const busquedaInput = document.getElementById("busquedaInput");

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
        nuevaTarea.addEventListener("dblclick", function () {
         const nuevoTexto = prompt("Editar tarea:", tareas[i].texto);

        if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
        tareas[i].texto = nuevoTexto;
        localStorage.setItem("tareas", JSON.stringify(tareas));
        pintarTareas();
    }
});

        if (tareas[i].completada) {
            nuevaTarea.classList.add("completada");
        }

        nuevaTarea.addEventListener("click", function () {
            tareas[i].completada = !tareas[i].completada;
            localStorage.setItem("tareas", JSON.stringify(tareas));
            pintarTareas();
        });

        const botonBorrar = document.createElement("button");
        botonBorrar.textContent = "Borrar";

        botonBorrar.addEventListener("click", function (event) {
            event.stopPropagation();
            tareas.splice(i, 1);
            localStorage.setItem("tareas", JSON.stringify(tareas));
            pintarTareas();
        });

        contenedorTarea.appendChild(nuevaTarea);
        contenedorTarea.appendChild(botonBorrar);
        listaTareas.appendChild(contenedorTarea);
    }

    pintarEstadisticas();
}

// 3. EVENTOS
boton.addEventListener("click", function () {
    const texto = input.value;

    if (texto.trim() === "") {
        return;
    }

    tareas.push({
        texto: texto,
        completada: false
    });

    localStorage.setItem("tareas", JSON.stringify(tareas));
    input.value = "";
    pintarTareas();
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

document.getElementById("btnCompletarTodas").addEventListener("click", function () {
    for (let i = 0; i < tareas.length; i++) {
        tareas[i].completada = true;
    }

    localStorage.setItem("tareas", JSON.stringify(tareas));
    pintarTareas();
});

document.getElementById("btnCompletarTodas").addEventListener("click", function () {
    let todasCompletadas = tareas.every(function (tarea) {
        return tarea.completada;
    });

    for (let i = 0; i < tareas.length; i++) {
        tareas[i].completada = !todasCompletadas;
    }

    localStorage.setItem("tareas", JSON.stringify(tareas));
    pintarTareas();
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

pintarTareas();