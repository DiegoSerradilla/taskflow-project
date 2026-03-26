
let tareas = [];


const boton = document.getElementById("addBtn");
const input = document.getElementById("taskInput");
const section = document.querySelector("section");


boton.addEventListener("click", function() {
    const texto = input.value;

  

    if (texto === "")  {
        return;
    } 

      tareas.push(texto);

      function pintarTareas() {
        section.innerHTML = "";

        for (let i = 0 ; i < tareas.length; i++) {
            const nuevaTarea = document.createElement("p");
            nuevaTarea.textContent = tareas[i];

            nuevaTarea.addEventListener("click", function () {
                nuevaTarea.classList.toggle("completada");
            });
        
            section.appendChild(nuevaTarea);
        
}


    input.value = "";



    console.log(tareas);

}