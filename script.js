//1. VARIABLES
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];


const boton = document.getElementById("addBtn");
const input = document.getElementById("taskInput");
const listaTareas = document.getElementById("listaTareas");


//2.FUNCIONES
  function pintarTareas() {
        listaTareas.innerHTML = "";

        for (let i = 0 ; i < tareas.length; i++) {
            const nuevaTarea = document.createElement("p");
            nuevaTarea.textContent = tareas[i];

            nuevaTarea.addEventListener("click", function () {
                tareas.splice(i, 1);
                localStorage.setItem("tareas", JSON.stringify(tareas)); //guardar al borrar
                pintarTareas();

            });
        
            listaTareas.appendChild(nuevaTarea);
        
 }
 } 
//3.EVENTOS
boton.addEventListener("click", function() {
    const texto = input.value;
    
    if (texto === "")  {
        return;
    }

    tareas.push(texto);
    localStorage.setItem("tareas", JSON.stringify(tareas));  //para guardar en el local stroage, y convertir elm array en texto
    input.value = "";
    pintarTareas();

});

pintarTareas();