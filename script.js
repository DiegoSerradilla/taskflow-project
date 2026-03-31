//1. VARIABLES
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];


const boton = document.getElementById("addBtn");
const input = document.getElementById("taskInput");
const listaTareas = document.getElementById("listaTareas");


//2.FUNCIONES
  function pintarTareas() {
        listaTareas.innerHTML = "";

        for (let i = 0 ; i < tareas.length; i++) {
            const contenedorTarea = document.createElement("div");


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
        
 }
 } 
//3.EVENTOS
boton.addEventListener("click", function() {
    const texto = input.value;
    
    if (texto === "")  {
        return;
    }

    tareas.push({
        texto: texto,
        completada: false
    });

    localStorage.setItem("tareas", JSON.stringify(tareas));  //para guardar en el local stroage, y convertir elm array en texto
    input.value = "";
    pintarTareas();

});

pintarTareas();