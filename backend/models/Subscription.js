const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    service: { type: String, required: true },
    price: { type: Number, required: true },
    renewalDate: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Subscription", SubscriptionSchema);
