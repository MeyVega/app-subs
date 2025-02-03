const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// Verificar conexión a MongoDB
router.get("/status", async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const estados = ["desconectado", "conectando", "conectado", "desconectando"];
  
  res.json({ database: estados[dbState] });
});

// Aquí deberías importar las demás rutas de suscripciones si las tienes
// router.use("/subscriptions", require("./subscriptionController")); 

module.exports = router;
