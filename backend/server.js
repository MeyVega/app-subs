require("dotenv").config(); // Cargar variables de entorno primero
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Importar conexión a MongoDB

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Verificar si la URI de la base de datos está cargada
if (!process.env.MONGODB_URI) {
    console.error("❌ ERROR: MONGODB_URI no está definida. Verifica tu archivo .env o variables de entorno en Render.");
    process.exit(1); // Salir si falta la variable
}

console.log(`✅ MONGODB_URI cargada: ${process.env.MONGODB_URI.substring(0, 20)}...`); // Mostrar solo una parte por seguridad

// 🌍 Configurar CORS
app.use(cors({
    origin: "https://app-subs.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// 📦 Middleware para parsear JSON
app.use(express.json());

// 🔌 Conectar a MongoDB
connectDB();

// Ruta para el estado de la API
app.get("/api/status", (req, res) => {
    res.json({ message: "API funcionando correctamente" });
});

// 🛤️ Importar y usar rutas
const subscriptionRoutes = require("./routes/subscriptionRoutes");
app.use("/api/subscriptions", subscriptionRoutes);

// 📌 Ruta raíz
app.get("/", (req, res) => {
    res.send("¡Bienvenido a la API de suscripciones!");
});

// ❌ Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

// 🛑 Middleware global de manejo de errores
app.use((err, req, res, next) => {
    console.error("❌ Error en el servidor:", err);
    res.status(500).json({ message: "Error interno del servidor", error: err.message });
});

// 🚀 Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend en ejecución en http://localhost:${PORT}`);
});
