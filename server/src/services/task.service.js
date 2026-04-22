let tasks = [];
let idCounter = 1;

const obtenerTodas = () => {
    return tasks;
};

const crearTarea = (data) => {
    const nuevaTarea = {
        id: idCounter++,
        texto: data.texto,
        completada: false
    };

    tasks.push(nuevaTarea);
    return nuevaTarea;
};

const eliminarTarea = (id) => {
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        throw new Error("NOT_FOUND");
    }

    tasks.splice(index, 1);
};
const actualizarTarea = (id) => {                  // Creamos función para actualizar una tarea usando su id

    const tarea = tasks.find(t => t.id === id);    // Busca dentro del array la tarea que tenga ese id

    if (!tarea) {                                  // Si no encuentra ninguna tarea...
        throw new Error("NOT_FOUND");              // Lanzamos error de tarea no encontrada
    }

    tarea.completada = !tarea.completada;          
   
    return tarea;                                
};


module.exports = {
    obtenerTodas,
    crearTarea,
    eliminarTarea,
    actualizarTarea
};