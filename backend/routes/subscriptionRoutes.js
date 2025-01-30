const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

// Ruta para crear una suscripción
router.post("/", subscriptionController.createSubscription);

module.exports = router;