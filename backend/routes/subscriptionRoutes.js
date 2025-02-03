const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subscription"); // Asegúrate de que el modelo exista

// Crear una nueva suscripción
router.post("/", async (req, res) => {
    try {
        const { userId, service, price, renewalDate } = req.body;

        if (!userId || !service || !price || !renewalDate) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const newSubscription = new Subscription({
            userId,
            service,
            price,
            renewalDate
        });

        await newSubscription.save();
        res.status(201).json({ 
            message: "Subscription created successfully",
            subscription: newSubscription
        });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la suscripción", error });
    }
});

module.exports = router;
