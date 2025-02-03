const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Configurar CORS
app.use(cors({
    origin: "https://app-subs.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado a MongoDB"))
    .catch(err => {
        console.error("Error conectando a MongoDB:", err);
        process.exit(1);
    });

// Importar rutas
const subscriptionRoutes = require("./routes/subscriptionRoutes");
app.use("/api/subscriptions", subscriptionRoutes);

// Ruta raíz
app.get("/", (req, res) => {
    res.send("¡Bienvenido a la API de suscripciones!");
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor backend en ejecución en http://localhost:${PORT}`);
});
