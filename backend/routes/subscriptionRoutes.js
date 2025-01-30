// backend/routes/subscriptionRoutes.js
const express = require("express");
const router = express.Router();
const { createSubscription, getSubscriptions } = require("../controllers/subscriptionController");

// Crear una suscripción
router.post("/", createSubscription);

// Obtener todas las suscripciones
router.get("/", getSubscriptions);

// Exportar el router
module.exports = router;