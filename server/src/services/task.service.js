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

const actualizarTarea = (id, data) => {

    const tarea = tasks.find(t => t.id === id);

    if (!tarea) {
        throw new Error("NOT_FOUND");
    }

    if (data && data.texto) {
        tarea.texto = data.texto;
    } else {
        tarea.completada = !tarea.completada;
    }

    return tarea;
};


module.exports = {
    obtenerTodas,
    crearTarea,
    eliminarTarea,
    actualizarTarea
};