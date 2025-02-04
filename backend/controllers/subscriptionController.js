const Subscription = require("../models/Subscription");

// Crear una nueva suscripción
const createSubscription = async (req, res) => {
  try {
    const { userId, service, price, renewalDate } = req.body;

    if (!userId || !service || !price || !renewalDate) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const newSubscription = new Subscription({ userId, service, price, renewalDate });
    await newSubscription.save();

    res.status(201).json({ 
      message: "Subscription created successfully",
      subscription: newSubscription
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la suscripción", details: error.message });
  }
};

// Obtener todas las suscripciones
const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las suscripciones", details: error.message });
  }
};

module.exports = {
  createSubscription,
  getSubscriptions,
};
