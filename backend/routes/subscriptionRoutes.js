const express = require("express");
const router = express.Router();
const { createSubscription, getSubscriptions } = require("../controllers/subscriptionController");

// Rutas para suscripciones
router.post("/", createSubscription);
router.get("/", getSubscriptions);

module.exports = router;
