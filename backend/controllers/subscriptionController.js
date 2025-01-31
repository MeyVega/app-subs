const Subscription = require("../models/Subscription");

const createSubscription = async (req, res) => {
  try {
    const { name, cost, paymentDate, category } = req.body;
    const newSubscription = new Subscription({ name, cost, paymentDate, category });
    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la suscripción" });
  }
};

const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las suscripciones" });
  }
};

module.exports = {
  createSubscription,
  getSubscriptions,
};