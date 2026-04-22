const taskRoutes = require("./routes/task.routes");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/tasks", taskRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor funcionando 🚀");
});

// 👇 ESTO ES LO IMPORTANTE
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
    if (err.message === "NOT_FOUND") {
        return res.status(404).json({ error: "Tarea no encontrada" });
    }

    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
});