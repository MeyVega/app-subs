const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Conexión modularizada
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Verificar si la URI de la base de datos está cargada
console.log(process.env.MONGODB_URI ? "✅ MONGODB_URI cargada" : "⚠️ Falta definir MONGODB_URI en .env");

// Configurar CORS
app.use(cors({
    origin: "https://app-subs.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // Permitir credenciales (útil para autenticación)
}));

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
connectDB();

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

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
    console.error("Error en el servidor:", err);
    res.status(500).json({ message: "Error interno del servidor", error: err.message });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend en ejecución en http://localhost:${PORT}`);
});
