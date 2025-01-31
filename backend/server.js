const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Validar variables de entorno
if (!process.env.MONGODB_URI) {
  console.error("Error: MONGODB_URI no está definida en .env");
  process.exit(1);
}

// Configuración de CORS
app.use(
  cors({
    origin: "https://app-subs.vercel.app", // URL de tu frontend en Vercel
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  })
);

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => {
    console.error("Error de conexión:", error);
    process.exit(1); // Cierra el servidor si no puede conectarse a MongoDB
  });

// Ruta raíz
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API de suscripciones!");
});

// Otras rutas
app.use("/api/subscriptions", require("./routes/subscriptionRoutes")); // Rutas de suscripciones

// Manejo de rutas no encontradas (debe ir al final)
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Manejo de errores no controlados
process.on("unhandledRejection", (error) => {
  console.error("Error no controlado:", error);
  process.exit(1);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend en https://app-subs.onrender.com`);
});