//1. VARIABLES
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let filtro = "todas";
let busqueda = "";



const boton = document.getElementById("addBtn");
const input = document.getElementById("taskInput");
const listaTareas = document.getElementById("listaTareas");
const estadisticas = document.getElementById("estadisticas");
const busquedaInput = document.getElementById("busquedaInput");


//2.FUNCIONES
  function pintarTareas() {
        listaTareas.innerHTML = "";

        for (let i = 0 ; i < tareas.length; i++) {
            
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

            if (tareas[i].completada) {
                nuevaTarea.classList.add("completada")
            }

            nuevaTarea.addEventListener("click", function () {
                tareas[i].completada  = !tareas[i].completada;
                localStorage.setItem("tareas", JSON.stringify(tareas)); //guardar al borrar
                pintarTareas();
            });

            const botonBorrar = document.createElement("button");
            botonBorrar.textContent = "Borrar";
            botonBorrar.addEventListener ("click", function(event) { //event es el objeto que representa el click q ha ocurrido
                event.stopPropagation(); //stopPropagation sirve para que no deje que este click se propague a otros elementos

                    tareas.splice (i, 1)
                    localStorage.setItem("tareas", JSON.stringify(tareas));
                    pintarTareas();
            });
        
            contenedorTarea.appendChild(nuevaTarea); //metemos el p, que es nueva tarea dentro de contenedorTareas(div)
            contenedorTarea.appendChild(botonBorrar); //metemos el boton dentro del div
            listaTareas.appendChild(contenedorTarea); //metemos contenedortareas(div) dentro de la pagina
            pintarEstadisticas();
        
 }
        function pintarEstadisticas() {
    let completadas = 0;

    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].completada) {
            completadas++;
        }
    }

    let pendientes = tareas.length - completadas;

    estadisticas.innerHTML = `
        <p>Total: ${tareas.length}</p>
        <p>Completadas: ${completadas}</p>
        <p>Pendientes: ${pendientes}</p>
    `;
}
 } 
//3.EVENTOS
boton.addEventListener("click", function() {
    const texto = input.value;
    
    if (texto.trim() === "") {
    return;
    }

    tareas.push({
        texto: texto,
        completada: false
    });

    localStorage.setItem("tareas", JSON.stringify(tareas));  //para guardar en el local stroage, y convertir elm array en texto
    input.value = "";
    pintarTareas();

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

busquedaInput.addEventListener("input", function () {
    busqueda = busquedaInput.value;
    pintarTareas();
});

localStorage.setItem("tareas", JSON.stringify(tareas));
pintarTareas();
});
