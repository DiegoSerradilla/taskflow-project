const taskService = require("../services/task.service");

const obtenerTareas = (req, res) => {           //req lo que llega del cliente y res lo que devuelvo
    const tareas = taskService.obtenerTodas();
    res.json(tareas);
};

const crearTarea = (req, res) => {
    const { texto } = req.body;

    if (!texto || typeof texto !== "string" || texto.trim() === "") {
        return res.status(400).json({
            error: "El texto es obligatorio"
        });
    }

    const nuevaTarea = taskService.crearTarea({ texto });

    res.status(201).json(nuevaTarea);
};

const eliminarTarea = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        taskService.eliminarTarea(id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const actualizarTarea = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        const tareaActualizada = taskService.actualizarTarea(id, req.body);

        res.json(tareaActualizada);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerTareas,
    crearTarea,
    eliminarTarea,
    actualizarTarea
};