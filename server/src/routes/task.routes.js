const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controller");

// Obtener todas las tareas
router.get("/", taskController.obtenerTareas);

// Crear tarea
router.post("/", taskController.crearTarea);

// Eliminar tarea
router.delete("/:id", taskController.eliminarTarea);

router.patch("/:id", taskController.actualizarTarea);

module.exports = router;